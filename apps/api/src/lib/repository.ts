import {
	capabilities as seedCapabilities,
	credibility as seedCredibility,
	leadership as seedLeadership,
	partners as seedPartners,
	services as seedServices,
	site as seedSite,
	values as seedValues,
	type Capability,
	type ContactPayload,
	type ContactSubmission,
	type CredibilityItem,
	type LeadershipMember,
	type Partner,
	type Service,
	type SiteSettings,
	type ValueItem
} from '@makutano/shared';
import { supabase } from './supabase.js';

/**
 * Data access for makutano.co.tz.
 *
 * Every read falls back to the copy bundled in `@makutano/shared` when Supabase
 * is not configured or a query fails, so the site never goes blank because of a
 * database problem. Enquiries fall back to an in-memory store, which is fine for
 * local development and flagged in the response.
 */

const memory = { submissions: [] as ContactSubmission[] };

function newId(prefix: string): string {
	return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/** snake_case row → camelCase object. */
function camelize<T>(row: Record<string, unknown>): T {
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(row)) {
		out[key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase())] = value;
	}
	return out as T;
}

/** camelCase object → snake_case row. */
function snakeize(obj: Record<string, unknown>): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value === undefined) continue;
		out[key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)] = value;
	}
	return out;
}

async function selectAll<T>(table: string, fallback: T[]): Promise<T[]> {
	const db = supabase();
	if (!db) return fallback;
	const { data, error } = await db.from(table).select('*').order('order', { ascending: true });
	if (error || !data?.length) return fallback;
	return data.map((row) => camelize<T>(row as Record<string, unknown>));
}

export const repository = {
	get usingSupabase(): boolean {
		return supabase() !== null;
	},

	async services(): Promise<Service[]> {
		return selectAll<Service>('services', seedServices);
	},

	async service(slug: string): Promise<Service | null> {
		const all = await this.services();
		return all.find((s) => s.slug === slug) ?? null;
	},

	async capabilities(): Promise<Capability[]> {
		return selectAll<Capability>('capabilities', seedCapabilities);
	},

	async values(): Promise<ValueItem[]> {
		return selectAll<ValueItem>('core_values', seedValues);
	},

	async credibility(): Promise<CredibilityItem[]> {
		return selectAll<CredibilityItem>('credibility', seedCredibility);
	},

	async partners(): Promise<Partner[]> {
		return selectAll<Partner>('partners', seedPartners);
	},

	async partner(slug: string): Promise<Partner | null> {
		const all = await this.partners();
		return all.find((p) => p.slug === slug) ?? null;
	},

	async leadership(): Promise<LeadershipMember[]> {
		return selectAll<LeadershipMember>('leadership', seedLeadership);
	},

	async site(): Promise<SiteSettings> {
		const db = supabase();
		if (!db) return seedSite;
		const { data, error } = await db
			.from('site_settings')
			.select('data')
			.eq('id', 'default')
			.maybeSingle();
		if (error || !data?.data) return seedSite;
		return data.data as SiteSettings;
	},

	async createSubmission(
		payload: ContactPayload,
		meta: { ip?: string; userAgent?: string }
	): Promise<{ submission: ContactSubmission; persisted: boolean }> {
		const submission: ContactSubmission = {
			id: newId('enq'),
			name: payload.name,
			email: payload.email,
			phone: payload.phone ?? null,
			service: payload.service ?? null,
			message: payload.message,
			createdAt: new Date().toISOString(),
			status: 'new'
		};

		const db = supabase();
		if (!db) {
			memory.submissions.unshift(submission);
			return { submission, persisted: false };
		}

		const { error } = await db.from('contact_submissions').insert(
			snakeize({ ...submission, ip: meta.ip ?? null, userAgent: meta.userAgent ?? null })
		);
		if (error) {
			memory.submissions.unshift(submission);
			return { submission, persisted: false };
		}
		return { submission, persisted: true };
	}
};
