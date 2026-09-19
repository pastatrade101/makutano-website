<script lang="ts">
	import { seo } from '$lib/seo';
	import Seo from '$components/ui/Seo.svelte';
	import { t } from '$lib/i18n.svelte';
	import Icon from '$components/ui/Icon.svelte';
	import Hero from '$components/sections/Hero.svelte';
	import Capabilities from '$components/sections/Capabilities.svelte';
	import ServiceDomains from '$components/sections/ServiceDomains.svelte';
	import WhoWeAre from '$components/sections/WhoWeAre.svelte';
	import Credibility from '$components/sections/Credibility.svelte';
	import MissionVision from '$components/sections/MissionVision.svelte';

	let { data } = $props();
</script>

<Seo title={seo.home.title} description={seo.home.description} />

<Hero site={data.site} />

<div class="partner-band">
 <div class="container partner-inner">
  <span>{t({en: 'Working alongside', sw: 'Tunashirikiana na'})}</span>
  <ul>{#each data.partners as partner}<li><a href="/partners">{partner.name}</a></li>{/each}</ul>
  <a class="partner-link" href="/partners">{t({en:'Meet our partners',sw:'Wafahamu washirika'})}<Icon name="arrow-up-right" size={16} /></a>
 </div>
</div>

<Capabilities capabilities={data.capabilities} />

<ServiceDomains services={data.services} variant="grid" />

<WhoWeAre variant="home" />

<Credibility items={data.credibility} limit={2} />

<MissionVision site={data.site} />

<style>
 .partner-band { background: var(--bg-raised); border-block: 1px solid var(--line); }
 .partner-inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding-block: 1.5rem; }
 .partner-inner > span { font-size: .75rem; color: var(--ink-subtle); }
 .partner-inner ul { display: flex; align-items: center; justify-content: center; gap: clamp(1.5rem, 5vw, 5rem); }
 .partner-inner li a { display: block; padding-block: .5rem; font: 500 clamp(1rem, 1.8vw, 1.35rem) var(--font-display); color: var(--ink-muted); }
 .partner-inner li a:hover { color: var(--ink); }
 .partner-link { display: inline-flex; gap: .5rem; align-items: center; min-height: 44px; font-size: .8rem; color: var(--brand); }
 @media (max-width: 800px) { .partner-inner { flex-wrap: wrap; gap: .5rem 1rem; } .partner-inner ul { width: 100%; order: 3; justify-content: space-between; gap: 1rem; } }
</style>
