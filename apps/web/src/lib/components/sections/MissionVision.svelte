<script lang="ts">
	import { reveal } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import type { SiteSettings } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';

	interface Props {
		site: SiteSettings;
		heading?: boolean;
	}

	let { site, heading = true }: Props = $props();

	const copy = {
		eyebrow: { en: 'Mission and vision', sw: 'Dhamira na malengo' },
		title: { en: 'What we are here to do', sw: 'Tuliyopo kufanya' },
		mission: { en: 'Our mission', sw: 'Dhamira yetu' },
		vision: { en: 'Our vision', sw: 'Malengo yetu' }
	};
</script>

<section class="section mission">
	<div class="container">
		{#if heading}
			<SectionHeading eyebrow={t(copy.eyebrow)} title={t(copy.title)} align="center" />
		{/if}

		<div class="pair">
			<article use:reveal={{ type: 'left' }}>
				<header>
					<span class="ico"><Icon name="target" size={22} /></span>
					<h3>{t(copy.mission)}</h3>
				</header>
				<p>{t(site.mission)}</p>
			</article>

			<article class="accent" use:reveal={{ type: 'right', delay: 140 }}>
				<header>
					<span class="ico"><Icon name="globe" size={22} /></span>
					<h3>{t(copy.vision)}</h3>
				</header>
				<p>{t(site.vision)}</p>
			</article>
		</div>
	</div>
</section>

<style>
	.pair {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1rem, 2.4vw, 1.75rem);
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}

	article {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		padding: clamp(1.75rem, 3.2vw, 2.75rem);
		background: var(--bg-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		transition:
			border-color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	article:hover {
		transform: translateY(-4px);
		border-color: var(--line-strong);
	}

	article.accent {
		background: linear-gradient(150deg, rgba(var(--brand-rgb), 0.14), var(--bg-raised) 65%);
		border-color: rgba(var(--brand-rgb), 0.35);
	}

	.ico {
		flex: none;
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: 15px;
		background: var(--brand-soft);
		color: var(--brand);
		transition:
			background var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out);
	}

	article:hover .ico {
		background: var(--brand);
		color: var(--on-brand);
	}

	/* Icon and title share a row, with a rule under them, so the heading reads
	   as a heading rather than as the first line of the paragraph. */
	header {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		width: 100%;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--line);
	}

	h3 {
		font-size: clamp(1.25rem, 1.9vw, 1.625rem);
		letter-spacing: -0.015em;
	}

	p {
		margin: 0;
		font-size: 1rem;
	}

	@media (max-width: 800px) {
		.pair {
			grid-template-columns: 1fr;
		}
	}
</style>
