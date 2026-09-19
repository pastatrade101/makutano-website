import { getJson } from '$lib/api';
import {
	capabilities as fallbackCapabilities,
	partners as fallbackPartners,
	type Partner,
	credibility as fallbackCredibility,
	services as fallbackServices,
	type Capability,
	type CredibilityItem,
	type Service
} from '@makutano/shared';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const [capabilities, services, credibility, partners] = await Promise.all([
		getJson<Capability[]>('/capabilities', fallbackCapabilities, { fetch }),
		getJson<Service[]>('/services', fallbackServices, { fetch }),
		getJson<CredibilityItem[]>('/credibility', fallbackCredibility, { fetch }),
		getJson<Partner[]>('/partners', fallbackPartners, { fetch })
	]);

	return { capabilities, services, credibility, partners };
};
