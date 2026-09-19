<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		title: string;
		description: string;
		image?: string;
	}

	let { title, description, image = '/images/backgrounds/hero.jpg' }: Props = $props();

	const url = $derived(page.url.href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Makutano Digital" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
