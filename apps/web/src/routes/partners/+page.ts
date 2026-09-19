import { getJson } from '$lib/api';
import { partners as fallbackPartners, type Partner } from '@makutano/shared';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => ({
	partners: await getJson<Partner[]>('/partners', fallbackPartners, { fetch })
});
