<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { seo } from '$lib/seo';
	import { serviceDetails, deliverySteps } from '$lib/service-details';
	import Seo from '$components/ui/Seo.svelte';
	import Icon from '$components/ui/Icon.svelte';
	import ServiceArtwork from '$components/sections/ServiceArtwork.svelte';

	let { data } = $props();
	const featured = $derived(data.services.find((service) => service.slug === 'digital-advertising'));
	const otherServices = $derived(data.services.filter((service) => service.slug !== featured?.slug));
	const enquiry = (title: string) => `/contact?service=${encodeURIComponent(title)}`;
</script>

<Seo title={seo.services.title} description={seo.services.description} />

<section class="services-hero" aria-labelledby="services-title">
	<div class="container hero-layout">
		<div class="hero-copy">
			<nav class="breadcrumbs" aria-label={t({ en: 'Breadcrumb', sw: 'Njia ya ukurasa' })}><a href="/">{t({ en: 'Home', sw: 'Nyumbani' })}</a><span>/</span><span>{t({ en: 'Our services', sw: 'Huduma zetu' })}</span></nav>
			<span class="eyebrow">{t({ en: 'Expertise that connects', sw: 'Utaalamu unaounganisha' })}</span>
			<h1 id="services-title">{t({ en: 'Your next move.', sw: 'Hatua yako ijayo.' })}<br /><span>{t({ en: 'Made possible.', sw: 'Inawezekana.' })}</span></h1>
			<p class="lead">{t({ en: 'Build a product. Grow a brand. Find a clearer direction. We bring the right expertise together to move your ideas forward.', sw: 'Jenga bidhaa. Kuza chapa. Pata mwelekeo ulio wazi. Tunaunganisha utaalamu unaofaa kuyasogeza mawazo yako mbele.' })}</p>
			<div class="hero-actions"><a href="#expertise" class="btn">{t({ en: 'Explore our expertise', sw: 'Gundua utaalamu wetu' })}<Icon name="arrow-down" size={17} /></a><a href="/contact" class="text-link">{t({ en: 'Tell us your idea', sw: 'Tuambie wazo lako' })}<Icon name="arrow-up-right" size={17} /></a></div>
			<div class="hero-footnote"><span></span>{t({ en: 'Based in Dodoma. Building for Tanzania.', sw: 'Tupo Dodoma. Tunajenga kwa Tanzania.' })}</div>
		</div>
		<div class="hero-studio" aria-label={t({ en: 'An illustration of strategy, design, and digital delivery working together', sw: 'Kielelezo cha mkakati, ubunifu, na utekelezaji wa kidijitali kwa pamoja' })}>
			<div class="studio-top"><span><span></span>MAKUTANO / {t({ en: 'THE DIGITAL STUDIO', sw: 'STUDIO YA KIDIJITALI' })}</span><Icon name="spark" size={24} /></div>
			<div class="studio-art"><ServiceArtwork kind="software-development" /><span class="studio-label">{t({ en: 'Ideas → Real-world solutions', sw: 'Mawazo → Suluhisho halisi' })}</span></div>
			<div class="studio-path">{#each [{ en: 'Strategy', sw: 'Mkakati' }, { en: 'Design', sw: 'Ubunifu' }, { en: 'Delivery', sw: 'Utekelezaji' }] as step, i}<div><span>0{i + 1}</span><strong>{t(step)}</strong>{#if i < 2}<Icon name="arrow-right" size={16} />{:else}<Icon name="check" size={16} />{/if}</div>{/each}</div>
			<div class="studio-caption"><strong>{String(data.services.length).padStart(2, '0')}</strong><span>{t({ en: 'Connected disciplines.', sw: 'Nyanja zilizounganishwa.' })}<br />{t({ en: 'One digital partner.', sw: 'Mshirika mmoja wa kidijitali.' })}</span><span class="studio-mark">M<span>✦</span></span></div>
		</div>
	</div>
</section>

<section class="section catalogue" id="expertise" aria-labelledby="expertise-title">
	<div class="container">
		<div class="section-heading"><div><span class="eyebrow">{t({ en: 'What we can do together', sw: 'Tunachoweza kufanya pamoja' })}</span><h2 id="expertise-title">{t({ en: 'Different needs.', sw: 'Mahitaji tofauti.' })}<br />{t({ en: 'The right expertise.', sw: 'Utaalamu unaofaa.' })}</h2></div><p>{t({ en: 'Explore our service areas, find your starting point, and let’s shape the right scope for your organisation.', sw: 'Gundua huduma zetu, chagua pa kuanzia, kisha tupange wigo unaofaa taasisi yako.' })}</p></div>
		<nav class="service-index" aria-label={t({ en: 'Jump to a service', sw: 'Nenda kwenye huduma' })}>{#each data.services as service}<a href={`#${service.slug}`}><span>{service.number}</span>{t(service.title)}<Icon name="arrow-down" size={12} /></a>{/each}</nav>

		{#if featured}
			{@const detail = serviceDetails[featured.slug]}
			<article id={featured.slug} class="featured-service" aria-labelledby="featured-title">
				<div class="featured-copy"><div class="featured-label"><Icon name={featured.icon} size={18} /><span>{t({ en: 'Our primary business', sw: 'Shughuli yetu kuu' })}</span><span>{featured.number}</span></div><p class="service-name">{t(featured.title)}</p><h3 id="featured-title">{t(detail.outcome)}</h3><p>{t(detail.lead)}</p><ul>{#each detail.scope as item}<li><Icon name="check" size={16} />{t(item)}</li>{/each}</ul><a class="btn" href={enquiry(featured.title.en)}>{t({ en: 'Let’s grow your brand', sw: 'Tukuze chapa yako' })}<Icon name="arrow-up-right" size={18} /></a></div>
				<div class="featured-visual"><ServiceArtwork kind={featured.slug} /><span class="art-caption">{t({ en: 'A clear message. A stronger connection.', sw: 'Ujumbe ulio wazi. Muunganiko imara.' })}</span></div>
			</article>
		{/if}

		<div class="service-grid">{#each otherServices as service (service.id)}
			{@const detail = serviceDetails[service.slug]}
			<article class="service-card" id={service.slug} aria-labelledby={`title-${service.slug}`}>
				<div class="card-art"><ServiceArtwork kind={service.slug} /><span class="card-number">{service.number} / {t({ en: 'EXPERTISE', sw: 'UTAALAMU' })}</span></div>
				<div class="card-body"><div class="card-category"><Icon name={service.icon} size={17} /><h3 id={`title-${service.slug}`}>{t(service.title)}</h3></div><h4>{t(detail?.outcome ?? service.title)}</h4><p>{t(detail?.lead ?? service.description)}</p>
					{#if detail}<details><summary>{t({ en: 'Explore the scope', sw: 'Gundua wigo wa huduma' })}<span class="detail-plus"><Icon name="plus" size={16} /></span><span class="detail-minus"><Icon name="minus" size={16} /></span></summary><ul>{#each detail.scope as item}<li><Icon name="check" size={15} />{t(item)}</li>{/each}</ul></details>{/if}
					<a class="service-cta" href={enquiry(service.title.en)} aria-label={`${t({ en: 'Discuss a project', sw: 'Jadili mradi' })}: ${t(service.title)}`}><span>{t({ en: 'Discuss a project', sw: 'Jadili mradi' })}</span><span class="cta-icon"><Icon name="arrow-up-right" size={20} /></span></a>
				</div>
			</article>
		{/each}</div>
	</div>
</section>

<section class="section proof-section" aria-labelledby="proof-title"><div class="container proof-layout"><div class="proof-copy"><span class="eyebrow">{t({ en: 'From expertise to experience', sw: 'Kutoka utaalamu hadi utekelezaji' })}</span><h2 id="proof-title">{t({ en: 'We build it.', sw: 'Tunajenga.' })}<br />{t({ en: 'We put it to work.', sw: 'Tunatumia.' })}</h2><p>{t({ en: 'Our own products bring this expertise into the real world, supporting learning and connecting cooperative members to their finances.', sw: 'Bidhaa zetu huleta utaalamu huu katika maisha halisi, zikisaidia kujifunza na kuunganisha wanachama wa vyama vya ushirika na fedha zao.' })}</p><a href="/partners" class="text-link">{t({ en: 'See our products & partners', sw: 'Ona bidhaa na washirika wetu' })}<Icon name="arrow-up-right" size={17} /></a></div><div class="proof-cards"><a class="proof-card" href="/partners#smartclass"><span class="proof-icon"><img src="/images/products/smartclass-logo.webp" alt="" width="40" height="40" /></span><div><small>{t({ en: 'OUR PRODUCT / EDUCATION', sw: 'BIDHAA YETU / ELIMU' })}</small><h3>SmartClass</h3><p>{t({ en: 'AI tutoring, adaptive practice, and parent insights in one learning platform.', sw: 'Mafunzo ya AI, mazoezi, na taarifa kwa wazazi katika mfumo mmoja wa elimu.' })}</p></div><Icon name="arrow-up-right" size={23} /></a><a class="proof-card" href="/partners#saccos"><span class="proof-icon"><Icon name="building" size={30} /></span><div><small>{t({ en: 'OUR PLATFORM / FINANCE', sw: 'MFUMO WETU / FEDHA' })}</small><h3>{t({ en: 'SACCOS platform', sw: 'Mfumo wa SACCOS' })}</h3><p>{t({ en: 'Built and owned by Makutano. In use at Ilboru Alumni Saccos, our client and partner.', sw: 'Umejengwa na unamilikiwa na Makutano. Unatumika Ilboru Alumni Saccos, mteja na mshirika wetu.' })}</p></div><Icon name="arrow-up-right" size={23} /></a></div></div></section>

<section class="section process-section" aria-labelledby="process-title"><div class="container"><div class="section-heading"><div><span class="eyebrow">{t({ en: 'A shared way forward', sw: 'Njia ya pamoja ya kusonga mbele' })}</span><h2 id="process-title">{t({ en: 'From the first conversation', sw: 'Kutoka mazungumzo ya kwanza' })}<br />{t({ en: 'to the next chapter.', sw: 'hadi hatua inayofuata.' })}</h2></div><p>{t({ en: 'Every engagement starts with understanding what you need. The approach follows the problem, not the other way around.', sw: 'Kila ushirikiano huanza kwa kuelewa mahitaji yako. Namna ya kufanya kazi hutegemea changamoto inayotatuliwa.' })}</p></div><ol class="process-grid">{#each deliverySteps as step, i}<li><div class="step-top"><span>0{i + 1}</span><Icon name={step.icon} size={26} /></div><h3>{t(step.title)}</h3><p>{t(step.text)}</p></li>{/each}</ol></div></section>

<section class="section closing"><div class="container"><div class="closing-panel"><div class="closing-symbol" aria-hidden="true"><span></span><Icon name="spark" size={90} stroke={1} /></div><div><span class="eyebrow">{t({ en: 'Let’s find your starting point', sw: 'Tutafute pa kuanzia' })}</span><h2>{t({ en: 'Tell us what you want', sw: 'Tuambie unachotaka' })}<br />{t({ en: 'to make possible.', sw: 'kufanikisha.' })}</h2><p>{t({ en: 'You don’t need a finished brief. Bring your idea, your challenge, or the outcome you have in mind.', sw: 'Huhitaji mpango uliokamilika. Leta wazo, changamoto, au matokeo unayotamani.' })}</p><a href="/contact" class="btn">{t({ en: 'Start a conversation', sw: 'Anza mazungumzo' })}<Icon name="arrow-up-right" size={18} /></a></div></div></div></section>

<style>
	.services-hero { padding: calc(var(--header-h) + 2.5rem) 0 4.5rem; background: radial-gradient(ellipse at 95% 0%, var(--brand-soft), transparent 65%); overflow: hidden; }
	.hero-layout { display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: clamp(2rem, 5vw, 4.5rem); }
	.breadcrumbs { display: flex; align-items: center; gap: .8rem; font-size: .75rem; color: var(--ink-subtle); margin-bottom: 2.1rem; }
	.breadcrumbs a:hover { color: var(--brand-ink); }
	.hero-copy > .eyebrow { margin-bottom: 1.5rem; }
	h1 { font-size: clamp(2.8rem, 5.5vw, 5rem); line-height: 1.09; letter-spacing: -.045em; }
	h1 > span { color: var(--brand-ink); }
	.hero-copy .lead { max-width: 44ch; margin-top: 1.5rem; font-size: 1.05rem; }
	.hero-actions { display: flex; gap: 1rem 1.5rem; align-items: center; flex-wrap: wrap; margin-top: 2rem; }
	.text-link { display: inline-flex; align-items: center; gap: .6rem; min-height: 44px; font-size: .86rem; font-weight: 500; color: var(--brand-ink); }
	.text-link:hover { text-decoration: underline; text-underline-offset: 5px; }
	.hero-footnote { display: flex; align-items: center; gap: .55rem; color: var(--ink-subtle); font-size: .7rem; margin-top: 2rem; }
	.hero-footnote > span { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }
	.hero-studio { border: 1px solid #415467; border-radius: 22px; background: #142a40; color: #fff; overflow: hidden; transform: rotate(2deg); box-shadow: var(--shadow); }
	.studio-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.3rem 1.5rem; border-bottom: 1px solid #ffffff22; color: #ffbd58; }
	.studio-top > span { display: flex; align-items: center; gap: .5rem; font-size: .52rem; letter-spacing: .12em; color: #c0d0de; }
	.studio-top > span > span { width: 5px; height: 5px; background: #ffbd58; border-radius: 50%; }
	.studio-art { position: relative; padding: .5rem 0 2rem; }
	.studio-label { display: block; text-align: center; font-size: .65rem; color: #c0d0de; letter-spacing: .05em; }
	.studio-path { display: grid; grid-template-columns: repeat(3, 1fr); padding: 0 1.5rem; }
	.studio-path > div { display: flex; align-items: center; gap: .45rem; padding: 1rem .7rem; border: 1px solid #ffffff22; background: #ffffff05; }
	.studio-path > div + div { border-left: 0; }.studio-path > div:first-child { border-radius: 9px 0 0 9px; }.studio-path > div:last-child { border-radius: 0 9px 9px 0; }
	.studio-path strong { font-size: .65rem; color: #fff; font-weight: 500; }.studio-path > div > span { color: #b7c9d9; font-size: .5rem; }.studio-path :global(svg) { color: #ffbd58; margin-left: auto; }
	.studio-caption { display: flex; align-items: center; gap: 1rem; padding: 1.4rem 1.5rem; }
	.studio-caption > strong { font: 400 2.8rem/1 var(--font-display); color: #ffbd58; }.studio-caption > span { font-size: .65rem; line-height: 1.6; color: #b7c9d9; }.studio-caption .studio-mark { position: relative; margin-left: auto; font: 500 2.2rem var(--font-display); color: #ffbd58; }.studio-mark > span { position: absolute; font-size: .9rem; right: -.5rem; top: -.1rem; }
	.catalogue { border-top: 1px solid var(--line); }
	.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; margin-bottom: 2.2rem; }
	.section-heading h2 { margin-top: 1rem; font-size: clamp(1.9rem, 3.3vw, 2.8rem); }
	.section-heading > p { max-width: 40ch; font-size: .94rem; }
	.service-index { display: flex; flex-wrap: wrap; gap: .55rem; margin-bottom: 2.5rem; }
	.service-index a { display: flex; align-items: center; gap: .55rem; min-height: 44px; padding: .65rem .9rem; border: 1px solid var(--line); background: var(--bg-raised); border-radius: 30px; font-size: .73rem; color: var(--ink-muted); }
	.service-index a > span { color: var(--brand-ink); font-size: .6rem; }
	.service-index a:hover { color: var(--ink); border-color: var(--brand-ink); }
	article[id] { scroll-margin-top: calc(var(--header-h) + 1.5rem); }
	.featured-service { display: grid; grid-template-columns: 1.1fr 1fr; border: 1px solid #40516a; border-radius: 26px; background: #102237; overflow: hidden; color: #fff; margin-bottom: 1.5rem; --ink: #fff; --bg: #102237; }
	.featured-copy { padding: clamp(1.7rem, 4vw, 3.5rem); }
	.featured-label { display: flex; align-items: center; gap: .6rem; color: #ffbd58; font-size: .62rem; letter-spacing: .13em; text-transform: uppercase; }
	.featured-label > span:last-child { margin-left: auto; color: #a9bdd0; }
	.featured-copy .service-name { color: #becddb; font-size: .8rem; margin: 2rem 0 .6rem; }
	.featured-copy h3 { color: #fff; font-size: clamp(2rem, 3.5vw, 3.2rem); max-width: 16ch; line-height: 1.08; }
	.featured-copy > p:not(.service-name) { color: #b8c9d9; font-size: .92rem; margin-top: 1.25rem; }
	.featured-copy ul { margin: 1.5rem 0 2rem; }
	.featured-copy li { display: flex; align-items: center; gap: .65rem; color: #d6e0e9; font-size: .78rem; padding-block: .3rem; }
	.featured-copy li :global(svg) { color: #ffbd58; flex: none; }
	.featured-visual { min-width: 0; position: relative; border-left: 1px solid #ffffff15; }
	.art-caption { position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem; text-align: center; font-size: .65rem; color: #b9cad8; }
	.service-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; align-items: start; }
	.service-card { border: 1px solid var(--line); border-radius: 23px; overflow: hidden; background: var(--bg-raised); }
	.card-art { position: relative; }.card-number { position: absolute; top: 1rem; left: 1.5rem; font-size: .5rem; letter-spacing: .13em; color: #b8c9d9; }
	.card-body { padding: clamp(1.5rem, 3vw, 2.3rem); }
	.card-category { display: flex; align-items: center; gap: .55rem; color: var(--brand-ink); margin-bottom: 1rem; }.card-category h3 { font-family: var(--font-body); font-size: .67rem; line-height: 1.5; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: var(--brand-ink); }
	.card-body h4 { font-size: clamp(1.4rem, 2.3vw, 1.95rem); line-height: 1.2; margin-bottom: 1rem; letter-spacing: -.025em; }.card-body > p { font-size: .87rem; line-height: 1.85; min-height: 5.6em; }
	details { margin-top: 1.4rem; border-block: 1px solid var(--line); }
	summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-block: .9rem; min-height: 48px; font-size: .78rem; cursor: pointer; color: var(--ink); }
	summary::-webkit-details-marker { display: none; }.detail-minus { display: none; }details[open] .detail-plus { display: none; }details[open] .detail-minus { display: inline; }
	details ul { padding-bottom: 1rem; display: grid; gap: .6rem; }details li { display: flex; align-items: flex-start; gap: .5rem; color: var(--ink-muted); font-size: .8rem; }details li :global(svg) { flex: none; color: var(--brand-ink); margin-top: .25rem; }
	.service-cta { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 44px; margin-top: 1.1rem; font-size: .8rem; font-weight: 500; }.cta-icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--accent); color: var(--on-brand); }.service-cta:hover > span:first-child { text-decoration: underline; text-underline-offset: 5px; }
	.proof-section { background: var(--bg-raised); border-block: 1px solid var(--line); }
	.proof-layout { display: grid; grid-template-columns: .85fr 1.15fr; gap: clamp(2rem, 6vw, 5rem); align-items: center; }.proof-copy h2 { margin: 1rem 0; }.proof-copy p { font-size: .94rem; max-width: 43ch; }.proof-copy .text-link { margin-top: 1.5rem; }
	.proof-cards { display: grid; gap: 1rem; }.proof-card { display: flex; align-items: flex-start; gap: 1.2rem; padding: 1.7rem; border: 1px solid var(--line); border-radius: 20px; background: var(--bg); }.proof-card:hover { border-color: var(--brand-ink); }.proof-card > :global(svg) { flex: none; color: var(--brand-ink); }.proof-card small { color: var(--ink-subtle); font-size: .56rem; letter-spacing: .1em; }.proof-card h3 { font-size: 1.55rem; margin-block: .4rem .6rem; }.proof-card p { font-size: .8rem; }.proof-icon { display: grid; place-items: center; flex: none; background: var(--brand-soft); color: var(--brand-ink); width: 52px; height: 52px; border-radius: 13px; }.proof-icon img { border-radius: 8px; }
	.process-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 1.5rem; margin-top: 3rem; }.process-grid li { border-top: 1px solid var(--line-strong); padding-top: 1.2rem; }.step-top { display: flex; justify-content: space-between; align-items: center; color: var(--brand-ink); margin-bottom: 1.6rem; }.step-top > span { font: 400 2.4rem var(--font-display); }.process-grid h3 { font-size: 1.2rem; margin-bottom: .7rem; }.process-grid p { font-size: .84rem; }
	.closing { padding-top: 0; }.closing-panel { display: grid; grid-template-columns: .6fr 1fr; align-items: center; gap: 2rem; padding: clamp(2rem, 5vw, 4.5rem); border: 1px solid var(--line); border-radius: 26px; background: radial-gradient(ellipse at 0 50%, var(--brand-soft), transparent 65%), var(--bg-raised); overflow: hidden; }.closing-symbol { display: grid; place-items: center; height: 220px; position: relative; color: var(--brand-ink); }.closing-symbol > span { position: absolute; width: 205px; height: 205px; border-radius: 50%; border: 1px solid var(--line-strong); box-shadow: 0 0 0 25px var(--brand-soft); }.closing-panel h2 { margin: 1rem 0; }.closing-panel p { font-size: .95rem; max-width: 45ch; }.closing-panel .btn { margin-top: 1.5rem; }
	@media(max-width:1000px) { .hero-layout { gap: 2rem; }.studio-path { padding-inline: 1rem; }.studio-path > div { padding-inline: .45rem; gap: .3rem; }.studio-path strong { font-size: .57rem; }.studio-top { padding: 1rem; }.section-heading > p { max-width: 34ch; }.proof-layout { gap: 2rem; }.proof-card { gap: .8rem; padding: 1.5rem; } }
	@media(max-width:760px) { .hero-layout { grid-template-columns: 1fr; gap: 3rem; }.hero-studio { max-width: 560px; width: 100%; margin: 0 auto; transform: none; }.hero-copy .lead { max-width: 52ch; }.studio-path strong { font-size: .7rem; }h1 { font-size: clamp(2.8rem, 8vw, 4rem); }.services-hero { padding-bottom: 3rem; }.section-heading { flex-direction: column; align-items: flex-start; gap: 1rem; }.section-heading > p { max-width: 52ch; }.featured-service { grid-template-columns: 1fr; }.featured-visual { min-height: 350px; border-left: 0; border-top: 1px solid #ffffff15; }.featured-copy h3 { max-width: none; }.service-grid { gap: 1rem; }.card-body { padding: 1.3rem; }.card-body h4 { font-size: 1.45rem; }.card-body > p { min-height: 0; }.proof-layout { grid-template-columns: 1fr; }.process-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 2rem; }.closing-panel { grid-template-columns: .5fr 1fr; }.closing-symbol > span { width: 140px; height: 140px; } }
	@media(max-width:580px) { .service-grid { grid-template-columns: 1fr; gap: 1.5rem; }.card-body { padding: 1.5rem; }.card-body h4 { font-size: 1.65rem; }.service-index { gap: .45rem; }.service-index a { font-size: .65rem; padding: .55rem .7rem; }.service-index a :global(svg) { display: none; }.featured-visual { min-height: 300px; }.featured-copy { padding: 1.7rem; }.proof-card { padding: 1.3rem; }.proof-card > :global(svg) { width: 18px; }.proof-card h3 { font-size: 1.35rem; }.proof-icon { width: 42px; height: 42px; }.proof-icon img { width: 34px; height: 34px; }.closing-panel { grid-template-columns: 1fr; gap: 1.5rem; }.closing-symbol { height: 170px; }.closing-panel h2 { font-size: 2rem; }.studio-top > span { font-size: .47rem; }.studio-path strong { font-size: .6rem; }.studio-path > div { padding-block: .8rem; }.hero-footnote { font-size: .65rem; } }
	@media(max-width:360px) { .hero-copy > .eyebrow { font-size: .7rem; }h1 { font-size: 2.6rem; }.studio-path > div > span { display: none; }.studio-top > span { letter-spacing: .06em; }.process-grid { grid-template-columns: 1fr; gap: 1.5rem; }.step-top { margin-bottom: .7rem; }.proof-card { gap: .7rem; flex-wrap: wrap; }.proof-card > div { flex: 1; min-width: 150px; }.proof-card > :global(svg) { display: none; } }
</style>
