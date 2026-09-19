import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from './env.js';

let client: SupabaseClient | null = null;

/**
 * Service-role Supabase client. Bypasses RLS, so it must never be reachable
 * from the browser — only this API process holds the key.
 *
 * Returns null when credentials are absent, which puts the repository layer
 * into fallback mode instead of crashing the server.
 */
export function supabase(): SupabaseClient | null {
	if (!env.supabaseEnabled) return null;
	if (!client) {
		client = createClient(env.supabaseUrl!, env.supabaseServiceKey!, {
			auth: { persistSession: false, autoRefreshToken: false },
			global: { headers: { 'x-application-name': 'makutano-api' } }
		});
	}
	return client;
}
