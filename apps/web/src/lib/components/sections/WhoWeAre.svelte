<script lang="ts">
	import { parallax, reveal, splitText } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import { media, prose, ui, whoWeAreChecklist } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		/** The home page shows a shorter heading than /about. */
		variant?: 'home' | 'about';
	}

	let { variant = 'home' }: Props = $props();

	/** About leads with the working-session shot so the two pages differ. */
	const primary = $derived(variant === 'about' ? media.aboutMeeting : media.aboutPrimary);

	const copy = {
		eyebrow: { en: 'Who we are', sw: 'Sisi ni nani' },
		homeTitle: {
			en: 'A Tanzanian digital solutions partnership',
			sw: 'Ushirikiano wa suluhisho za kidijitali wa Tanzania'
		},
		aboutTitle: {
			en: 'One trusted partner for your digital presence',
			sw: 'Mshirika mmoja wa kuaminika kwa uwepo wako wa kidijitali'
		}
	};
</script>

<section class="section who" id="who-we-are">
	<div class="container">
		<div class="split">
			<div class="media">
				<div class="frame" use:reveal={{ type: 'clip', duration: 1100 }}>
					<img
						src={primary.src}
						alt={primary.alt}
						width={primary.width}
						height={primary.height}
						loading="lazy" />
				</div>
				<div class="frame frame--small" use:parallax={0.25}>
					<img
						src={media.aboutSecondary.src}
						alt={media.aboutSecondary.alt}
						width={media.aboutSecondary.width}
						height={media.aboutSecondary.height}
						loading="lazy" />
				</div>

				<!-- Brand motif: makutano means "meeting point". -->
				<img
					class="motif"
					src="/images/art/domains-grid.svg"
					alt=""
					width="320"
					height="320"
					aria-hidden="true"
					loading="lazy" />
			</div>

			<div class="copy">
				<span class="eyebrow" use:reveal={{ type: 'up' }}>{t(copy.eyebrow)}</span>
				<h2 use:splitText={{ by: 'line', stagger: 80 }}>
					{variant === 'about' ? t(copy.aboutTitle) : t(copy.homeTitle)}
				</h2>
				<p class="lead" use:reveal={{ type: 'up', delay: 150 }}>{t(prose.whoWeAre)}</p>

				{#if variant === 'about'}
					<p use:reveal={{ type: 'up', delay: 220 }}>{t(prose.valueProposition)}</p>
				{:else}
					<ul class="checklist" use:reveal={{ stagger: 100, childSelector: 'li' }}>
						{#each whoWeAreChecklist as item (item.en)}
							<li>
								<span class="tick"><Icon name="check" size={13} stroke={2.4} /></span>
								{t(item)}
							</li>
						{/each}
					</ul>

					<a class="btn" href="/about" use:reveal={{ type: 'up', delay: 240 }}>
						{t(ui.moreAboutUs)}
						<Icon name="arrow-up-right" size={16} class="btn-arrow" />
					</a>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.split {
		display: grid;
		/* The media column is deliberately the narrower of the two: the copy is
		   the point of the section, and a taller image strands space beside it. */
		grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
	}

	.media {
		max-width: 30rem;
	}

	.media {
		position: relative;
		padding-bottom: 2.5rem;
	}

	.frame {
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.frame img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		aspect-ratio: 4 / 4.15;
		transition: transform 900ms var(--ease-out);
	}

	.frame:hover img {
		transform: scale(1.05);
	}

	.frame--small {
		position: absolute;
		right: -6%;
		bottom: 0;
		width: 46%;
		border: 6px solid var(--bg);
		box-shadow: var(--shadow);
	}

	.frame--small img {
		aspect-ratio: 1 / 1;
	}

	.frame--small {
		border-radius: var(--radius-lg);
	}

	/* Small brand mark tucked into the top-left corner of the composition. */
	.motif {
		position: absolute;
		top: -1.25rem;
		left: -1.25rem;
		width: clamp(64px, 8vw, 96px);
		height: auto;
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		pointer-events: none;
	}

	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.25rem;
	}

	.copy h2 {
		max-width: 18ch;
	}

	.checklist {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.9rem 1.25rem;
		margin-block: 0.5rem;
		width: 100%;
	}

	.checklist li {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		color: var(--ink);
	}

	.tick {
		flex: none;
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--brand-soft);
		color: var(--brand);
		transition:
			background var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out);
	}

	.checklist li:hover .tick {
		background: var(--brand);
		color: var(--on-brand);
	}

	@media (max-width: 900px) {
		.frame--small { right: 0; }
		.split {
			grid-template-columns: 1fr;
		}
		.media {
			max-width: 28rem;
		}
		.checklist {
			grid-template-columns: 1fr;
		}
	}
</style>
