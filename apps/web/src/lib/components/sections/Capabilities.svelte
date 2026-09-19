<script lang="ts">
	import { reveal } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import { media, ui, type Capability } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		capabilities: Capability[];
	}

	let { capabilities }: Props = $props();

	/** Stand-in photography, keyed by capability. Swapped out with the CMS. */
	const shots = {
		'cap-ai': media.capabilityAi,
		'cap-web': media.capabilityWeb,
		'cap-mobile': media.capabilityMobile
	} as const;
</script>

<section class="section capabilities" id="intro" aria-labelledby="capabilities-title">
	<div class="container">
		<div class="section-intro"><span class="eyebrow">{t({en: 'What we build', sw: 'Tunachotengeneza'})}</span><h2 id="capabilities-title">{t({en: 'Technology that works for you.', sw: 'Teknolojia inayokufaa.'})}</h2></div>
		<ul class="grid-cards">
			{#each capabilities as capability, i (capability.id)}
				{@const shot = shots[capability.id as keyof typeof shots]}
				<li use:reveal={{ type: 'up', delay: i * 120 }}>
					<article class="card" >
						{#if shot}
							<div class="shot">
								<img
									src={shot.src}
									alt={shot.alt}
									width={shot.width}
									height={shot.height}
									loading="lazy" />
							</div>
						{/if}

						<span class="ico"><Icon name={capability.icon} size={22} /></span>
						<h3>{t(capability.title)}</h3>
						<p>{t(capability.description)}</p>
						<a href={capability.id === 'cap-web' ? '/services#web-solutions' : '/services#software-development'} class="more" aria-label={`${t(ui.readMore)}: ${t(capability.title)}`}>
							{t(ui.readMore)}
							<Icon name="arrow-up-right" size={15} />
						</a>
					</article>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.section-intro { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
	.more { min-height: 44px; }
	.capabilities {
		padding-top: clamp(3rem, 6vw, 4.5rem);
	}

	.grid-cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(1.25rem, 2.5vw, 1.75rem);
		align-items: stretch;
		padding: 14px 10px 26px;
		margin: -14px -10px -26px;
		overflow: visible;
	}

	.grid-cards > li { min-width: 0; }

	.card {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.95rem;
		padding: 0 clamp(1.75rem, 3vw, 2.25rem) clamp(1.75rem, 3vw, 2.25rem);
		overflow: hidden;
		isolation: isolate;
		background:
			radial-gradient(circle at 92% 94%, rgba(var(--brand-rgb), .1), transparent 32%),
			linear-gradient(145deg, rgba(255, 255, 255, .035), transparent 42%),
			var(--bg-raised);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, .055);
		transform: translateZ(0);
	}

	.card::after {
		content: '';
		position: absolute;
		inset: 0 auto auto 9%;
		width: 32%;
		height: 2px;
		border-radius: 0 0 999px 999px;
		background: linear-gradient(90deg, var(--brand), rgba(var(--brand-rgb), 0));
		opacity: .68;
		transition: width 360ms var(--ease-emphasized), opacity 260ms var(--ease-out);
	}

	.grid-cards .card:hover,
	.grid-cards .card:focus-within {
		border-color: rgba(var(--brand-rgb), .42);
		transform: translateY(-3px);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, .075);
	}

	.card:hover::after,
	.card:focus-within::after { width: 58%; opacity: 1; }

	.shot {
		position: relative;
		width: calc(100% + clamp(3.5rem, 6vw, 4.5rem));
		margin: 0 clamp(-2.25rem, -3vw, -1.75rem) clamp(0.75rem, 1.5vw, 1.25rem);
		overflow: hidden;
		border-bottom: 1px solid var(--line);
	}

	.shot::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(180deg, transparent 62%, rgba(var(--bg-rgb), .2));
	}

	.shot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 16 / 10;
		filter: grayscale(0.55) contrast(1.05);
		transition:
			transform 900ms var(--ease-out),
			filter 600ms var(--ease-out);
	}

	.card:hover .shot img {
		transform: scale(1.06);
		filter: grayscale(0) contrast(1);
	}

	.ico {
		display: grid;
		margin-top: -2.7rem;
		place-items: center;
		width: 56px;
		height: 56px;
		z-index: 1;
		border: 6px solid var(--bg-raised);
		border-radius: 18px;
		background: var(--brand);
		color: var(--on-brand);
		box-shadow: 0 8px 22px rgba(4, 10, 18, .14);
		transition:
			background var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out),
			box-shadow var(--dur) var(--ease-out);
	}

	.card:hover .ico {
		color: var(--on-brand);
		transform: rotate(-5deg) translateY(-2px);
		box-shadow: 0 11px 24px rgba(4, 10, 18, .18);
	}

	h3 {
		font-size: 1.25rem;
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
		margin-top: 0.65rem;
		padding-top: 1rem;
		width: 100%;
		border-top: 1px solid var(--line);
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--brand-ink);
	}

	.more :global(svg) {
		transition: transform var(--dur) var(--ease-out);
	}

	.more:hover :global(svg) {
		transform: translate(3px, -3px);
	}

	@media (max-width: 700px) {
		.grid-cards {
			grid-template-columns: 1fr;
		}
	}
</style>
