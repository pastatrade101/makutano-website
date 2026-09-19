import { getJson } from '$lib/api';
import { services as fallbackServices, type Service } from '@makutano/shared';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => ({
	services: await getJson<Service[]>('/services', fallbackServices, { fetch }),
	/** `/contact?service=…` pre-selects the dropdown from a service card. */
	preselect: url.searchParams.get('service') ?? ''
});
