import {
	capabilities,
	credibility,
	leadership,
	partners,
	services,
	site,
	values
} from '@makutano/shared';
import { env } from '../lib/env.js';
import { supabase } from '../lib/supabase.js';

/**
 * Pushes the site copy from `@makutano/shared` into Supabase.
 * Run after applying `supabase/migrations/0001_init.sql`:
 *
 *   pnpm --filter @makutano/api seed
 */

function snakeize(obj: Record<string, unknown>): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value === undefined) continue;
		out[key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)] = value;
	}
	return out;
}

async function main() {
	const db = supabase();
	if (!db) {
		console.error(
			'✗ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in apps/api/.env before seeding.'
		);
		process.exit(1);
	}

	console.log(`→ Seeding ${env.supabaseUrl}`);

	const tables: [string, Record<string, unknown>[]][] = [
		['site_settings', [{ id: 'default', data: site }]],
		['services', services.map((s) => snakeize({ ...s }))],
		['capabilities', capabilities.map((c) => snakeize({ ...c }))],
		['core_values', values.map((v) => snakeize({ ...v }))],
		['credibility', credibility.map((c) => snakeize({ ...c }))],
		['partners', partners.map((p) => snakeize({ ...p }))],
		['leadership', leadership.map((l) => snakeize({ ...l }))]
	];

	for (const [table, rows] of tables) {
		const { error } = await db.from(table).upsert(rows, { onConflict: 'id' });
		if (error) {
			console.error(`✗ ${table}: ${error.message}`);
			process.exitCode = 1;
		} else {
			console.log(`✓ ${table} — ${rows.length} row(s)`);
		}
	}

	console.log('Done.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
