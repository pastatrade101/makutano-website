<script lang="ts">
	import { reveal } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import { ui, type Service } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';

	interface Props {
		services: Service[];
		/** `list` is the tall numbered list used on /services; `grid` is the home teaser. */
		variant?: 'grid' | 'list';
		heading?: boolean;
	}

	let { services, variant = 'grid', heading = true }: Props = $props();

	const copy = {
		eyebrow: { en: 'Seven core service domains', sw: 'Nyanja saba za huduma' },
		title: { en: 'Expertise & core competencies', sw: 'Utaalam na uwezo wetu wa msingi' },
		primaryFlag: { en: 'Primary business activity', sw: 'Shughuli kuu ya biashara' }
	};
</script>

<section class="section domains" class:is-list={variant === 'list'} class:no-heading={!heading} id="domains">
	<div class="container">
		{#if heading}
			<SectionHeading eyebrow={t(copy.eyebrow)} title={t(copy.title)} />
		{/if}

		<ul class="items" class:list={variant === 'list'}>
			{#each services as service, i (service.id)}
				<li
					id={service.slug}
					class:primary={service.isPrimary}
					use:reveal={{ type: variant === 'list' ? 'left' : 'up', delay: (i % 3) * 110 }}>
					<article>
						<span class="num">{service.number}</span>

						<span class="ico"><Icon name={service.icon} size={21} /></span>

						<div class="body">
							<div class="title-row">
								<h3>{t(service.title)}</h3>
								{#if service.isPrimary}
									<span class="flag">{t(copy.primaryFlag)}</span>
								{/if}
							</div>
							<p>{t(service.description)}</p>
							<a href={variant === 'list' ? `/contact?service=${encodeURIComponent(service.title.en)}` : `/services#${service.slug}`} class="more" aria-label={`${variant === 'list' ? t(ui.requestProposal) : t(ui.viewDetails)}: ${t(service.title)}`}>
								{variant === 'list' ? t(ui.requestProposal) : t(ui.viewDetails)}
								<Icon name="arrow-up-right" size={15} />
							</a>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.items {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(1rem, 2vw, 1.5rem);
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}

	.no-heading .items { margin-top: 0; }
	.more { min-height: 44px; margin-top: .5rem; }
	.ico { flex: none; }
	.body { min-width: 0; }
	.flag { line-height: 1.4; }
	.items:not(.list) li:last-child:nth-child(3n + 1) { grid-column: 1 / -1; }

	.items.list {
		grid-template-columns: 1fr;
		gap: 0;
	}

	li {
		height: 100%;
	}

	article {
		position: relative;
		height: 100%;
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
			transform var(--dur) var(--ease-out),
			background var(--dur) var(--ease-out);
	}

	article::before {
		content: '';
		position: absolute;
		inset: auto 0 0 0;
		height: 2px;
		background: var(--brand);
		transform: scaleX(0);
		transform-origin: 0 50%;
		transition: transform var(--dur-slow) var(--ease-out);
	}

	li:hover article {
		border-color: var(--line-strong);
		transform: translateY(-4px);
	}

	li:hover article::before {
		transform: scaleX(1);
	}

	.primary article {
		border-color: rgba(var(--brand-rgb), 0.45);
		background: linear-gradient(140deg, rgba(var(--brand-rgb), 0.12), var(--bg-raised) 60%);
	}

	.num {
		font-family: var(--font-display);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		color: var(--brand-ink);
	}

	.ico {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: 14px;
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

	.body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.6rem;
		flex: 1;
	}

	.title-row {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	h3 {
		font-size: 1.1875rem;
	}

	.flag {
		display: inline-flex;
		padding: 0.3rem 0.65rem;
		border-radius: var(--radius-pill);
		background: var(--brand);
		color: var(--on-brand);
		font-family: var(--font-display);
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		line-height: 1;
	}

	p {
		font-size: 0.9375rem;
		margin: 0;
		flex: 1;
	}

	.more {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-display);
		font-size: 0.875rem;
		color: var(--brand-ink);
	}

	.more :global(svg) {
		transition: transform var(--dur) var(--ease-out);
	}

	.more:hover :global(svg) {
		transform: translate(3px, -3px);
	}

	/* list variant ------------------------------------------------------- */

	.items.list article {
		flex-direction: row;
		align-items: flex-start;
		gap: clamp(1rem, 3vw, 2.5rem);
		border-radius: 0;
		border-inline: 0;
		border-top: 0;
		background: transparent;
		padding-inline: 0;
		padding-block: clamp(1.75rem, 3vw, 2.5rem);
	}

	.items.list li:first-child article {
		border-top: 1px solid var(--line);
	}

	.items.list .primary article {
		background: transparent;
	}

	.items.list li:hover article {
		transform: none;
		background: var(--surface-hover);
	}

	.items.list .num {
		font-size: clamp(1.75rem, 3.4vw, 2.75rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		color: var(--ink-subtle);
		min-width: 3ch;
		line-height: 1;
		transition: color var(--dur) var(--ease-out);
	}

	.items.list li:hover .num {
		color: var(--brand-ink);
	}

	.items.list h3 {
		font-size: clamp(1.25rem, 2.2vw, 1.75rem);
	}

	.items.list p {
		max-width: 62ch;
	}

	@media (max-width: 1000px) {
		.items {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 680px) {
		.items {
			grid-template-columns: 1fr;
		}

		.items.list article {
			flex-direction: column;
			gap: 0.75rem;
		}

		.items.list .ico {
			display: none;
		}
	}
</style>
