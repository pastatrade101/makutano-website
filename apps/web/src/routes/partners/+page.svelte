<script lang="ts">
	import { reveal, splitText } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import { seo } from '$lib/seo';
	import { ui } from '@makutano/shared';
	import Seo from '$components/ui/Seo.svelte';
	import Icon from '$components/ui/Icon.svelte';
	import PageBanner from '$components/layout/PageBanner.svelte';

	let { data } = $props();

	const copy = {
		eyebrow: { en: 'Our partners', sw: 'Washirika wetu' },
		title: {
			en: 'Organisations we work alongside',
			sw: 'Mashirika tunayoshirikiana nayo'
		},
		lead: {
			en: 'We work alongside a small group of trusted organisations across finance, technology, and education to deliver more value to our clients.',
			sw: 'Tunashirikiana na kundi dogo la mashirika yanayoaminika katika fedha, teknolojia, na elimu ili kuongeza thamani kwa wateja wetu.'
		},
		closingEyebrow: { en: 'Partnership', sw: 'Ushirikiano' },
		closingTitle: {
			en: 'Interested in partnering with Makutano Digital?',
			sw: 'Unapenda kushirikiana na Makutano Digital?'
		},
		sectorLabel: { en: 'Sector', sw: 'Sekta' }
	};

	/** Strips the scheme so links read as a domain, the way the live site shows them. */
	const domain = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
</script>

<Seo title={seo.partners.title} description={seo.partners.description} />

<PageBanner eyebrow={t(copy.eyebrow)} title={t(copy.title)} lead={t(copy.lead)} />

<section class="section partners">
	<div class="container">
		<ul class="list">
			{#each data.partners as partner, i (partner.id)}
				<li use:reveal={{ type: 'up', delay: i * 120 }}>
					<article>
						<div class="logo">
							{#if ['/images/partners/ilboru.svg', '/images/partners/moinfotech.svg', '/images/partners/smartclass.svg'].includes(partner.logo)}
								<span class="wordmark" aria-hidden="true">{partner.name}</span>
							{:else}
								<img src={partner.logo} alt="" width="240" height="80" loading="lazy" />
							{/if}
						</div>

						<div class="body">
							<span class="sector">
								<Icon name="layers" size={13} />
								{t(partner.sector)}
							</span>

							<h2>{partner.name}</h2>
							<p>{t(partner.description)}</p>

							<div class="meta">
								{#if partner.tag}
									<span class="tag">{t(partner.tag)}</span>
								{/if}
								{#if partner.url}
									<a
										class="visit"
										aria-label={t({en: `Visit ${partner.name} (opens in a new tab)`, sw: `Tembelea ${partner.name} (kichupo kipya)`})}
										href={partner.url}
										target="_blank"
										rel="noopener noreferrer">
										{domain(partner.url)}
										<Icon name="arrow-up-right" size={14} />
									</a>
								{/if}
							</div>
						</div>

						<span class="index" aria-hidden="true">0{i + 1}</span>
					</article>
				</li>
			{/each}
		</ul>

		<div class="panel" use:reveal={{ type: 'scale', delay: 120 }}>
			<span class="eyebrow">{t(copy.closingEyebrow)}</span>
			<h2 use:splitText={{ by: 'line', stagger: 80 }}>{t(copy.closingTitle)}</h2>
			<a class="btn" href="/contact">
				{t(ui.getInTouch)}
				<Icon name="arrow-up-right" size={16} class="btn-arrow" />
			</a>
		</div>
	</div>
</section>

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2vw, 1.5rem);
	}

	article {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 0.45fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
		padding: clamp(1.75rem, 3vw, 2.5rem);
		background: var(--bg-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition:
			border-color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	li:hover article {
		border-color: rgba(var(--brand-rgb), 0.4);
		transform: translateY(-4px);
	}

	.logo {
		display: grid;
		place-items: center;
		padding: clamp(1.5rem, 3vw, 2.5rem) 1rem;
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		color: var(--ink-muted);
		transition: color var(--dur) var(--ease-out);
	}

	li:hover .logo {
		color: var(--ink);
	}

	.wordmark { font: 600 clamp(1.4rem, 2.5vw, 2rem) var(--font-display); color: var(--ink); text-align: center; }

	.logo img {
		width: 100%;
		max-width: 15rem;
		height: auto;
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.65rem;
	}

	.sector {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-display);
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--brand);
	}

	h2 {
		font-size: clamp(1.375rem, 2.4vw, 1.875rem);
	}

	.body p {
		margin: 0;
		max-width: 60ch;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.4rem;
	}

	.visit {
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-display);
		font-size: 0.875rem;
		color: var(--brand);
	}

	.visit :global(svg) {
		transition: transform var(--dur) var(--ease-out);
	}

	.visit:hover :global(svg) {
		transform: translate(3px, -3px);
	}

	.index {
		position: absolute;
		top: -0.75rem;
		right: 0.75rem;
		font-family: var(--font-display);
		font-size: 5rem;
		font-weight: 700;
		line-height: 1;
		color: transparent;
		-webkit-text-stroke: 1px var(--line);
		pointer-events: none;
		transition: -webkit-text-stroke-color var(--dur) var(--ease-out);
	}

	li:hover .index {
		-webkit-text-stroke-color: rgba(var(--brand-rgb), 0.4);
	}

	/* closing panel ------------------------------------------------------ */

	.panel {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		text-align: center;
		margin-top: clamp(3rem, 6vw, 4.5rem);
		padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 4vw, 3rem);
		border: 1px solid rgba(var(--brand-rgb), 0.3);
		border-radius: var(--radius-lg);
		background: linear-gradient(150deg, rgba(var(--brand-rgb), 0.14), var(--bg-raised) 70%);
		overflow: hidden;
	}

	.panel::after {
		content: '';
		position: absolute;
		bottom: -50%;
		left: 50%;
		translate: -50% 0;
		width: 60%;
		aspect-ratio: 2;
		background: rgba(var(--brand-rgb), 0.28);
		filter: blur(80px);
		pointer-events: none;
	}

	.panel h2 {
		max-width: 22ch;
		font-size: var(--fs-h2);
	}

	@media (max-width: 800px) {
		article {
			grid-template-columns: 1fr;
		}
	}
</style>
