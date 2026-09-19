<script lang="ts">
	import { reveal, splitText } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import { seo } from '$lib/seo';
	import { ui } from '@makutano/shared';
	import Seo from '$components/ui/Seo.svelte';
	import Icon from '$components/ui/Icon.svelte';
	import PageBanner from '$components/layout/PageBanner.svelte';
	import ServiceDomains from '$components/sections/ServiceDomains.svelte';

	let { data } = $props();

	const copy = {
		eyebrow: { en: 'Seven core service domains', sw: 'Nyanja saba za huduma' },
		title: { en: 'The right expertise. All in one place.', sw: 'Utaalamu unaohitaji. Mahali pamoja.' },
		lead: {
			en: "Makutano Digital's activities span seven core service domains, each aligned to industry-standard practice.",
			sw: 'Shughuli za Makutano Digital zinajumuisha nyanja saba za huduma, kila moja ikiendana na viwango vya kitaaluma.'
		},
		closingEyebrow: { en: 'Get started', sw: 'Anza' },
		closingTitle: {
			en: 'Not sure which service fits? Tell us the outcome you need.',
			sw: 'Hujui huduma ipi inafaa? Tueleze matokeo unayohitaji.'
		}
	};
</script>

<Seo title={seo.services.title} description={seo.services.description} />

<PageBanner eyebrow={t(copy.eyebrow)} title={t(copy.title)} lead={t(copy.lead)} />

<ServiceDomains services={data.services} variant="list" heading={false} />

<section class="section closing">
	<div class="container">
		<div class="panel" use:reveal={{ type: 'scale' }}>
			<span class="eyebrow">{t(copy.closingEyebrow)}</span>
			<h2 use:splitText={{ by: 'line', stagger: 80 }}>{t(copy.closingTitle)}</h2>
			<a class="btn" href="/contact">
				{t(ui.requestProposal)}
				<Icon name="arrow-up-right" size={16} class="btn-arrow" />
			</a>
		</div>
	</div>
</section>

<style>
	.closing {
		padding-top: 0;
	}

	.panel {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		text-align: center;
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

	.panel .btn {
		margin-top: 0.5rem;
	}
</style>
