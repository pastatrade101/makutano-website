import { getJson } from '$lib/api';
import { services as fallbackServices, type Service } from '@makutano/shared';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => ({
	services: await getJson<Service[]>('/services', fallbackServices, { fetch })
});
