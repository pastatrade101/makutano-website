import { getJson } from '$lib/api';
import {
	credibility as fallbackCredibility,
	leadership as fallbackLeadership,
	values as fallbackValues,
	type CredibilityItem,
	type LeadershipMember,
	type ValueItem
} from '@makutano/shared';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const [values, credibility, leadership] = await Promise.all([
		getJson<ValueItem[]>('/values', fallbackValues, { fetch }),
		getJson<CredibilityItem[]>('/credibility', fallbackCredibility, { fetch }),
		getJson<LeadershipMember[]>('/leadership', fallbackLeadership, { fetch })
	]);

	return { values, credibility, leadership };
};
