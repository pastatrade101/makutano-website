<script lang="ts">
	import { page } from '$app/state';
	import { t } from '$lib/i18n.svelte';
	import { nav } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		eyebrow: string;
		title: string;
		lead?: string;
	}

	let { eyebrow, title, lead }: Props = $props();

	const crumb = $derived(nav.find((n) => n.href === page.url.pathname));
</script>

<section class="banner">
	<div class="bg" style="background-image: url('/images/backgrounds/page-title.jpg')"></div>

	<div class="grid-lines" aria-hidden="true">
		<span></span><span></span><span></span><span></span>
	</div>

	<div class="container inner">
		<nav class="crumbs" aria-label="Breadcrumb">
			<a href="/">{t(nav[0].label)}</a>
			<Icon name="arrow-right" size={13} />
			<span aria-current="page">{crumb ? t(crumb.label) : title}</span>
		</nav>

		<span class="eyebrow">{eyebrow}</span>
		<h1>{title}</h1>

		{#if lead}
			<p class="lead">{lead}</p>
		{/if}
	</div>
</section>

<style>
	.banner {
		position: relative;
		padding-top: calc(var(--header-h) + clamp(2.5rem, 5vw, 4rem));
		padding-bottom: clamp(3rem, 6vw, 4.5rem);
		overflow: hidden;
		isolation: isolate;
		border-bottom: 1px solid var(--line);
	}

	.bg {
		position: absolute;
		inset: 0;
		z-index: -2;
		background-size: cover;
		background-position: center;
		
	}

	.banner::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			110deg,
			rgba(var(--bg-rgb), 0.95) 30%,
			rgba(var(--bg-rgb), 0.8) 65%,
			rgba(var(--brand-rgb), 0.28)
		);
	}

	.grid-lines {
		position: absolute;
		inset: 0;
		z-index: -1;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		max-width: calc(var(--container-wide) + var(--gutter) * 2);
		margin-inline: auto;
		padding-inline: var(--gutter);
		pointer-events: none;
	}

	.grid-lines span {
		border-left: 1px solid var(--line);
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		max-width: calc(var(--container) + var(--gutter) * 2);
	}

	.lead { max-width: 58ch; }

	.crumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: var(--ink-subtle);
		
	}

	.crumbs a {
		color: var(--ink-muted);
		transition: color var(--dur-fast) var(--ease-out);
	}

	.crumbs a:hover {
		color: var(--brand-ink);
	}

	.crumbs span {
		color: var(--brand-ink);
	}


	h1 {
		font-size: var(--fs-display);
		max-width: min(100%, 850px);
	}

</style>
