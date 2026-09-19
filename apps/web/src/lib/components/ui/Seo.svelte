<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		title: string;
		description: string;
		image?: string;
	}

	let { title, description, image = '/images/brand/makutano-mark.png' }: Props = $props();

	const siteUrl = 'https://makutano.co.tz';
	const url = $derived(`${siteUrl}${page.url.pathname}`);
	const shareImage = $derived(new URL(image, siteUrl).href);
	const imageAlt = 'Makutano Digital logo';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Makutano Digital Company Limited" />
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_TZ" />
	<meta property="og:site_name" content="Makutano Digital" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={shareImage} />
	<meta property="og:image:secure_url" content={shareImage} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="3200" />
	<meta property="og:image:height" content="3200" />
	<meta property="og:image:alt" content={imageAlt} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={shareImage} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
