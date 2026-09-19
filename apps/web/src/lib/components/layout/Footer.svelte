<script lang="ts">
	import { page } from '$app/state';
	import { reveal, splitText } from '$actions';
	import { t } from '$lib/i18n.svelte';
	import { nav, ui, type Service, type SiteSettings } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		site: SiteSettings;
		services: Service[];
	}

	let { site, services }: Props = $props();

	const year = new Date().getFullYear();
	const socials = $derived(site.socials.filter((social) => /^https?:\/\//.test(social.url)));
	const tel = $derived(site.phone.replace(/\s/g, ''));
</script>

<!-- Let's talk band ------------------------------------------------------- -->
{#if page.status === 200 && !['/contact', '/services', '/partners'].includes(page.url.pathname.replace(/\/$/, ''))}
<section class="cta-band">
	<div class="cta-bg" style="background-image: url('/images/backgrounds/cta.jpg')"></div>
	<div class="container cta-inner">
		<h2 use:splitText={{ by: 'line', stagger: 80 }}>{t(ui.footerHeading)}</h2>
		<p class="lead" use:reveal={{ type: 'up', delay: 160 }}>{t(site.statement)}</p>
		<div class="cta-actions" use:reveal={{ type: 'up', delay: 260 }}>
			<a class="btn" href="/contact">
				{t(ui.startProject)}
				<Icon name="arrow-up-right" size={16} class="btn-arrow" />
			</a>
			<a class="btn btn--ghost" href="mailto:{site.email}">
				<Icon name="mail" size={16} />
				{site.email}
			</a>
		</div>
	</div>
</section>
{/if}

<footer class="footer">
	<div class="container">
		<div class="top">
			<div class="about">
				<a href="/" class="brand" aria-label="{site.name} — home">
					<span class="mark" aria-hidden="true">M</span>
					<span class="word"><strong>Makutano</strong><em>Digital</em></span>
				</a>
				<p>{t(site.description)}</p>
				{#if socials.length}
				<ul class="socials">
					{#each socials as social (social.label)}
						<li>
							<a
								href={social.url}
								aria-label={social.label}
								target="_blank"
								rel="noopener noreferrer">
								<Icon name={social.icon} size={17} />
							</a>
						</li>
					{/each}
				</ul>
				{/if}
			</div>

			<nav class="col" aria-label={t(ui.quickLinks)}>
				<h3>{t(ui.quickLinks)}</h3>
				<ul>
					{#each nav as item (item.href)}
						<li><a href={item.href} class="link-underline">{t(item.label)}</a></li>
					{/each}
				</ul>
			</nav>

			<nav class="col" aria-label={t(ui.ourServices)}>
				<h3>{t(ui.ourServices)}</h3>
				<ul>
					{#each services as service (service.id)}
						<li>
							<a href="/services#{service.slug}" class="link-underline">{t(service.title)}</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="col contact-col">
				<h3>{t(ui.contact)}</h3>
				<ul class="contact-list">
					<li>
						<Icon name="pin" size={16} />
						<span>{t(site.address)}</span>
					</li>
					<li>
						<Icon name="phone" size={16} />
						<a href="tel:{tel}" class="link-underline">{site.phone}</a>
					</li>
					<li>
						<Icon name="mail" size={16} />
						<a href="mailto:{site.email}" class="link-underline">{site.email}</a>
					</li>
					<li>
						<Icon name="globe" size={16} />
						<a href="https://{site.website}" class="link-underline">{site.website}</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="bottom">
			<p>© {year} {site.legalName}</p>
			<p>{t(site.developedBy)}</p>
		</div>
	</div>
</footer>

<style>
	/* CTA ---------------------------------------------------------------- */

	.cta-band {
		position: relative;
		padding-block: clamp(4rem, 8vw, 6.5rem);
		overflow: hidden;
		isolation: isolate;
	}

	.cta-bg {
		position: absolute;
		inset: 0;
		z-index: -2;
		background-size: cover;
		background-position: center;
		transform: scale(1.05);
	}

	.cta-band::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			120deg,
			rgba(var(--bg-rgb), 0.94) 20%,
			rgba(var(--bg-rgb), 0.78) 60%,
			rgba(var(--brand-rgb), 0.35)
		);
	}

	.cta-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		text-align: center;
		max-width: 52rem;
	}

	.cta-inner h2 {
		font-size: var(--fs-display);
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.875rem;
		margin-top: 0.75rem;
	}

	/* Footer ------------------------------------------------------------- */

	.footer {
		background: var(--bg-raised);
		border-top: 1px solid var(--line);
		padding-top: clamp(3.5rem, 6vw, 5rem);
	}

	.top {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, .7fr) minmax(0, 1.1fr) minmax(0, 1fr);
		gap: clamp(2rem, 4vw, 3.5rem);
		padding-bottom: 3.5rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin-bottom: 1.25rem;
	}

	.mark {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 11px;
		background: var(--brand);
		color: var(--on-brand);
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.25rem;
	}

	.word {
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
		line-height: 1.05;
	}

	.word strong {
		font-size: 1.0625rem;
		font-weight: 600;
	}

	.word em {
		font-style: normal;
		font-size: 0.6875rem;
		letter-spacing: 0.26em;
		text-transform: uppercase;
		color: var(--brand);
	}

	.about p {
		font-size: 0.9375rem;
		max-width: 36ch;
	}

	.socials {
		display: flex;
		gap: 0.6rem;
		margin-top: 1.5rem;
	}

	.socials a {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border: 1px solid var(--line);
		border-radius: 50%;
		color: var(--ink-muted);
		transition:
			background var(--dur) var(--ease-out),
			border-color var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	.socials a:hover {
		background: var(--brand);
		border-color: var(--brand);
		color: var(--on-brand);
		transform: translateY(-3px);
	}

	.col h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 1.25rem;
	}

	.col ul {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		font-size: 0.9375rem;
		color: var(--ink-muted);
	}

	.contact-list a { overflow-wrap: anywhere; }

	.contact-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
	}

	.contact-list :global(svg) {
		color: var(--brand);
		margin-top: 0.25rem;
		flex: none;
	}

	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding-block: 1.5rem;
		border-top: 1px solid var(--line);
		font-size: 0.875rem;
	}

	.bottom p {
		color: var(--ink-subtle);
		margin: 0;
	}

	@media (max-width: 1000px) {
		.top {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 620px) {
		.top {
			grid-template-columns: 1fr;
		}
		.bottom {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
