<script lang="ts">
	import { page } from '$app/state';
	import { t } from '$lib/i18n.svelte';
	import { nav, ui } from '@makutano/shared';
	import Icon from '$components/ui/Icon.svelte';

	const copy = {
		notFound: { en: 'This page could not be found', sw: 'Ukurasa huu haujapatikana' },
		generic: { en: 'Something went wrong', sw: 'Kitu hakikwenda sawa' },
		lead: {
			en: 'The page may have moved, or the link may be out of date. Try one of these instead.',
			sw: 'Ukurasa huenda umehamishwa, au kiungo kimepitwa na wakati. Jaribu mojawapo ya haya.'
		},
		home: { en: 'Back to home', sw: 'Rudi nyumbani' }
	};
</script>

<svelte:head>
	<title>{page.status} — Makutano Digital</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="error">
	<div class="container inner">
		<span class="code" aria-hidden="true">{page.status}</span>
		<h1>{page.status === 404 ? t(copy.notFound) : t(copy.generic)}</h1>
		<p class="lead">{page.status === 404 ? t(copy.lead) : t({en: 'Please try again, or contact our team if the problem continues.', sw: 'Tafadhali jaribu tena, au wasiliana na timu yetu ikiwa tatizo linaendelea.'})}</p>

		<nav class="links" aria-label="Suggested pages">
			{#each nav.slice(1) as item (item.href)}
				<a href={item.href} class="tag">{t(item.label)}</a>
			{/each}
		</nav>

		<div class="actions">
			<a class="btn" href="/">
				{t(copy.home)}
				<Icon name="arrow-up-right" size={16} class="btn-arrow" />
			</a>
			<a class="btn btn--ghost" href="/contact">
				{t(ui.getInTouch)}
				<Icon name="arrow-right" size={16} class="btn-arrow" />
			</a>
		</div>
	</div>
</section>

<style>
	.error {
		min-height: 80vh;
		display: grid;
		place-items: center;
		padding-top: calc(var(--header-h) + 3rem);
		padding-bottom: 4rem;
		position: relative;
		overflow: hidden;
	}

	.error::before {
		content: '';
		position: absolute;
		top: 10%;
		left: 50%;
		translate: -50% 0;
		width: min(50rem, 90vw);
		aspect-ratio: 1;
		background: rgba(var(--brand-rgb), 0.16);
		filter: blur(110px);
		pointer-events: none;
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.125rem;
		text-align: center;
	}

	.code {
		font-family: var(--font-display);
		font-size: clamp(6rem, 22vw, 14rem);
		font-weight: 700;
		line-height: 0.9;
		letter-spacing: -0.05em;
		color: transparent;
		-webkit-text-stroke: 2px rgba(var(--brand-rgb), 0.55);
		animation: drop 900ms var(--ease-out) both;
	}

	h1 {
		font-size: var(--fs-h2);
	}

	.lead {
		max-width: 44ch;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.links a {
		transition:
			border-color var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out);
	}

	.links a:hover {
		border-color: var(--brand);
		color: var(--brand-ink);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	@keyframes drop {
		from {
			opacity: 0;
			transform: translateY(-30px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.code {
			animation: none;
		}
	}
</style>
