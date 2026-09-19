import { getJson } from '$lib/api';
import { site as fallbackSite, services as fallbackServices, type SiteSettings, type Service } from '@makutano/shared';
import type { LayoutLoad } from './$types';

/** Site-wide settings, fetched once and shared with every page. */
export const load: LayoutLoad = async ({ fetch }) => {
	const [site, footerServices] = await Promise.all([
		getJson<SiteSettings>('/site', fallbackSite, { fetch }),
		getJson<Service[]>('/services', fallbackServices, { fetch })
	]);
	return { site, footerServices };
};
