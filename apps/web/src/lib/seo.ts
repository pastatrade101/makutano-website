import { site } from '@makutano/shared';

/** Per-page `<title>` and meta description, matching the live site. */
export const seo = {
	home: {
		title: 'Makutano Digital — ICT & Digital Solutions, Dodoma',
		description: site.description.en
	},
	services: {
		title: 'Services — Makutano Digital',
		description:
			'Seven core service domains: digital advertising, web solutions, software development, digital consultancy, real estate services, digital currency operations and information services.'
	},
	about: {
		title: 'About — Makutano Digital',
		description:
			'Makutano Digital Company Limited: a Tanzanian digital solutions partnership operating at the intersection of technology, real estate and information services.'
	},
	partners: {
		title: 'Products & Partners — Makutano Digital',
		description:
			'Explore SmartClass and our SACCOS platform, built by Makutano Digital, and meet our partners Ilboru Saccos and Moinfotech.'
	},
	contact: {
		title: 'Contact — Makutano Digital',
		description:
			'Talk to Makutano Digital — Makole, Dodoma, Tanzania. Phone +255 745 997 711, info@makutano.co.tz.'
	}
} as const;
