import 'dotenv/config';

function optional(key: string): string | undefined {
	const value = process.env[key]?.trim();
	return value ? value : undefined;
}

const supabaseUrl = optional('SUPABASE_URL');
const supabaseServiceKey = optional('SUPABASE_SERVICE_ROLE_KEY');

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
	notifyEmail: optional('NOTIFY_EMAIL'),
	/** True once both Supabase credentials are present. */
	get supabaseEnabled() {
		return Boolean(supabaseUrl && supabaseServiceKey);
	}
} as const;
