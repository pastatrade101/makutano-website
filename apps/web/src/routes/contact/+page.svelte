<script lang="ts">
	import { reveal } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import { seo } from '$lib/seo';
	import Seo from '$components/ui/Seo.svelte';
	import Icon from '$components/ui/Icon.svelte';
	import SectionHeading from '$components/ui/SectionHeading.svelte';
	import PageBanner from '$components/layout/PageBanner.svelte';
	import ContactForm from '$components/sections/ContactForm.svelte';

	let { data } = $props();

	const copy = {
		bannerEyebrow: { en: 'Get in touch', sw: 'Wasiliana nasi' },
		bannerTitle: {
			en: 'Let’s build something meaningful.',
			sw: 'Tujenge kitu chenye maana.'
		},
		bannerLead: {
			en: 'Reach out to discuss how our team can support your goals.',
			sw: 'Wasiliana nasi kujadili namna timu yetu inaweza kusaidia malengo yako.'
		},
		eyebrow: { en: 'Contact us', sw: 'Wasiliana nasi' },
		title: {
			en: 'Always happy to hear from you',
			sw: 'Tunafurahi kila mara kusikia kutoka kwako'
		},
		office: { en: 'Office location', sw: 'Mahali pa ofisi' },
		phone: { en: 'Phone', sw: 'Simu' },
		email: { en: 'Email', sw: 'Barua pepe' },
		web: { en: 'Website', sw: 'Tovuti' }
	};

	const tel = $derived(data.site.phone.replace(/\s/g, ''));

	const details = $derived([
		{ icon: 'pin', label: t(copy.office), value: t(data.site.address), href: null },
		{ icon: 'phone', label: t(copy.phone), value: data.site.phone, href: `tel:${tel}` },
		{
			icon: 'mail',
			label: t(copy.email),
			value: data.site.email,
			href: `mailto:${data.site.email}`
		},
		{
			icon: 'globe',
			label: t(copy.web),
			value: data.site.website,
			href: `https://${data.site.website}`
		}
	]);
</script>

<Seo title={seo.contact.title} description={seo.contact.description} />

<PageBanner
	eyebrow={t(copy.bannerEyebrow)}
	title={t(copy.bannerTitle)}
	lead={t(copy.bannerLead)} />

<section class="section contact">
	<div class="container">
		<div class="split">
			<div class="form-col" use:reveal={{ type: 'right', delay: 120 }}>
				<ContactForm services={data.services} preselect={data.preselect} email={data.site.email} />
			</div>
			<div class="details">
				<SectionHeading eyebrow={t(copy.eyebrow)} title={t(copy.title)} />

				<ul use:reveal={{ stagger: 100, childSelector: 'li' }}>
					{#each details as item (item.label)}
						<li>
							<span class="ico"><Icon name={item.icon} size={19} /></span>
							<div>
								<span class="label">{item.label}</span>
								{#if item.href}
									<a href={item.href} class="link-underline">{item.value}</a>
								{:else}
									<span class="value">{item.value}</span>
								{/if}
							</div>
						</li>
					{/each}
				</ul>

				<div class="map" use:reveal={{ type: 'scale', delay: 200 }}>
					<iframe
						src={data.site.mapUrl}
						title="Makutano Digital — Makole, Dodoma"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"></iframe>
					<a class="map-link" href="https://www.google.com/maps/search/?api=1&query=Makole%2C%20Dodoma%2C%20Tanzania" target="_blank" rel="noopener noreferrer">{t({en:'Open in Google Maps',sw:'Fungua kwenye Google Maps'})}<Icon name="arrow-up-right" size={16} /><span class="visually-hidden">{t({en:'(opens in a new tab)',sw:'(kichupo kipya)'})}</span></a>
				</div>
			</div>

		</div>
	</div>
</section>

<style>
	.split {
		display: grid;
		grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: start;
	}

	.form-col { grid-column: 2; grid-row: 1; }
	.details {
		grid-column: 1; grid-row: 1;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.details ul {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.details li {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.details li > div {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.ico {
		flex: none;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 13px;
		background: var(--brand-soft);
		color: var(--brand);
		transition:
			background var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	.details li:hover .ico {
		background: var(--brand);
		color: var(--on-brand);
		transform: rotate(-6deg);
	}

	.label {
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-subtle);
	}

	.value,
	.details a {
		font-family: var(--font-display);
		font-size: 0.9375rem;
		color: var(--ink);
		word-break: break-word;
	}

	.map {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--bg-raised);
	}

	.map-link { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; font-size: .85rem; color: var(--brand); border-top: 1px solid var(--line); }

	.map iframe {
		display: block;
		width: 100%;
		height: clamp(15rem, 30vw, 20rem);
		border: 0;
		/* Tones the light map down to sit inside the dark palette. */
		filter: grayscale(0.9) invert(0.92) contrast(0.86) hue-rotate(180deg);
	}

	@media (max-width: 900px) {
		.form-col, .details { grid-column: auto; grid-row: auto; }
		.split {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.details ul {
			grid-template-columns: 1fr;
		}
	}
</style>
