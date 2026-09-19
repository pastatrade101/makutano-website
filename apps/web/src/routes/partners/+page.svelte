<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { seo } from '$lib/seo';
	import { learningViews } from '$lib/partner-showcase';
	import Seo from '$components/ui/Seo.svelte';
	import Icon from '$components/ui/Icon.svelte';
	import SaccosShowcase from '$components/sections/SaccosShowcase.svelte';

	let { data } = $props();
	let activeView = $state(0);
	const view = $derived(learningViews[activeView]);
	const partners = $derived(data.partners.filter((partner) => !/smartclass/i.test(`${partner.slug} ${partner.name}`)));
	const domain = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
	function navigateTabs(event: KeyboardEvent, index: number) {
		let next = index;
		if (event.key === 'ArrowRight') next = (index + 1) % learningViews.length;
		else if (event.key === 'ArrowLeft') next = (index + learningViews.length - 1) % learningViews.length;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = learningViews.length - 1;
		else return;
		event.preventDefault();
		activeView = next;
		(event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
	}
</script>

<Seo title={seo.partners.title} description={seo.partners.description} />

<section class="ecosystem-hero" aria-labelledby="partners-title">
	<div class="container hero-layout">
		<div class="hero-copy">
			<nav class="breadcrumb" aria-label={t({ en: 'Breadcrumb', sw: 'Njia ya ukurasa' })}><a href="/">{t({ en: 'Home', sw: 'Nyumbani' })}</a><span>/</span><span>{t({ en: 'Products & partners', sw: 'Bidhaa na washirika' })}</span></nav>
			<span class="eyebrow">{t({ en: 'Our connected world', sw: 'Dunia yetu iliyounganishwa' })}</span>
			<h1 id="partners-title">{t({ en: 'Great things', sw: 'Mambo makubwa' })}<br />{t({ en: 'happen', sw: 'hutokea' })} <span>{t({ en: 'together.', sw: 'pamoja.' })}</span></h1>
			<p class="lead">{t({ en: 'The products we build. The people we build with. One shared ambition to turn technology into everyday progress.', sw: 'Bidhaa tunazounda. Watu tunaoshirikiana nao. Lengo moja la kufanya teknolojia ilete maendeleo ya kila siku.' })}</p>
			<div class="hero-actions"><a href="#smartclass" class="btn">{t({ en: 'Explore our products', sw: 'Gundua bidhaa zetu' })}<Icon name="arrow-down" size={17} /></a><a class="text-link" href="#our-partners">{t({ en: 'Meet our partners', sw: 'Kutana na washirika' })}<Icon name="arrow-up-right" size={17} /></a></div>
			<div class="hero-note"><span></span>{t({ en: 'Rooted in Tanzania. Connected by possibility.', sw: 'Mizizi Tanzania. Tumeunganishwa na fursa.' })}</div>
		</div>
		<div class="network" role="img" aria-label={t({ en: 'Makutano Digital connects its SmartClass education product with partners in technology and finance.', sw: 'Makutano Digital inaunganisha bidhaa yake ya elimu SmartClass na washirika wa teknolojia na fedha.' })}>
			<div class="network-grid"></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
			<svg class="connections" viewBox="0 0 560 500" aria-hidden="true"><path d="M280 258 L372 94 M280 258 L113 350 M280 258 L432 378" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 7"/><circle cx="325" cy="178" r="4"/><circle cx="197" cy="304" r="4"/><circle cx="355" cy="318" r="4"/></svg>
			<div class="network-center"><span class="center-mark">M<span>✦</span></span><strong>Makutano</strong><small>DIGITAL</small></div>
			<div class="network-node education"><span class="node-icon"><img src="/images/products/smartclass-logo.webp" alt="" width="36" height="36" /></span><div><small>{t({ en: 'OUR PRODUCT', sw: 'BIDHAA YETU' })}</small><strong>SmartClass</strong><span>{t({ en: 'Learning, reimagined', sw: 'Elimu kwa mtazamo mpya' })}</span></div></div>
			<div class="network-node finance"><span class="node-icon"><Icon name="building" size={25} /></span><div><small>{t({ en: 'FINANCE', sw: 'FEDHA' })}</small><strong>Ilboru Saccos</strong></div></div>
			<div class="network-node technology"><span class="node-icon"><Icon name="code" size={25} /></span><div><small>{t({ en: 'TECHNOLOGY', sw: 'TEKNOLOJIA' })}</small><strong>Moinfotech</strong></div></div>
			<span class="network-caption"><span>✦</span> {t({ en: 'Ideas meet possibility', sw: 'Mawazo yanakutana na fursa' })}</span>
		</div>
	</div>
</section>

<div class="chapter-bar"><div class="container"><a href="#smartclass"><span>01</span>{t({ en: 'Our products', sw: 'Bidhaa zetu' })}<Icon name="arrow-down" size={14} /></a><a href="#our-partners"><span>02</span>{t({ en: 'Our partners', sw: 'Washirika wetu' })}<Icon name="arrow-down" size={14} /></a><a href="#build-together"><span>03</span>{t({ en: 'Build with us', sw: 'Jenga nasi' })}<Icon name="arrow-down" size={14} /></a></div></div>

<section class="section product-section" id="smartclass" aria-labelledby="product-title">
	<div class="container">
		<div class="section-intro"><div><span class="eyebrow">01 / {t({ en: 'Designed by Makutano', sw: 'Imeundwa na Makutano' })}</span><h2 id="product-title">{t({ en: 'Our ideas. Out in the world.', sw: 'Mawazo yetu. Yanaleta mabadiliko.' })}</h2></div><p>{t({ en: 'We don’t just build for others. We create products of our own to solve the challenges we see around us.', sw: 'Hatujengi kwa ajili ya wengine pekee. Tunaunda bidhaa zetu kutatua changamoto zinazotuzunguka.' })}</p></div>

		<article class="product-spotlight">
			<div class="product-copy">
				<span class="product-label"><span></span>{t({ en: 'A Makutano Digital product', sw: 'Bidhaa ya Makutano Digital' })}</span>
				<div class="product-wordmark"><img src="/images/products/smartclass-logo.webp" alt="" width="44" height="44" /><h3>SmartClass</h3></div>
				<h4>{t({ en: 'Big confidence.', sw: 'Kujiamini zaidi.' })}<br /><span>{t({ en: 'Brighter futures.', sw: 'Mustakabali bora.' })}</span></h4>
				<p>{t({ en: 'An AI-powered learning platform for primary and secondary students. Personal tutoring, adaptive practice, and practical simulations come together with parent insights to support every step of the learning journey.', sw: 'Mfumo wa kujifunza kwa AI kwa wanafunzi wa shule za msingi na sekondari. Mafunzo binafsi, mazoezi yanayobadilika, majaribio shirikishi, na taarifa kwa wazazi husaidia kila hatua ya kujifunza.' })}</p>
				<div class="product-tags"><span>{t({ en: 'Primary & secondary', sw: 'Msingi na sekondari' })}</span><span>{t({ en: 'AI-powered', sw: 'Inaendeshwa na AI' })}</span></div>
				<a href="https://smartclass.co.tz/home" class="btn" target="_blank" rel="noopener noreferrer">{t({ en: 'Explore SmartClass', sw: 'Tembelea SmartClass' })}<Icon name="arrow-up-right" size={18} /><span class="visually-hidden">{t({en:'(opens in a new tab)',sw:'(kichupo kipya)'})}</span></a>
			</div>
			<div class="product-visual">
				<div class="visual-topline"><span><Icon name="layers" size={16} />{t({ en: 'A window into smarter learning', sw: 'Dirisha la kujifunza kwa ufanisi' })}</span><span class="visual-star">✦</span></div>
				<figure class="product-browser">
					<div class="browser-bar"><span class="browser-dots"><i></i><i></i><i></i></span><span><Icon name="shield" size={11} />smartclass.co.tz</span><Icon name="globe" size={13} /></div>
					<img class="dashboard-preview" src="/images/products/smartclass-dashboard.webp" width="3450" height="2098" alt={t({ en: 'SmartClass dashboard showing learner profiles, academic tools, subject performance, and an AI coach.', sw: 'Dashibodi ya SmartClass yenye wasifu wa mwanafunzi, zana za masomo, utendaji wa masomo, na mwalimu wa AI.' })} loading="lazy" />
					<figcaption>{t({ en: 'Product preview · Learner progress dashboard', sw: 'Muonekano wa bidhaa · Dashibodi ya maendeleo' })}</figcaption>
				</figure>
				<div class="visual-features"><div><Icon name="spark" size={22} /><strong>{t({ en: 'Learn', sw: 'Jifunze' })}</strong><small>{t({ en: 'Personal AI guidance', sw: 'Mwongozo binafsi wa AI' })}</small></div><div><Icon name="target" size={22} /><strong>{t({ en: 'Practise', sw: 'Fanya mazoezi' })}</strong><small>{t({ en: 'Build understanding', sw: 'Jenga uelewa' })}</small></div><div><Icon name="chart" size={22} /><strong>{t({ en: 'Grow', sw: 'Endelea' })}</strong><small>{t({ en: 'See your progress', sw: 'Ona maendeleo yako' })}</small></div></div>
			</div>
		</article>

		<div class="learning-details">
			<div class="detail-heading"><span class="eyebrow">{t({ en: 'Inside SmartClass', sw: 'Ndani ya SmartClass' })}</span><div class="audience-tabs" role="tablist" aria-label={t({ en: 'Explore SmartClass features', sw: 'Gundua vipengele vya SmartClass' })}>{#each learningViews as item, i}<button type="button" role="tab" id={`tab-${item.id}`} aria-selected={activeView === i} aria-controls={`panel-${item.id}`} tabindex={activeView === i ? 0 : -1} class:active={activeView === i} onclick={() => activeView = i} onkeydown={(event) => navigateTabs(event, i)}><Icon name={item.icon} size={16} />{t(item.label)}</button>{/each}</div></div>
			<div role="tabpanel" id={`panel-${view.id}`} aria-labelledby={`tab-${view.id}`} tabindex="0" class="feature-panel">
				<div class="feature-intro"><h3>{t(view.title)}</h3><p>{t(view.intro)}</p></div>
				<div class="feature-grid">{#each view.features as feature}<div class="feature"><span class="feature-icon"><Icon name={feature.icon} size={23} /></span><h4>{t(feature.title)}</h4><p>{t(feature.text)}</p></div>{/each}</div>
			</div>
			<div class="product-bottom"><p><Icon name="globe" size={18} />{t({ en: 'Built for daily learning, at home and on the go.', sw: 'Kwa kujifunza kila siku, nyumbani na popote.' })}</p><a href="https://smartclass.co.tz/login" target="_blank" rel="noopener noreferrer" class="text-link">{t({ en: 'Start your learning journey', sw: 'Anza safari ya kujifunza' })}<Icon name="arrow-up-right" size={17} /><span class="visually-hidden">{t({en:'(opens in a new tab)',sw:'(kichupo kipya)'})}</span></a></div>
		</div>
		<SaccosShowcase />
	</div>
</section>

<section class="section partner-section" id="our-partners" aria-labelledby="partner-heading">
	<div class="container">
		<div class="section-intro"><div><span class="eyebrow">02 / {t({ en: 'Stronger connections', sw: 'Ushirikiano imara' })}</span><h2 id="partner-heading">{t({ en: 'Good people. Shared purpose.', sw: 'Watu bora. Lengo la pamoja.' })}</h2></div><p>{t({ en: 'Specialist knowledge meets local understanding. Meet the organisations we work alongside in finance and technology.', sw: 'Utaalamu unakutana na uelewa wa mazingira yetu. Kutana na mashirika tunayoshirikiana nayo katika fedha na teknolojia.' })}</p></div>
		<div class="partner-grid">{#each partners as partner, i (partner.id)}
			<article class="partner-card">
				<div class="partner-art" class:tech={partner.slug === 'moinfotech'} aria-hidden="true"><span class="art-kicker">MAKUTANO × {partner.name.toUpperCase()}</span><div class="art-lines"></div><span class="art-ring"></span><span class="art-ring second"></span><span class="art-symbol">{#if partner.slug === 'ilboru-saccos'}<img src="/images/products/ilboru-logo.png" alt="" width="76" height="76" />{:else}<Icon name="code" size={54} stroke={1.2} />{/if}</span><span class="art-dot"></span><span class="art-word">{partner.name}</span><span class="art-index">0{i + 1}</span></div>
				<div class="partner-body"><span class="sector"><span></span>{t(partner.sector)}</span><h3>{partner.name}</h3><p>{t(partner.slug === 'ilboru-saccos' ? { en: 'Our client and partner in cooperative finance. We built the Ilboru platform using our own SACCOS system, connecting its members to their savings, shares, dividends, and borrowing information.', sw: 'Mteja na mshirika wetu katika fedha za ushirika. Tumejenga jukwaa la Ilboru kwa mfumo wetu wa SACCOS, tukiunganisha wanachama na taarifa za akiba, hisa, gawio, na mikopo.' } : partner.description)}</p><div class="partner-foot"><span>{t(partner.slug === 'ilboru-saccos' ? { en: 'Our client & partner · SACCOS platform', sw: 'Mteja na mshirika wetu · Mfumo wa SACCOS' } : { en: 'Engineering · Platform delivery', sw: 'Uhandisi · Utoaji wa mifumo' })}</span>{#if partner.url}<a class="partner-visit" href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={t({ en: `Visit ${partner.name} (opens in a new tab)`, sw: `Tembelea ${partner.name} (kichupo kipya)` })}><span>{domain(partner.url)}</span><Icon name="arrow-up-right" size={20} /></a>{/if}</div></div>
			</article>
		{/each}</div>
	</div>
</section>

<section class="section closing-section" id="build-together" aria-labelledby="closing-title"><div class="container"><div class="closing-panel"><div class="closing-art" aria-hidden="true"><span></span><span></span><Icon name="arrow-up-right" size={88} stroke={1} /></div><div class="closing-copy"><span class="eyebrow">03 / {t({ en: 'The next connection', sw: 'Ushirikiano unaofuata' })}</span><h2 id="closing-title">{t({ en: 'Your ambition.', sw: 'Maono yako.' })}<br />{t({ en: 'Our next chapter.', sw: 'Hatua yetu inayofuata.' })}</h2><p>{t({ en: 'Have a product idea, a shared challenge, or a partnership in mind? Let’s build something that matters.', sw: 'Una wazo la bidhaa, changamoto ya pamoja, au pendekezo la ushirikiano? Tujenge kitu chenye maana.' })}</p><a href="/contact" class="btn">{t({ en: 'Let’s build together', sw: 'Tujenge pamoja' })}<Icon name="arrow-up-right" size={18} /></a></div></div></div></section>

<style>
	.ecosystem-hero { padding: calc(var(--header-h) + 2.4rem) 0 3.5rem; overflow: hidden; background: radial-gradient(ellipse at 95% 40%, var(--brand-soft), transparent 60%); }
	.hero-layout { display: grid; grid-template-columns: 1.05fr 1fr; align-items: center; gap: 2rem; }
	.breadcrumb { display: flex; align-items: center; gap: .8rem; color: var(--ink-subtle); font-size: .75rem; margin-bottom: 2.2rem; }
	.breadcrumb a:hover { color: var(--brand-ink); }
	.hero-copy > .eyebrow { margin-bottom: 1.3rem; }
	h1 { font-size: clamp(2.75rem, 5.6vw, 5rem); line-height: 1.08; letter-spacing: -.045em; }
	h1 > span { position: relative; white-space: nowrap; }
	h1 > span::after { content: ''; position: absolute; bottom: .02em; left: 0; right: 0; height: .12em; background: var(--accent); z-index: -1; }
	h1 { isolation: isolate; }
	.hero-copy .lead { max-width: 43ch; margin-top: 1.5rem; font-size: 1.05rem; }
	.hero-actions { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; margin-top: 2rem; }
	.text-link { display: inline-flex; align-items: center; gap: .6rem; font-size: .88rem; font-weight: 600; color: var(--brand-ink); min-height: 44px; }
	.text-link:hover { text-decoration: underline; text-underline-offset: 5px; }
	.hero-note { display: flex; align-items: center; gap: .6rem; font-size: .73rem; color: var(--ink-subtle); margin-top: 2.2rem; }
	.hero-note > span, .product-label > span, .sector > span { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex: none; }
	.network { position: relative; width: 100%; aspect-ratio: 560 / 500; isolation: isolate; }
	.network-grid { position: absolute; inset: 0; background-image: radial-gradient(var(--line-strong) 1px, transparent 1px); background-size: 22px 22px; mask-image: radial-gradient(ellipse, black 35%, transparent 70%); }
	.orbit { position: absolute; border: 1px solid var(--line); border-radius: 50%; top: 50%; left: 50%; translate: -50% -50%; }
	.orbit-one { width: 61%; aspect-ratio: 1; }
	.orbit-two { width: 88%; aspect-ratio: 1; }
	.connections { position: absolute; inset: 0; width: 100%; height: 100%; color: var(--brand-ink); opacity: .55; fill: var(--accent); }
	.network-center { position: absolute; top: 51%; left: 50%; translate: -50% -50%; width: 30%; aspect-ratio: 1; background: var(--bg-raised); border: 1px solid var(--line-strong); border-radius: 26%; display: flex; align-items: center; justify-content: center; flex-direction: column; box-shadow: var(--shadow); }
	.center-mark { font: 600 clamp(2rem, 4vw, 3.8rem)/1 var(--font-display); color: var(--brand-ink); position: relative; margin-bottom: .4rem; }
	.center-mark span { position: absolute; right: -.45em; top: -.15em; font-size: .45em; color: var(--accent); }
	.network-center > strong { font: 500 clamp(.8rem, 1.5vw, 1.2rem) var(--font-display); }
	.network-center > small { font-size: .5rem; letter-spacing: .3em; color: var(--ink-muted); }
	.network-node { position: absolute; display: flex; align-items: center; gap: .8rem; padding: 1rem 1.2rem; border: 1px solid var(--line-strong); border-radius: 16px; background: var(--bg); box-shadow: 0 16px 35px rgba(0,0,0,.08); }
	.network-node.education { top: 8%; right: 4%; border-color: rgba(var(--accent-rgb), .5); }
	.network-node.finance { bottom: 22%; left: 0; }
	.network-node.technology { bottom: 10%; right: 0; }
	.node-icon { display: grid; place-items: center; width: 43px; height: 43px; color: var(--brand-ink); background: var(--brand-soft); border-radius: 12px; }
	.node-icon img { border-radius: 8px; }
	.network-node small { font-size: .5rem; letter-spacing: .13em; color: var(--ink-subtle); }
	.network-node strong, .network-node div > span { display: block; }
	.network-node strong { font: 500 1.1rem var(--font-display); }
	.network-node div > span { font-size: .65rem; color: var(--ink-muted); margin-top: .15rem; }
	.network-caption { position: absolute; bottom: 0; left: 12%; font-size: .65rem; color: var(--ink-subtle); letter-spacing: .05em; }
	.network-caption > span { color: var(--brand-ink); padding-right: .5rem; }
	.chapter-bar { border-block: 1px solid var(--line); background: var(--bg-raised); }
	.chapter-bar > div { display: grid; grid-template-columns: repeat(3, 1fr); }
	.chapter-bar a { display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; font-size: .85rem; }
	.chapter-bar a + a { border-left: 1px solid var(--line); }
	.chapter-bar a > span { color: var(--brand-ink); font-size: .65rem; }
	.chapter-bar a :global(svg) { margin-left: auto; color: var(--ink-subtle); }
	.chapter-bar a:hover { background: var(--brand-soft); }
	.section-intro { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; margin-bottom: 2.5rem; }
	.section-intro h2 { margin-top: 1rem; max-width: 20ch; font-size: clamp(1.9rem, 3.3vw, 2.8rem); }
	.section-intro > p { max-width: 40ch; font-size: .95rem; }
	.product-spotlight { display: grid; grid-template-columns: .9fr 1.2fr; background: #102337; border: 1px solid #294156; border-radius: 28px; overflow: hidden; --ink: #fff; --ink-muted: #b7c6d6; --bg: #102337; color: #fff; }
	.product-copy { padding: clamp(1.5rem, 3.5vw, 3.4rem); }
	.product-label { display: inline-flex; align-items: center; gap: .5rem; font-size: .62rem; text-transform: uppercase; letter-spacing: .12em; color: #c3ceda; }
	.product-wordmark { display: flex; align-items: center; gap: .55rem; margin: 2rem 0 1.6rem; }
	.product-wordmark img { border-radius: 9px; }
	.product-wordmark h3 { font-size: 2.2rem; letter-spacing: -.05em; }
	.product-copy h4 { font-size: clamp(1.8rem, 3vw, 2.5rem); line-height: 1.17; margin-bottom: 1.25rem; }
	.product-copy h4 > span { color: var(--accent); }
	.product-copy p { font-size: .9rem; line-height: 1.85; }
	.product-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.5rem 0 2rem; }
	.product-tags > span { font-size: .62rem; border: 1px solid #405266; border-radius: 30px; padding: .3rem .7rem; color: #c6d0dd; }
	.product-visual { min-width: 0; padding: 2rem; display: flex; flex-direction: column; justify-content: center; gap: 1.8rem; background: radial-gradient(ellipse at 80% 10%, rgba(255,189,88,.15), transparent 65%), linear-gradient(135deg, #18374f, #12283e); border-left: 1px solid #334658; }
	.visual-topline { display: flex; align-items: center; justify-content: space-between; }
	.visual-topline > span:first-child { display: flex; align-items: center; gap: .5rem; font-size: .7rem; color: #ccd7e3; }
	.visual-star { color: var(--accent); font-size: 2rem; }
	.product-browser { border: 1px solid #486075; border-radius: 13px; overflow: hidden; box-shadow: 0 25px 40px #07121f66; background: #12273a; transform: rotate(-2deg); }
	.browser-bar { display: flex; align-items: center; justify-content: space-between; padding: .8rem; border-bottom: 1px solid #314759; background: #20364a; color: #b7c6d6; font-size: .56rem; }
	.browser-bar > span { display: flex; align-items: center; gap: .4rem; }
	.browser-dots i { width: 5px; height: 5px; background: #607184; border-radius: 50%; }
	.browser-dots i:first-child { background: var(--accent); }
	.dashboard-preview { width: 100%; height: auto; }
	.product-browser figcaption { padding: .65rem 1rem; color: #a8bdcf; border-top: 1px solid #314759; font-size: .6rem; }
	.visual-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: .8rem; margin-top: .6rem; }
	.visual-features > div { display: flex; flex-direction: column; align-items: flex-start; gap: .3rem; }
	.visual-features :global(svg) { color: var(--accent); margin-bottom: .25rem; }
	.visual-features strong { font: 500 1rem var(--font-display); }
	.visual-features small { font-size: .63rem; color: #b7c6d6; }
	.learning-details { padding-top: 2.5rem; }
	.detail-heading { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
	.audience-tabs { display: flex; border: 1px solid var(--line); background: var(--bg-raised); border-radius: 50px; padding: 5px; gap: 4px; }
	.audience-tabs button { display: flex; align-items: center; justify-content: center; gap: .5rem; min-height: 44px; padding: .65rem 1rem; font-size: .78rem; color: var(--ink-muted); border-radius: 30px; }
	.audience-tabs button.active { background: var(--accent); color: var(--on-brand); }
	.audience-tabs button:hover:not(.active) { background: var(--bg-raised-2); color: var(--ink); }
	.feature-intro { display: flex; align-items: start; justify-content: space-between; gap: 2rem; margin: 2.5rem 0 1.7rem; }
	.feature-intro h3 { font-size: clamp(1.3rem, 2.5vw, 1.7rem); max-width: 25ch; }
	.feature-intro p { font-size: .88rem; max-width: 48ch; }
	.feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--line); border-left: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: var(--bg-raised); }
	.feature { padding: 1.8rem; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
	.feature-icon { display: flex; color: var(--brand-ink); margin-bottom: 1.2rem; }
	.feature h4 { font-size: 1.08rem; margin-bottom: .6rem; }
	.feature p { font-size: .83rem; line-height: 1.8; }
	.product-bottom { margin-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
	.product-bottom p { display: flex; align-items: center; gap: .6rem; font-size: .75rem; }
	.partner-section { background: var(--bg-raised); border-block: 1px solid var(--line); }
	.partner-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
	.partner-card { border: 1px solid var(--line); border-radius: 22px; background: var(--bg); overflow: hidden; }
	.partner-art { position: relative; height: 250px; background: #193346; overflow: hidden; color: #a2bec8; }
	.partner-art.tech { background: #142a47; color: #9eb1cf; }
	.art-kicker { position: absolute; left: 1.75rem; top: 1.5rem; font-size: .56rem; letter-spacing: .15em; z-index: 1; }
	.art-lines { position: absolute; inset: 0; background-image: linear-gradient(#a2bec810 1px, transparent 1px), linear-gradient(90deg, #a2bec810 1px, transparent 1px); background-size: 32px 32px; mask-image: linear-gradient(90deg, transparent, black); }
	.art-ring { position: absolute; width: 250px; height: 250px; border: 1px solid #7894aa45; border-radius: 50%; right: -30px; top: 30px; }
	.art-ring.second { width: 340px; height: 340px; right: -75px; top: -15px; }
	.tech .art-ring { border-radius: 24px; transform: rotate(35deg); }
	.art-symbol { position: absolute; right: 53px; top: 95px; color: var(--accent); }
	.art-symbol img { padding: .4rem; background: #fff; border-radius: 16px; object-fit: contain; }
	.art-word { position: absolute; left: 1.75rem; bottom: 1.75rem; font: 500 clamp(1.5rem, 3vw, 2.4rem) var(--font-display); color: #fff; letter-spacing: -.04em; }
	.art-dot { position: absolute; width: 14px; height: 14px; background: var(--accent); border: 4px solid #3d4954; border-radius: 50%; right: 223px; top: 90px; }
	.art-index { position: absolute; top: 1.5rem; right: 1.5rem; font-size: .7rem; }
	.partner-body { padding: 1.8rem; }
	.sector { display: flex; align-items: center; gap: .55rem; color: var(--brand-ink); font-size: .63rem; text-transform: uppercase; letter-spacing: .13em; }
	.partner-body h3 { font-size: 1.65rem; margin: .75rem 0; }
	.partner-body > p { font-size: .9rem; min-height: 5.4em; }
	.partner-foot { border-top: 1px solid var(--line); margin-top: 1.5rem; padding-top: 1rem; }
	.partner-foot > span { color: var(--ink-subtle); font-size: .68rem; }
	.partner-visit { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: .8rem; min-height: 44px; font-size: .85rem; font-weight: 500; }
	.partner-visit :global(svg) { box-sizing: content-box; padding: .7rem; border-radius: 50%; background: var(--brand-soft); color: var(--brand-ink); }
	.partner-visit:hover span { text-decoration: underline; text-underline-offset: 5px; }
	.closing-panel { display: grid; grid-template-columns: .7fr 1fr; align-items: center; gap: 3rem; padding: clamp(2rem, 5vw, 4.5rem); border: 1px solid var(--line); border-radius: 28px; background: radial-gradient(ellipse at 10% 50%, var(--brand-soft), transparent 70%), var(--bg-raised); overflow: hidden; }
	.closing-copy h2 { margin: 1.2rem 0; }
	.closing-copy p { max-width: 45ch; font-size: .95rem; }
	.closing-copy .btn { margin-top: 1.5rem; }
	.closing-art { min-height: 250px; position: relative; display: grid; place-items: center; color: var(--brand-ink); }
	.closing-art > span { position: absolute; width: 220px; height: 220px; border: 1px solid var(--brand-ink); border-radius: 45px; transform: rotate(-20deg); opacity: .3; }
	.closing-art > span + span { transform: rotate(20deg); background: var(--brand-soft); }
	.closing-art :global(svg) { position: relative; }
	@media (max-width: 1000px) { .hero-layout { gap: 1rem; } .network-node { padding: .8rem; gap: .5rem; } .network-node strong { font-size: .85rem; } .network-node .node-icon { width: 32px; height: 32px; } .product-spotlight { grid-template-columns: 1fr 1fr; } .product-visual { padding: 1.5rem; } .product-wordmark h3 { font-size: 1.9rem; } .section-intro > p { max-width: 34ch; } }
	@media (max-width: 760px) { .hero-layout { grid-template-columns: 1fr; } h1 { font-size: clamp(2.8rem, 8vw, 4.2rem); } .network { max-width: 520px; margin: 0 auto; } .hero-copy .lead { max-width: 50ch; } .network-node strong { font-size: 1rem; } .network-node { padding: 1rem; } .network-center > strong { font-size: 1.1rem; } .center-mark { font-size: 3rem; } .ecosystem-hero { padding-bottom: 2.5rem; } .chapter-bar a { padding: 1rem .5rem; gap: .5rem; font-size: .72rem; } .section-intro { align-items: start; flex-direction: column; gap: 1rem; } .section-intro > p { max-width: 55ch; } .section-intro h2 { max-width: 25ch; } .product-spotlight { grid-template-columns: 1fr; } .product-visual { border-left: 0; border-top: 1px solid #334658; padding: 2rem; } .product-copy { padding: 2rem; } .product-copy h4 { font-size: 2.3rem; } .feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .feature-intro { flex-direction: column; gap: .8rem; } .partner-grid { grid-template-columns: 1fr; } .partner-body > p { min-height: 0; } .art-word { font-size: 2.2rem; } .closing-panel { grid-template-columns: .55fr 1fr; gap: 1.5rem; } .closing-art > span { width: 145px; height: 145px; border-radius: 30px; } }
	@media (max-width: 480px) { .hero-actions { gap: .8rem; } .breadcrumb { margin-bottom: 1.6rem; } .hero-copy > .eyebrow { font-size: .7rem; } .hero-note { font-size: .65rem; } .network-node { padding: .7rem; border-radius: 12px; } .network-node strong { font-size: .8rem; } .network-node div > span { font-size: .55rem; } .network-node small { font-size: .43rem; } .network-node .node-icon { width: 28px; height: 28px; } .network-node.education { right: 0; top: 7%; } .network-node.technology { bottom: 12%; } .network-center { border-radius: 20px; } .network-center > strong { font-size: .75rem; } .center-mark { font-size: 2.3rem; } .network-center > small { font-size: .4rem; } .network-caption { left: 3%; font-size: .56rem; } .chapter-bar a { flex-wrap: wrap; font-size: .65rem; gap: .4rem; } .chapter-bar a :global(svg) { display: none; } .product-copy, .product-visual { padding: 1.5rem; } .product-wordmark { margin-top: 1.5rem; } .product-wordmark h3 { font-size: 2rem; } .visual-features { gap: .5rem; } .visual-features small { font-size: .58rem; } .audience-tabs { width: 100%; border-radius: 16px; gap: 2px; } .audience-tabs button { flex: 1; padding: .65rem .3rem; font-size: .67rem; border-radius: 12px; flex-direction: column; gap: .3rem; } .feature-grid { grid-template-columns: 1fr; } .feature { padding: 1.4rem; } .feature-intro { margin-top: 1.8rem; } .partner-body { padding: 1.5rem; } .art-word { font-size: 1.75rem; } .closing-panel { grid-template-columns: 1fr; gap: 0; padding: 1.75rem; } .closing-art { min-height: 185px; margin-bottom: 1.7rem; } .closing-copy h2 { font-size: 2rem; } }
</style>
