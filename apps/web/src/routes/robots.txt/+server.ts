import { env } from '$env/dynamic/public';
import type { RequestHandler } from './$types';

/** Served as a route so the sitemap URL is absolute and matches the deploy. */
export const GET: RequestHandler = async ({ url }) => {
	const origin = env.PUBLIC_SITE_URL ?? url.origin;

	return new Response(
		`User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`,
		{ headers: { 'content-type': 'text/plain', 'cache-control': 'max-age=3600' } }
	);
};
