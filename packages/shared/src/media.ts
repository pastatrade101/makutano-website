/**
 * Image sources for the site.
 *
 * These are temporary Unsplash photographs standing in for Makutano's own
 * photography. They are the only place image paths are declared, so swapping
 * them for CMS-delivered URLs later is a change to this file alone — no
 * component touches an image path directly.
 *
 * Each entry carries its Unsplash photo id and photographer credit so the
 * stand-ins can be attributed, audited and replaced without guesswork.
 */

export interface ImageAsset {
	/** Path under /static, or an absolute URL once a CMS serves it. */
	src: string;
	/** Always written for the real subject, not the stand-in photo. */
	alt: string;
	width: number;
	height: number;
	/** Provenance of the stand-in. Absent once replaced by client photography. */
	placeholder?: {
		source: 'unsplash';
		photoId: string;
		url: string;
	};
}

const unsplash = (photoId: string) => ({
	source: 'unsplash' as const,
	photoId,
	url: `https://unsplash.com/photos/${photoId}`
});

export const media = {
	/** Home hero. */
	heroPortrait: {
		src: '/images/photos/hero-circuit.jpg',
		alt: 'A printed circuit board in close focus',
		width: 760,
		height: 950,
		placeholder: unsplash('1631377153566-b294bfd5f9f4')
	},

	/** Home and About — "who we are". */
	aboutPrimary: {
		src: '/images/photos/about-team.jpg',
		alt: 'A team working through a project around a meeting-room table',
		width: 900,
		height: 990,
		placeholder: unsplash('1573164574511-73c773193279')
	},
	aboutSecondary: {
		src: '/images/photos/about-desk.jpg',
		alt: 'Two colleagues working together at a shared desk',
		width: 720,
		height: 720,
		placeholder: unsplash('1632923943917-a1dd60878fa4')
	},
	aboutMeeting: {
		src: '/images/photos/about-meeting.jpg',
		alt: 'A client working session in progress',
		width: 900,
		height: 990,
		placeholder: unsplash('1653565685001-92267a18233a')
	},

	/** Home page capability cards. */
	capabilityAi: {
		src: '/images/photos/cap-ai.jpg',
		alt: 'Application source code on a screen',
		width: 800,
		height: 600,
		placeholder: unsplash('1687603917313-ccae1a289a9d')
	},
	capabilityWeb: {
		src: '/images/photos/cap-web.jpg',
		alt: 'A laptop showing the code behind a web platform',
		width: 800,
		height: 600,
		placeholder: unsplash('1489875347897-49f64b51c1f8')
	},
	capabilityMobile: {
		src: '/images/photos/cap-mobile.jpg',
		alt: 'A mobile app running on a phone held in one hand',
		width: 800,
		height: 600,
		placeholder: unsplash('1609921141835-710b7fa6e438')
	}
} satisfies Record<string, ImageAsset>;

export type MediaKey = keyof typeof media;

/** Every stand-in still awaiting Makutano's own photography. */
export function pendingPlaceholders(): { key: MediaKey; url: string }[] {
	return (Object.entries(media) as [MediaKey, ImageAsset][])
		.filter(([, asset]) => asset.placeholder)
		.map(([key, asset]) => ({ key, url: asset.placeholder!.url }));
}
