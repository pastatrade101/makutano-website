<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import Icon from '../ui/Icon.svelte';
	const features = [
		{ icon: 'coin', title: { en: 'Savings, shares & dividends', sw: 'Akiba, hisa na gawio' }, text: { en: 'A member portal that brings savings, shareholding, and dividend information together in one place.', sw: 'Tovuti ya wanachama inayoweka taarifa za akiba, hisa, na gawio pamoja katika sehemu moja.' } },
		{ icon: 'chart', title: { en: 'Clarity before borrowing', sw: 'Uwazi kabla ya kukopa' }, text: { en: 'Members can see their borrowing limit, interest rate, and repayment terms before applying.', sw: 'Wanachama wanaweza kuona kikomo cha mkopo, riba, na masharti ya marejesho kabla ya kuomba.' } },
		{ icon: 'users', title: { en: 'A simpler way to join', sw: 'Njia rahisi ya kujiunga' }, text: { en: 'Online membership applications and first-time account setup using an existing member number.', sw: 'Maombi ya uanachama mtandaoni na kuanzisha akaunti kwa kutumia namba ya mwanachama.' } },
		{ icon: 'layers', title: { en: 'A shared view of progress', sw: 'Mtazamo wa pamoja wa maendeleo' }, text: { en: 'Cooperative milestones and dividend allocations give members visibility into their SACCO.', sw: 'Hatua za maendeleo ya chama na mgao wa gawio huwapa wanachama taarifa kuhusu SACCOS yao.' } }
	];
</script>

<article class="saccos-showcase" id="saccos" aria-labelledby="saccos-title">
	<div class="saccos-heading"><span class="eyebrow">{t({ en: 'Our platform · Financial technology', sw: 'Mfumo wetu · Teknolojia ya fedha' })}</span><span class="deployment-tag"><span></span>{t({ en: 'In use at Ilboru Saccos', sw: 'Unatumika Ilboru Saccos' })}</span></div>
	<div class="saccos-layout">
		<div class="saccos-copy">
			<h3 id="saccos-title">{t({ en: 'Stronger cooperatives.', sw: 'Vyama imara zaidi.' })}<br /><span>{t({ en: 'Connected members.', sw: 'Wanachama waliounganishwa.' })}</span></h3>
			<p class="intro">{t({ en: 'Our SACCOS platform brings cooperative finance closer to the people it serves. Built and owned by Makutano Digital, with a dedicated implementation for Ilboru Alumni Saccos.', sw: 'Mfumo wetu wa SACCOS unasogeza huduma za fedha za ushirika karibu na wanachama. Umejengwa na unamilikiwa na Makutano Digital, ukiwa na utekelezaji maalumu kwa Ilboru Alumni Saccos.' })}</p>
			<dl class="ownership"><div><dt>{t({ en: 'Platform', sw: 'Mfumo' })}</dt><dd>{t({ en: 'Built & owned by Makutano Digital', sw: 'Umejengwa na unamilikiwa na Makutano Digital' })}</dd></div><div><dt>{t({ en: 'Client & partner', sw: 'Mteja na mshirika' })}</dt><dd>Ilboru Alumni Saccos Ltd</dd></div></dl>
			<div class="saccos-actions"><a href="https://saccos.ias.co.tz/signin" target="_blank" rel="noopener noreferrer" class="btn">{t({ en: 'Visit the Ilboru platform', sw: 'Tembelea mfumo wa Ilboru' })}<Icon name="arrow-up-right" size={17} /><span class="visually-hidden">{t({en:'(opens in a new tab)',sw:'(kichupo kipya)'})}</span></a><a href="/contact" class="platform-link">{t({ en: 'Discuss your SACCO', sw: 'Tuambie kuhusu SACCOS yako' })}<Icon name="arrow-right" size={16} /></a></div>
		</div>
		<div class="saccos-visual" aria-label={t({ en: 'Illustrated overview of the SACCOS platform', sw: 'Muhtasari wa mfumo wa SACCOS kwa picha' })}>
			<div class="portal-top"><span class="portal-logo"><img src="/images/products/ilboru-logo.png" alt="" width="42" height="42" /></span><div><strong>ILBORU ALUMNI SACCOS</strong><small>FURTHER TOGETHER</small></div><Icon name="shield" size={21} /></div>
			<div class="portal-title"><span>{t({ en: 'THE MEMBER EXPERIENCE', sw: 'HUDUMA KWA MWANACHAMA' })}</span><h4>{t({ en: 'Your cooperative.', sw: 'Chama chako.' })}<br />{t({ en: 'Closer than ever.', sw: 'Karibu kuliko wakati wowote.' })}</h4></div>
			<div class="account-tiles"><div><Icon name="coin" size={22} /><strong>{t({ en: 'Savings', sw: 'Akiba' })}</strong><span class="tile-line"></span></div><div><Icon name="layers" size={22} /><strong>{t({ en: 'Shares', sw: 'Hisa' })}</strong><span class="tile-line"></span></div><div><Icon name="chart" size={22} /><strong>{t({ en: 'Dividends', sw: 'Gawio' })}</strong><span class="tile-line"></span></div></div>
			<div class="borrowing"><span class="borrow-icon"><Icon name="target" size={24} /></span><div><strong>{t({ en: 'Plan your next step', sw: 'Panga hatua yako inayofuata' })}</strong><small>{t({ en: 'Know your limit. Understand your terms.', sw: 'Jua kikomo chako. Elewa masharti yako.' })}</small></div><Icon name="arrow-up-right" size={18} /></div>
			<div class="portal-bottom"><span>{t({ en: 'Platform overview · Illustration', sw: 'Muhtasari wa mfumo · Kielelezo' })}</span><span>EN / SW</span></div>
		</div>
	</div>
	<div class="saccos-features">{#each features as feature}<div><Icon name={feature.icon} size={24} /><h4>{t(feature.title)}</h4><p>{t(feature.text)}</p></div>{/each}</div>
</article>

<style>
	.saccos-showcase { margin-top: clamp(3.5rem, 7vw, 6rem); padding-top: clamp(2.5rem, 5vw, 4rem); border-top: 1px solid var(--line); }
	.saccos-heading { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
	.deployment-tag { display: inline-flex; align-items: center; gap: .5rem; border: 1px solid var(--line); border-radius: 30px; background: var(--bg-raised); padding: .45rem .8rem; color: var(--ink-muted); font-size: .68rem; }
	.deployment-tag > span { width: 6px; height: 6px; border-radius: 50%; background: var(--brand-ink); }
	.saccos-layout { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
	.saccos-copy h3 { font-size: clamp(1.9rem, 3.2vw, 2.7rem); line-height: 1.2; letter-spacing: -.035em; }
	.saccos-copy h3 > span { color: var(--brand-ink); }
	.intro { margin: 1.3rem 0 1.8rem; font-size: .95rem; line-height: 1.85; max-width: 48ch; }
	.ownership { padding: 1.25rem 0; border-block: 1px solid var(--line); display: flex; flex-direction: column; gap: .85rem; }
	.ownership > div { display: grid; grid-template-columns: 110px 1fr; gap: 1rem; font-size: .75rem; }
	dt { color: var(--ink-subtle); } dd { color: var(--ink); font-weight: 500; }
	.saccos-actions { display: flex; gap: .75rem 1.3rem; align-items: center; flex-wrap: wrap; margin-top: 1.8rem; }
	.platform-link { display: inline-flex; align-items: center; gap: .5rem; min-height: 44px; font-size: .8rem; color: var(--brand-ink); font-weight: 500; }
	.platform-link:hover { text-decoration: underline; text-underline-offset: 4px; }
	.saccos-visual { padding: clamp(1.25rem, 3vw, 2.2rem); border-radius: 24px; border: 1px solid #33486d; background: radial-gradient(ellipse at 95% 0, #ffbd5826, transparent 45%), linear-gradient(135deg, #162744, #1a315d); color: #fff; position: relative; overflow: hidden; }
	.portal-top { display: flex; align-items: center; gap: .75rem; padding-bottom: 1.5rem; border-bottom: 1px solid #ffffff20; }
	.portal-logo { padding: 5px; border-radius: 12px; background: #fff; flex: none; }
	.portal-logo img { object-fit: contain; }
	.portal-top strong { display: block; font-size: .65rem; color: #fff; }
	.portal-top small { color: var(--accent); font-size: .5rem; letter-spacing: .15em; }
	.portal-top > :global(svg) { margin-left: auto; color: var(--accent); }
	.portal-title { margin-block: 1.8rem; }
	.portal-title > span { font-size: .55rem; color: #b6c7df; letter-spacing: .16em; }
	.portal-title h4 { font-size: clamp(1.7rem, 2.4vw, 2.2rem); color: #fff; margin-top: .7rem; }
	.account-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: .65rem; }
	.account-tiles > div { border-radius: 12px; padding: 1rem .8rem; background: #ffffff08; border: 1px solid #ffffff22; }
	.account-tiles :global(svg) { color: var(--accent); }
	.account-tiles strong { display: block; margin: .65rem 0; color: #e0e7f1; font-size: .7rem; font-weight: 500; }
	.tile-line { display: block; width: 65%; height: 5px; border-radius: 5px; background: #6682ad66; }
	.account-tiles > div:nth-child(2) .tile-line { width: 40%; }
	.account-tiles > div:nth-child(3) .tile-line { width: 52%; }
	.borrowing { display: flex; align-items: center; gap: .7rem; padding: 1rem; margin-top: 1rem; background: #ffbd5812; border: 1px solid #ffbd5833; border-radius: 12px; }
	.borrow-icon { color: var(--accent); flex: none; }
	.borrowing strong { color: #fff; font-size: .75rem; display: block; }
	.borrowing small { display: block; color: #bac9df; font-size: .59rem; margin-top: .2rem; }
	.borrowing > :global(svg) { color: var(--accent); margin-left: auto; }
	.portal-bottom { margin-top: 1.25rem; display: flex; justify-content: space-between; gap: .5rem; font-size: .55rem; color: #b4c4dc; }
	.saccos-features { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 2.5rem; gap: 1.5rem; }
	.saccos-features > div { padding-top: 1.5rem; border-top: 1px solid var(--line); }
	.saccos-features :global(svg) { color: var(--brand-ink); margin-bottom: 1rem; }
	.saccos-features h4 { font-size: 1rem; margin-bottom: .7rem; }
	.saccos-features p { font-size: .83rem; line-height: 1.8; }
	@media (max-width: 900px) { .saccos-layout { gap: 2rem; } .saccos-features { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 760px) { .saccos-layout { grid-template-columns: 1fr; } .intro { max-width: 60ch; } .saccos-visual { padding: 2rem; } }
	@media (max-width: 480px) { .saccos-visual { padding: 1.25rem; } .saccos-features { grid-template-columns: 1fr; gap: .5rem; } .saccos-features > div { padding-bottom: 1rem; } .ownership > div { grid-template-columns: 85px 1fr; gap: .65rem; } .account-tiles { gap: .4rem; } .account-tiles > div { padding: .8rem .6rem; } .account-tiles strong { font-size: .65rem; } .portal-top { gap: .5rem; } .portal-top strong { font-size: .55rem; } .portal-top small { font-size: .45rem; } .portal-top > :global(svg) { display: none; } .portal-bottom { font-size: .5rem; } }
</style>
