import { env } from '$env/dynamic/public';
import { nav } from '@makutano/shared';
import type { RequestHandler } from './$types';

/** Static sitemap — the site is five pages and they never change shape. */
export const GET: RequestHandler = async ({ url }) => {
	const origin = env.PUBLIC_SITE_URL ?? url.origin;
	const today = new Date().toISOString().slice(0, 10);

	const urls = nav
		.map(
			(item) => `	<url>
		<loc>${origin}${item.href === '/' ? '' : item.href}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>${item.href === '/' ? '1.0' : '0.8'}</priority>
	</url>`
		)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
		{ headers: { 'content-type': 'application/xml', 'cache-control': 'max-age=3600' } }
	);
};
