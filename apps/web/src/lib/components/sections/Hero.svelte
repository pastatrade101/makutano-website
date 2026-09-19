<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { media, prose, ui, type SiteSettings } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';
	let { site }: { site: SiteSettings } = $props();
	const headline = $derived(t(site.tagline));
	const stop = $derived(headline.indexOf('.'));
	const accent = $derived(stop >= 0 ? headline.slice(0, stop + 1) : headline);
	const rest = $derived(stop >= 0 ? headline.slice(stop + 1).trim() : '');
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="container">
		<div class="hero-grid">
			<div class="copy">
				<span class="eyebrow">{t({en:'Built in Tanzania. Built for you.',sw:'Kutoka Tanzania. Kwa ajili yako.'})}</span>
				<h1 id="hero-title"><span>{accent}</span> {rest}</h1>
				<p class="lead">{t(prose.heroLead)}</p>
				<div class="actions">
					<a class="btn" href="/contact">{t(ui.startProject)}<Icon name="arrow-up-right" size={18} /></a>
					<a class="btn btn--ghost" href="/services">{t(ui.ourServices)}<Icon name="arrow-right" size={18} /></a>
				</div>
				<div class="location"><span class="dot"></span>{t({en:'Based in Dodoma · Serving Tanzania',sw:'Tupo Dodoma · Tunahudumia Tanzania'})}</div>
			</div>
			<figure class="portrait">
				<img src={media.heroPortrait.src} alt={media.heroPortrait.alt} width={media.heroPortrait.width} height={media.heroPortrait.height} fetchpriority="high" />
				<figcaption><span class="badge-icon"><Icon name="layers" size={24} /></span><span><strong>{t({en:'Ideas meet possibility.',sw:'Mawazo yanakutana na fursa.'})}</strong><small>{t({en:'Your next chapter starts here.',sw:'Hatua yako inayofuata inaanzia hapa.'})}</small></span><Icon name="arrow-up-right" size={22} /></figcaption>
			</figure>
		</div>
		<div class="facts">
			<div><strong>07</strong><span>{t({en:'Connected service domains',sw:'Nyanja za huduma zilizounganishwa'})}</span></div>
			<div><Icon name="check-badge" size={25} /><span>{t({en:'Licensed ICT services provider',sw:'Mtoa huduma za TEHAMA aliyesajiliwa'})}</span></div>
			<a href="/about"><span>{t({en:'Local insight. A wider perspective.',sw:'Uelewa wa ndani. Mtazamo mpana.'})}</span><Icon name="arrow-up-right" size={20} /></a>
		</div>
	</div>
</section>

<style>
	.hero { position: relative; isolation: isolate; overflow: hidden; padding: calc(var(--header-h) + clamp(2.5rem, 5vw, 4rem)) 0 0; background: radial-gradient(ellipse at 85% 20%, rgba(var(--brand-rgb), .09), transparent 48%), var(--bg); }
	.hero::before { content: ''; position: absolute; inset: 0; z-index: -1; background: url('/images/backgrounds/hero.jpg') center / cover; opacity: .16; }
	.hero-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, .85fr); align-items: center; gap: clamp(2.5rem, 6vw, 6rem); padding-bottom: clamp(2.5rem, 5vw, 4rem); }
	.copy { display: flex; flex-direction: column; align-items: flex-start; gap: 1.6rem; animation: enter 600ms var(--ease-out) both; }
	h1 { font-size: clamp(2.8rem, 6.3vw, 5.75rem); max-width: 13ch; line-height: 1.06; letter-spacing: -.045em; }
	h1 span { display: block; color: var(--brand-ink); }
	.lead { max-width: 44ch; font-size: clamp(1rem, 1.4vw, 1.15rem); line-height: 1.75; }
	.actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: .25rem; }
	.location { display: flex; align-items: center; gap: .6rem; color: var(--ink-muted); font-size: .8rem; }
	.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand); flex: none; }
	.portrait { position: relative; border-radius: 28px; overflow: hidden; border: 1px solid var(--line-strong); animation: enter 700ms var(--ease-out) 100ms both; background: var(--bg-raised); }
	.portrait img { width: 100%; height: auto; aspect-ratio: 4 / 4.6; object-fit: cover; }
	figcaption { position: absolute; inset: auto 1rem 1rem; padding: 1rem; display: flex; align-items: center; gap: .75rem; border: 1px solid var(--line-strong); border-radius: 16px; background: rgba(var(--bg-rgb),.94); backdrop-filter: blur(16px); }
	figcaption strong, figcaption small { display: block; }
	figcaption strong { font: 500 1rem var(--font-display); }
	figcaption small { font-size: .75rem; color: var(--ink-muted); margin-top: .2rem; }
	figcaption > :global(svg) { margin-left: auto; color: var(--brand-ink); flex: none; }
	.badge-icon { display: grid; place-items: center; width: 44px; height: 44px; background: var(--brand); color: var(--on-brand); border-radius: 12px; flex: none; }
	.facts { display: grid; grid-template-columns: 1fr 1fr 1.2fr; border-top: 1px solid var(--line); padding-block: 1.5rem; gap: 1.5rem; }
	.facts > * { display: flex; align-items: center; gap: .9rem; }
	.facts > * + * { border-left: 1px solid var(--line); padding-left: 1.5rem; }
	.facts strong { font: 500 2rem var(--font-display); color: var(--brand-ink); }
	.facts span { font-size: .85rem; color: var(--ink-muted); max-width: 25ch; }
	.facts :global(svg) { color: var(--brand-ink); flex: none; }
	.facts a { justify-content: space-between; }
	.facts a:hover span { color: var(--ink); }
	@keyframes enter { from { opacity: 0; transform: translateY(18px); } }
	@media (max-width: 900px) { .hero-grid { gap: 2rem; grid-template-columns: 1.15fr 1fr; } h1 { font-size: clamp(2.6rem, 6vw, 4rem); } figcaption { inset: auto .65rem .65rem; padding: .75rem; } .badge-icon { display: none; } }
	@media (max-width: 680px) { .hero-grid { grid-template-columns: 1fr; gap: 2rem; } h1 { max-width: 14ch; font-size: clamp(2.7rem, 10vw, 4rem); } .copy { gap: 1.25rem; } .portrait img { aspect-ratio: 5 / 4; object-position: center 30%; } .badge-icon { display: grid; } .facts { grid-template-columns: 1fr 1fr; gap: 1rem; } .facts > * + * { padding-left: 1rem; } .facts > a { grid-column: 1 / -1; border-left: 0; border-top: 1px solid var(--line); padding: 1rem 0 0; } .facts span { font-size: .78rem; } }
</style>
