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

/** Brand palette, mirroring apps/web/src/lib/styles/tokens.css. */
const BRAND = {
	navy: '#0b1522',
	navyRaised: '#102032',
	amber: '#ffbd58',
	ink: '#12263d',
	inkMuted: '#5b6b7f',
	page: '#f4f6f9',
	hairline: '#e3e9f0'
} as const;

const FONT = "'Segoe UI',system-ui,-apple-system,Helvetica,Arial,sans-serif";

function formatReceived(iso: string): string {
	// Dodoma is UTC+3 year-round, so the office reads its own clock rather than
	// converting a UTC timestamp in their head.
	try {
		return new Intl.DateTimeFormat('en-GB', {
			dateStyle: 'medium',
			timeStyle: 'short',
			timeZone: 'Africa/Dar_es_Salaam'
		}).format(new Date(iso)) + ' EAT';
	} catch {
		return iso;
	}
}

function plainBody(s: ContactSubmission): string {
	return [
		'MAKUTANO DIGITAL — new website enquiry',
		'======================================',
		'',
		`Name:     ${s.name}`,
		`Email:    ${s.email}`,
		`Phone:    ${s.phone ?? '—'}`,
		`Service:  ${s.service ?? '—'}`,
		`Received: ${formatReceived(s.createdAt)}`,
		`Ref:      ${s.id}`,
		'',
		'Message',
		'-------',
		s.message,
		'',
		'—',
		`Reply directly to this email to reach ${s.name}.`,
		'Makutano Digital Company Limited · Makole, Dodoma, Tanzania',
		env.siteUrl
	].join('\n');
}

/**
 * Branded notification.
 *
 * Built as tables with inline styles because that is what mail clients
 * reliably render — Outlook in particular ignores modern layout entirely. The
 * wordmark is live text beside the logo rather than baked into an image, so
 * the header still reads as Makutano in the many clients that block remote
 * images by default.
 */
function htmlBody(s: ContactSubmission): string {
	const logo = `${env.siteUrl}/images/brand/makutano-mark.png`;

	const row = (label: string, value: string, mono = false) => `
		<tr>
			<td style="padding:11px 16px 11px 0;border-bottom:1px solid ${BRAND.hairline};color:${BRAND.inkMuted};font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
			<td style="padding:11px 0;border-bottom:1px solid ${BRAND.hairline};color:${BRAND.ink};font-size:14px;${mono ? "font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:12px;" : ''}">${escapeHtml(value)}</td>
		</tr>`;

	const linkRow = (label: string, value: string, href: string) => `
		<tr>
			<td style="padding:11px 16px 11px 0;border-bottom:1px solid ${BRAND.hairline};color:${BRAND.inkMuted};font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
			<td style="padding:11px 0;border-bottom:1px solid ${BRAND.hairline};font-size:14px">
				<a href="${escapeHtml(href)}" style="color:${BRAND.ink};text-decoration:underline">${escapeHtml(value)}</a>
			</td>
		</tr>`;

	return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New website enquiry</title></head>
<body style="margin:0;padding:0;background:${BRAND.page};">
	<!-- Inbox preview line; hidden in the message itself. -->
	<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(s.name)} — ${escapeHtml(s.service ?? 'General enquiry')}</div>

	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.page};padding:28px 12px">
		<tr><td align="center">
			<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${BRAND.hairline}">

				<tr><td style="background:${BRAND.navy};padding:22px 28px">
					<table role="presentation" cellpadding="0" cellspacing="0"><tr>
						<td style="padding-right:12px;vertical-align:middle">
							<img src="${logo}" width="38" height="38" alt="" style="display:block;width:38px;height:38px;border:0;border-radius:9px">
						</td>
						<td style="vertical-align:middle">
							<div style="font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;letter-spacing:.06em">MAKUTANO DIGITAL</div>
							<div style="font-family:${FONT};font-size:11px;color:${BRAND.amber};letter-spacing:.12em;padding-top:3px">WEBSITE ENQUIRY</div>
						</td>
					</tr></table>
				</td></tr>
				<tr><td style="height:3px;background:${BRAND.amber};font-size:0;line-height:0">&nbsp;</td></tr>

				<tr><td style="padding:28px">
					<p style="margin:0 0 4px;font-family:${FONT};font-size:19px;font-weight:600;color:${BRAND.ink}">New enquiry from ${escapeHtml(s.name)}</p>
					<p style="margin:0 0 22px;font-family:${FONT};font-size:14px;color:${BRAND.inkMuted}">Reply to this email and it goes straight back to them.</p>

					<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:${FONT};border-collapse:collapse">
						${linkRow('Email', s.email, `mailto:${s.email}`)}
						${s.phone ? linkRow('Phone', s.phone, `tel:${s.phone.replace(/\s/g, '')}`) : row('Phone', '—')}
						${row('Service', s.service ?? '—')}
						${row('Received', formatReceived(s.createdAt))}
						${row('Reference', s.id, true)}
					</table>

					<p style="margin:26px 0 8px;font-family:${FONT};font-size:11px;font-weight:600;color:${BRAND.inkMuted};letter-spacing:.12em">MESSAGE</p>
					<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
						<tr><td style="background:${BRAND.page};border-left:3px solid ${BRAND.amber};border-radius:0 8px 8px 0;padding:16px 18px;font-family:${FONT};font-size:14px;line-height:1.7;color:${BRAND.ink};white-space:pre-wrap">${escapeHtml(s.message)}</td></tr>
					</table>

					<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px"><tr>
						<td style="background:${BRAND.amber};border-radius:999px">
							<a href="mailto:${escapeHtml(s.email)}?subject=${encodeURIComponent('Re: your enquiry to Makutano Digital')}"
							   style="display:inline-block;padding:12px 26px;font-family:${FONT};font-size:14px;font-weight:600;color:${BRAND.navy};text-decoration:none">Reply to ${escapeHtml(s.name)}</a>
						</td>
					</tr></table>
				</td></tr>

				<tr><td style="background:${BRAND.navyRaised};padding:18px 28px">
					<p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.7;color:#9aa8b8">
						Makutano Digital Company Limited · Makole, Dodoma, Tanzania<br>
						<a href="${env.siteUrl}" style="color:${BRAND.amber};text-decoration:none">${escapeHtml(env.siteUrl.replace(/^https?:\/\//, ''))}</a>
						· Sent automatically by the website contact form
					</p>
				</td></tr>

			</table>
		</td></tr>
	</table>
</body>
</html>`;
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
