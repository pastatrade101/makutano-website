import type { ContactSubmission } from '@makutano/shared';
import { env } from './env.js';

/**
 * Enquiry notifications via Resend.
 *
 * Called over plain `fetch` rather than the `resend` SDK: this is one POST to
 * one endpoint, Node has fetch built in, and it keeps a dependency (and its
 * lockfile churn) out of the workspace for no functional loss.
 *
 * Sending never decides whether the HTTP request succeeds. The enquiry is
 * already stored by the time we get here, so a mail failure is logged and
 * reported, not raised — a visitor should not see an error because Resend had
 * a bad minute.
 */

const ENDPOINT = 'https://api.resend.com/emails';

/** Resend can be slow under load; never hold the visitor's request on it. */
const TIMEOUT_MS = 10_000;

export interface NotifyResult {
	/** False when Resend is unconfigured, refused the message, or timed out. */
	sent: boolean;
	/** Resend's message id, for correlating with their dashboard. */
	id?: string;
	/** Why it did not send. Logged, never shown to the visitor. */
	reason?: string;
}

/** Escapes text interpolated into the HTML part. Enquiry text is untrusted. */
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function plainBody(s: ContactSubmission): string {
	return [
		`Name:    ${s.name}`,
		`Email:   ${s.email}`,
		`Phone:   ${s.phone ?? '—'}`,
		`Service: ${s.service ?? '—'}`,
		`Received: ${s.createdAt}`,
		`Ref:     ${s.id}`,
		'',
		'Message:',
		s.message
	].join('\n');
}

function htmlBody(s: ContactSubmission): string {
	const row = (label: string, value: string) =>
		`<tr><td style="padding:4px 14px 4px 0;color:#6b7280;white-space:nowrap">${label}</td>` +
		`<td style="padding:4px 0;color:#111827">${escapeHtml(value)}</td></tr>`;

	return [
		'<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;line-height:1.6">',
		'<h2 style="margin:0 0 16px;font-size:18px;color:#1e3a5f">New website enquiry</h2>',
		'<table style="border-collapse:collapse;margin-bottom:18px">',
		row('Name', s.name),
		row('Email', s.email),
		row('Phone', s.phone ?? '—'),
		row('Service', s.service ?? '—'),
		row('Received', s.createdAt),
		row('Ref', s.id),
		'</table>',
		'<div style="padding:14px 16px;background:#f6f7f9;border-radius:8px;white-space:pre-wrap;color:#111827">',
		escapeHtml(s.message),
		'</div>',
		'</div>'
	].join('');
}

/**
 * Emails a submission to the office inbox. Resolves either way — check
 * `sent` rather than catching.
 */
export async function notifyEnquiry(submission: ContactSubmission): Promise<NotifyResult> {
	if (!env.resendApiKey) return { sent: false, reason: 'RESEND_API_KEY is not set' };
	if (!env.notifyEmail) return { sent: false, reason: 'NOTIFY_EMAIL is not set' };

	try {
		const res = await fetch(ENDPOINT, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.resendApiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: env.resendFrom,
				to: [env.notifyEmail],
				// Replying in the mail client goes straight back to the enquirer.
				reply_to: submission.email,
				subject: `New website enquiry from ${submission.name}`,
				text: plainBody(submission),
				html: htmlBody(submission)
			}),
			signal: AbortSignal.timeout(TIMEOUT_MS)
		});

		if (!res.ok) {
			// Resend puts the useful part in the body; the status alone rarely
			// explains an unverified sending domain or a revoked key.
			const detail = await res.text().catch(() => '');
			return { sent: false, reason: `resend responded ${res.status}: ${detail.slice(0, 300)}` };
		}

		const data = (await res.json().catch(() => ({}))) as { id?: string };
		return { sent: true, id: data.id };
	} catch (err) {
		const reason = err instanceof Error ? err.message : String(err);
		return { sent: false, reason };
	}
}
