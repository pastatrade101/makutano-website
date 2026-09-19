import { browser } from '$app/environment';
import { env as publicEnv } from '$env/dynamic/public';
import type { ApiResult } from '@makutano/shared';

/**
 * Thin client for the Makutano API.
 *
 * On the server we call the API's absolute URL. In the browser we go through
 * the same-origin `/api/v1` proxy (see vite.config.ts) so there is no CORS
 * round trip and no API host baked into the bundle.
 */

const SERVER_BASE = publicEnv.PUBLIC_API_URL ?? 'http://localhost:5174';

function url(path: string): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	return browser ? `/api/v1${clean}` : `${SERVER_BASE}/api/v1${clean}`;
}

export interface FetchOptions {
	/** SvelteKit's `fetch`, so SSR requests are deduped and cookies forwarded. */
	fetch?: typeof globalThis.fetch;
	signal?: AbortSignal;
}

/**
 * GETs a resource. Returns `fallback` on any failure — the marketing site
 * should never render an error page because the API blipped.
 */
export async function getJson<T>(
	path: string,
	fallback: T,
	options: FetchOptions = {}
): Promise<T> {
	const f = options.fetch ?? globalThis.fetch;
	try {
		const res = await f(url(path), {
			headers: { accept: 'application/json' },
			signal: options.signal ?? AbortSignal.timeout(5000)
		});
		if (!res.ok) return fallback;
		const body = (await res.json()) as ApiResult<T>;
		return body.ok ? body.data : fallback;
	} catch {
		return fallback;
	}
}

export interface PostResult<T> {
	ok: boolean;
	data?: T;
	message?: string;
	fieldErrors?: Record<string, string>;
}

/** POSTs a form payload and normalises validation errors for the UI. */
export async function postJson<T>(path: string, payload: unknown): Promise<PostResult<T>> {
	try {
		const res = await fetch(url(path), {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(15000)
		});
		const body = (await res.json()) as ApiResult<T>;

		if (res.ok && body.ok) return { ok: true, data: body.data };

		if (!body.ok) {
			return {
				ok: false,
				message: body.error.message,
				fieldErrors:
					body.error.details && typeof body.error.details === 'object'
						? (body.error.details as Record<string, string>)
						: undefined
			};
		}
		return { ok: false, message: 'Something went wrong. Please try again.' };
	} catch {
		return {
			ok: false,
			message: 'We could not reach the server. Check your connection and try again.'
		};
	}
}
