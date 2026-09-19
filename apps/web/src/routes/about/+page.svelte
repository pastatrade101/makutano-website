<script lang="ts">
	import { reveal } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import { seo } from '$lib/seo';
	import { prose } from '@makutano/shared';
	import Seo from '$components/ui/Seo.svelte';
	import Icon from '$components/ui/Icon.svelte';
	import SectionHeading from '$components/ui/SectionHeading.svelte';
	import PageBanner from '$components/layout/PageBanner.svelte';
	import WhoWeAre from '$components/sections/WhoWeAre.svelte';
	import MissionVision from '$components/sections/MissionVision.svelte';
	import Credibility from '$components/sections/Credibility.svelte';

	let { data } = $props();
	const publishedLeadership = $derived(data.leadership.filter((member) => member.name.trim() && !member.name.includes('[') && !member.image.includes('placeholder')));

	const copy = {
		bannerEyebrow: {
			en: 'Meet Makutano Digital',
			sw: 'Ifahamu Makutano Digital'
		},
		bannerTitle: {
			en: 'A Tanzanian digital solutions partnership',
			sw: 'Ushirikiano wa suluhisho za kidijitali wa Tanzania'
		},
		bannerLead: {
			en: "Established to bridge the gap between opportunity and execution in the country's fast-growing digital economy.",
			sw: 'Umeanzishwa kuunganisha fursa na utekelezaji katika uchumi wa kidijitali unaokua kwa kasi wa nchi.'
		},
		valuesEyebrow: { en: 'Our values', sw: 'Maadili yetu' },
		valuesTitle: { en: 'Our Core Values', sw: 'Maadili Yetu Makuu' },
		regTitle: { en: 'Business registration', sw: 'Usajili wa biashara' },
		regLead: {
			en: 'A duly licensed business registered for the provision of local ICT services.',
			sw: 'Biashara iliyosajiliwa kisheria kwa utoaji wa huduma za TEHAMA za ndani.'
		},
		leadershipEyebrow: { en: 'Leadership', sw: 'Uongozi' },
		leadershipTitle: {
			en: 'A two-member executive team',
			sw: 'Timu ya uongozi ya watu wawili'
		},
		leadershipNote: {
			en: 'Names, degrees and years of experience still to be supplied.'
		},
		credibilityEyebrow: { en: 'Why us', sw: 'Kwa nini sisi' }
	};
</script>

<Seo title={seo.about.title} description={seo.about.description} />

<PageBanner
	eyebrow={t(copy.bannerEyebrow)}
	title={t(copy.bannerTitle)}
	lead={t(copy.bannerLead)} />

<WhoWeAre variant="about" />

<!-- Core values ---------------------------------------------------------- -->
<section class="section values">
	<div class="container">
		<SectionHeading
			eyebrow={t(copy.valuesEyebrow)}
			title={t(copy.valuesTitle)}
			align="center" />

		<ul class="value-grid">
			{#each data.values as value, i (value.id)}
				<li use:reveal={{ type: 'up', delay: i * 90 }}>
					<span class="ico"><Icon name={value.icon} size={21} /></span>
					<h3>{t(value.title)}</h3>
					<p>{t(value.description)}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<MissionVision site={data.site} />

<!-- Business registration ------------------------------------------------ -->
<section class="section registration">
	<div class="container">
		<div class="reg-split">
			<div class="reg-copy">
				<SectionHeading title={t(copy.regTitle)} lead={t(copy.regLead)} />
				<span class="seal" use:reveal={{ type: 'scale', delay: 200 }}>
					<Icon name="check-badge" size={20} />
					{t({en: 'Licensed ICT services provider', sw: 'Mtoa huduma za TEHAMA aliyesajiliwa'})}
				</span>
			</div>

			<dl class="reg-table" use:reveal={{ stagger: 80, childSelector: 'div' }}>
				{#each data.site.registration as row (row.value)}
					<div>
						<dt>{t(row.label)}</dt>
						<dd>{row.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<!-- Leadership ----------------------------------------------------------- -->
{#if publishedLeadership.length}
<section class="section leadership">
	<div class="container">
		<SectionHeading
			eyebrow={t(copy.leadershipEyebrow)}
			title={t(copy.leadershipTitle)}
			lead={t(prose.leadershipIntro)} />

		<ul class="team">
			{#each publishedLeadership as member, i (member.id)}
				<li use:reveal={{ type: 'up', delay: i * 140 }}>
					<div class="portrait">
						<img src={member.image} alt={member.name} width="360" height="420" loading="lazy" />
					</div>
					<div class="who">
						<h3>{member.name}</h3>
						<span class="role">{t(member.role)}</span>
						<p>{t(member.bio)}</p>
					</div>
				</li>
			{/each}
		</ul>

	</div>
</section>
{/if}

<Credibility items={data.credibility} eyebrow={t(copy.credibilityEyebrow)} />

<style>
	/* values ------------------------------------------------------------- */

	.value-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: clamp(1rem, 2vw, 1.5rem);
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}

	.value-grid li {
		grid-column: span 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		padding: clamp(1.5rem, 2.6vw, 2rem);
		background: var(--bg-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		transition:
			border-color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	.value-grid li:last-child:nth-child(3n + 1) { grid-column: 1 / -1; }
	.value-grid li:last-child:nth-child(3n + 2), .value-grid li:nth-last-child(2):nth-child(3n + 1) { grid-column: span 3; }
	@media (max-width: 800px) {
	 .value-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	 .value-grid li, .value-grid li:last-child:nth-child(n), .value-grid li:nth-last-child(2):nth-child(n) { grid-column: auto; }
	 .value-grid li:last-child:nth-child(odd) { grid-column: 1 / -1; }
	}
	@media (max-width: 560px) { .value-grid { grid-template-columns: 1fr; } }

	.value-grid li:hover {
		border-color: rgba(var(--brand-rgb), 0.4);
		transform: translateY(-5px);
	}

	.ico {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: 14px;
		background: var(--brand-soft);
		color: var(--brand);
		transition:
			background var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	.value-grid li:hover .ico {
		background: var(--brand);
		color: var(--on-brand);
		transform: rotate(-6deg);
	}

	.value-grid h3 {
		font-size: 1.0625rem;
	}

	.value-grid p {
		font-size: 0.9375rem;
		margin: 0;
	}

	/* registration ------------------------------------------------------- */

	.reg-split {
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
	}

	.reg-copy {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.seal {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		align-self: flex-start;
		padding: 0.7rem 1.1rem;
		border: 1px solid rgba(var(--brand-rgb), 0.4);
		border-radius: var(--radius-pill);
		background: var(--brand-soft);
		color: var(--brand);
		font-family: var(--font-display);
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.reg-table {
		display: grid;
		gap: 0;
		margin: 0;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.reg-table div {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
		gap: 1rem;
		padding: 1.125rem clamp(1.25rem, 2.5vw, 1.75rem);
		border-bottom: 1px solid var(--line);
		transition: background var(--dur) var(--ease-out);
	}

	.reg-table div:last-child {
		border-bottom: 0;
	}

	.reg-table div:hover {
		background: rgba(255, 255, 255, 0.025);
	}

	.reg-table dt {
		font-size: 0.875rem;
		color: var(--ink-subtle);
	}

	.reg-table dd {
		margin: 0;
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--ink);
	}

	/* leadership --------------------------------------------------------- */

	.team {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1.25rem, 3vw, 2rem);
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}

	.team li {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(1rem, 2vw, 1.5rem);
		padding: clamp(1.25rem, 2.2vw, 1.75rem);
		background: var(--bg-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		transition:
			border-color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	.team li:hover {
		border-color: var(--line-strong);
		transform: translateY(-4px);
	}

	.portrait {
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--bg-raised-2);
	}

	.portrait img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 360 / 420;
	}

	.who {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.4rem;
	}

	.who h3 {
		font-size: 1.25rem;
	}

	.role {
		font-family: var(--font-display);
		font-size: 0.875rem;
		color: var(--brand);
	}

	.who p {
		font-size: 0.9375rem;
		margin-top: 0.4rem;
	}

	@media (max-width: 900px) {
		.reg-split,
		.team {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.team li {
			grid-template-columns: 1fr;
		}
		.reg-table div {
			grid-template-columns: 1fr;
			gap: 0.25rem;
		}
	}
</style>
