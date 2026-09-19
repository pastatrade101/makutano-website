<script lang="ts">
	import { reveal } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import type { CredibilityItem } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';

	interface Props {
		items: CredibilityItem[];
		/** The home page shows the first two; /about shows all five. */
		limit?: number;
		eyebrow?: string;
	}

	let { items, limit, eyebrow }: Props = $props();

	const copy = {
		eyebrowHome: { en: 'Why choose us', sw: 'Kwa nini utuchague' },
		title: { en: 'Proven credibility', sw: 'Uaminifu uliothibitika' },
		lead: {
			en: 'Why you can trust us to deliver exceptional results that exceed expectations.',
			sw: 'Kwa nini unaweza kutuamini kutoa matokeo bora yanayozidi matarajio.'
		}
	};

	const shown = $derived(limit ? items.slice(0, limit) : items);
</script>

<section class="section credibility">
	<div class="container">
		<SectionHeading
			eyebrow={eyebrow ?? t(copy.eyebrowHome)}
			title={t(copy.title)}
			lead={t(copy.lead)}
			align="center" />

		<ul class="items" class:five={shown.length === 5}>
			{#each shown as item, i (item.id)}
				<li use:reveal={{ type: 'up', delay: i * 100 }}>
					<span class="ico"><Icon name={item.icon} size={22} /></span>
					<h3>{t(item.title)}</h3>
					<p>{t(item.description)}</p>
					<span class="index" aria-hidden="true">0{i + 1}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.items {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
		gap: clamp(1rem, 2vw, 1.5rem);
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}

	.items.five { grid-template-columns: repeat(6, minmax(0, 1fr)); }
	.items.five li { grid-column: span 2; }
	.items.five li:nth-last-child(-n+2) { grid-column: span 3; }
	@media (max-width: 800px) {
	 .items.five { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	 .items.five li, .items.five li:nth-last-child(-n+2) { grid-column: auto; }
	 .items.five li:last-child { grid-column: 1 / -1; }
	}
	@media (max-width: 560px) { .items.five { grid-template-columns: 1fr; } }

	li {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		padding: clamp(1.5rem, 2.6vw, 2rem);
		background: var(--bg-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition:
			border-color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	li:hover {
		border-color: rgba(var(--brand-rgb), 0.4);
		transform: translateY(-5px);
	}

	.ico {
		display: grid;
		place-items: center;
		width: 50px;
		height: 50px;
		border-radius: 15px;
		background: var(--brand-soft);
		color: var(--brand-ink);
		transition:
			background var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	li:hover .ico {
		background: var(--brand);
		color: var(--on-brand);
		transform: rotate(-6deg);
	}

	h3 {
		font-size: 1.125rem;
		max-width: 18ch;
	}

	p {
		font-size: 0.9375rem;
		margin: 0;
	}

	/* Oversized ghost numeral in the corner. */
	.index {
		position: absolute;
		top: -0.5rem;
		right: 0.5rem;
		font-family: var(--font-display);
		font-size: 4.5rem;
		font-weight: 700;
		line-height: 1;
		color: transparent;
		-webkit-text-stroke: 1px var(--line);
		pointer-events: none;
		transition: -webkit-text-stroke-color var(--dur) var(--ease-out);
	}

	li:hover .index {
		-webkit-text-stroke-color: rgba(var(--brand-rgb), 0.45);
	}
</style>
