import { contactSchema, fieldErrors, formCopy } from '@makutano/shared';
import type { FastifyInstance } from 'fastify';
import { env } from '../lib/env.js';
import { notifyEnquiry } from '../lib/mailer.js';
import { repository } from '../lib/repository.js';

/** Enquiry form endpoint. */
export async function formRoutes(app: FastifyInstance) {
	app.post('/contact', {
		config: { rateLimit: { max: 5, timeWindow: '10 minutes' } },
		handler: async (req, reply) => {
			const parsed = contactSchema.safeParse(req.body);
			if (!parsed.success) {
				return reply.code(422).send({
					ok: false,
					error: {
						error: 'validation_failed',
						message: formCopy.failure,
						details: fieldErrors(parsed.error)
					}
				});
			}

			// Honeypot: bots fill every field they find, humans never see this one.
			if (parsed.data.website) {
				req.log.info({ ip: req.ip }, 'contact honeypot triggered');
				return reply.code(202).send({ ok: true, data: { received: true } });
			}

			const { submission, persisted } = await repository.createSubmission(parsed.data, {
				ip: req.ip,
				userAgent: req.headers['user-agent']
			});

			if (!persisted) {
				req.log.warn(
					{ id: submission.id },
					'enquiry stored in memory only — Supabase is not configured or the insert failed'
				);
			}

			// Emailed after storing, and deliberately awaited: the process may be
			// replaced at any time, and a detached promise would take the enquiry
			// with it. A failure here never fails the request — the visitor has
			// done nothing wrong and the submission is already recorded.
			const notification = await notifyEnquiry(submission);

			if (notification.sent) {
				req.log.info(
					{ id: submission.id, messageId: notification.id, notify: env.notifyEmail },
					'enquiry emailed'
				);
			} else {
				req.log.error(
					{ id: submission.id, reason: notification.reason, persisted },
					persisted
						? 'enquiry stored but not emailed'
						: 'ENQUIRY LOST — neither stored nor emailed'
				);
			}

			return reply.code(201).send({
				ok: true,
				data: {
					id: submission.id,
					persisted,
					notified: notification.sent,
					receivedAt: submission.createdAt
				}
			});
		}
	});
}
