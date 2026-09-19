import type { FastifyInstance } from 'fastify';
import { repository } from '../lib/repository.js';

/** Read-only content endpoints backing the site. */
export async function contentRoutes(app: FastifyInstance) {
	app.get('/site', async () => ({ ok: true, data: await repository.site() }));

	app.get('/services', async () => ({ ok: true, data: await repository.services() }));

	app.get<{ Params: { slug: string } }>('/services/:slug', async (req, reply) => {
		const service = await repository.service(req.params.slug);
		if (!service) {
			return reply
				.code(404)
				.send({ ok: false, error: { error: 'not_found', message: 'Service not found' } });
		}
		return { ok: true, data: service };
	});

	app.get('/capabilities', async () => ({ ok: true, data: await repository.capabilities() }));

	app.get('/values', async () => ({ ok: true, data: await repository.values() }));

	app.get('/credibility', async () => ({ ok: true, data: await repository.credibility() }));

	app.get('/partners', async () => ({ ok: true, data: await repository.partners() }));

	app.get<{ Params: { slug: string } }>('/partners/:slug', async (req, reply) => {
		const partner = await repository.partner(req.params.slug);
		if (!partner) {
			return reply
				.code(404)
				.send({ ok: false, error: { error: 'not_found', message: 'Partner not found' } });
		}
		return { ok: true, data: partner };
	});

	app.get('/leadership', async () => ({ ok: true, data: await repository.leadership() }));
}
