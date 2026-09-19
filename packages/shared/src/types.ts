/** Domain types shared between the SvelteKit frontend and the Fastify API. */

/**
 * A bilingual string. The site ships EN and SW side by side and the language
 * toggle swaps them; `sw` is optional because some longer prose on the live
 * site is English-only.
 */
export interface Localized {
	en: string;
	sw?: string;
}

export type Lang = 'en' | 'sw';

export interface NavItem {
	href: string;
	label: Localized;
}

/** One of the seven registered service domains. */
export interface Service {
	id: string;
	slug: string;
	/** Two-digit ordinal as shown on the cards: "01" … "07". */
	number: string;
	title: Localized;
	description: Localized;
	icon: string;
	/** Digital Advertising is flagged as the primary business activity. */
	isPrimary: boolean;
	order: number;
}

/** A capability highlighted on the home page (AI, web, mobile). */
export interface Capability {
	id: string;
	title: Localized;
	description: Localized;
	icon: string;
	image: string;
	order: number;
}

export interface ValueItem {
	id: string;
	title: Localized;
	description: Localized;
	icon: string;
	order: number;
}

export interface CredibilityItem {
	id: string;
	title: Localized;
	description: Localized;
	icon: string;
	order: number;
}

export interface Partner {
	id: string;
	slug: string;
	name: string;
	sector: Localized;
	description: Localized;
	tag?: Localized;
	url: string | null;
	logo: string;
	order: number;
}

export interface LeadershipMember {
	id: string;
	name: string;
	role: Localized;
	bio: Localized;
	image: string;
	order: number;
}

export interface RegistrationRow {
	label: Localized;
	value: string;
}

export interface SiteSettings {
	name: string;
	legalName: string;
	tagline: Localized;
	description: Localized;
	address: Localized;
	phone: string;
	email: string;
	website: string;
	mapUrl: string;
	mission: Localized;
	vision: Localized;
	statement: Localized;
	developedBy: Localized;
	registration: RegistrationRow[];
	socials: { label: string; icon: string; url: string }[];
}

export interface ContactSubmission {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	service: string | null;
	message: string;
	createdAt: string;
	status: 'new' | 'read' | 'archived';
}

export interface ApiError {
	error: string;
	message: string;
	details?: unknown;
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

/** Picks the requested language, falling back to English. */
export function t(value: Localized | undefined, lang: Lang): string {
	if (!value) return '';
	return lang === 'sw' ? (value.sw ?? value.en) : value.en;
}
