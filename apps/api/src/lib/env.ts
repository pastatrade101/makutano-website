import 'dotenv/config';

function optional(key: string): string | undefined {
	const value = process.env[key]?.trim();
	return value ? value : undefined;
}

const supabaseUrl = optional('SUPABASE_URL');
const supabaseServiceKey = optional('SUPABASE_SERVICE_ROLE_KEY');

const resendApiKey = optional('RESEND_API_KEY');
const notifyEmail = optional('NOTIFY_EMAIL');

export const env = {
	port: Number(process.env.PORT ?? 5174),
	host: process.env.HOST ?? '0.0.0.0',
	nodeEnv: process.env.NODE_ENV ?? 'development',
	isProd: process.env.NODE_ENV === 'production',
	corsOrigins: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
		.split(',')
		.map((o) => o.trim())
		.filter(Boolean),
	supabaseUrl,
	supabaseServiceKey,
	notifyEmail,
	resendApiKey,
	/**
	 * Sender for enquiry notifications. Must be an address on a domain verified
	 * in Resend. The default is Resend's shared test sender, which only ever
	 * delivers to the Resend account owner's own address — fine for checking
	 * the wiring, not for production.
	 */
	resendFrom: optional('RESEND_FROM') ?? 'Makutano Digital <onboarding@resend.dev>',
	/** Public origin, used to build absolute asset URLs for branded email. */
	siteUrl: (optional('SITE_URL') ?? 'https://makutano.co.tz').replace(/\/$/, ''),
	/** True once both Supabase credentials are present. */
	get supabaseEnabled() {
		return Boolean(supabaseUrl && supabaseServiceKey);
	},
	/** True once enquiries can actually be emailed somewhere. */
	get emailEnabled() {
		return Boolean(resendApiKey && notifyEmail);
	}
} as const;
