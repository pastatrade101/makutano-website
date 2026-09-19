<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { t } from '$lib/i18n.svelte';
	import { nav, ui, type SiteSettings } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';
	import LangToggle from './LangToggle.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let { site }: { site: SiteSettings } = $props();
	let drawer: HTMLDialogElement;
	let trigger: HTMLButtonElement;
	let open = $state(false);
	let scrolled = $state(false);
	const current = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	const tel = $derived(site.phone.replace(/\s/g, ''));
	const isActive = (href: string) => current === href;
	function close() { drawer?.close(); open = false; }
	function show() { drawer.showModal(); open = true; }
	function menuKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') { event.preventDefault(); close(); return; }
		if (event.key !== 'Tab') return;
		const focusable = [...drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
		else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
	}
	afterNavigate(close);
	onMount(() => {
		const desktop = window.matchMedia('(min-width: 1101px)');
		const resize = () => { if (desktop.matches) close(); };
		desktop.addEventListener('change', resize);
		return () => desktop.removeEventListener('change', resize);
	});
	$effect(() => {
		if (!open) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => { document.body.style.overflow = previous; };
	});
</script>

<svelte:window onscroll={() => scrolled = window.scrollY > 16} />
<header class="header" class:scrolled>
	<div class="container bar">
		<a href="/" class="brand" aria-label={t({ en: `${site.name} — home`, sw: `${site.name} — nyumbani` })}>
			<span class="mark" aria-hidden="true">M</span>
			<span class="word"><strong>Makutano</strong><em>Digital</em></span>
		</a>
		<nav class="desktop-nav" aria-label={t({ en: 'Primary navigation', sw: 'Urambazaji mkuu' })}>
			{#each nav as item (item.href)}
				<a href={item.href} class:active={isActive(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>{t(item.label)}</a>
			{/each}
		</nav>
		<div class="actions">
			<LangToggle />
			<ThemeToggle />
			<a class="btn btn--sm cta" href="/contact">{t(ui.letsTalk)}<Icon name="arrow-up-right" size={16} /></a>
			<button bind:this={trigger} class="burger" type="button" aria-label={t({en:'Open menu',sw:'Fungua menyu'})} aria-expanded={open} aria-controls="mobile-menu" onclick={show}><Icon name="menu" size={22} /></button>
		</div>
	</div>
</header>

<dialog bind:this={drawer} id="mobile-menu" class="drawer" aria-label={t({en:'Navigation menu',sw:'Menyu ya urambazaji'})} onclose={() => { open = false; trigger?.focus(); }} onclick={(event) => { if (event.target === drawer) { const r = drawer.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right) close(); } }} onkeydown={menuKeydown}>
	<div class="drawer-head"><span class="eyebrow">Makutano Digital</span><button type="button" class="close" aria-label={t({en:'Close menu',sw:'Funga menyu'})} onclick={close}><Icon name="close" size={22} /></button></div>
	<nav aria-label={t({en:'Mobile navigation',sw:'Urambazaji wa simu'})}>
		{#each nav as item (item.href)}
			<a href={item.href} onclick={close} class:active={isActive(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>{t(item.label)}<Icon name="arrow-up-right" size={20} /></a>
		{/each}
	</nav>
	<div class="drawer-foot">
		<a class="btn" href="/contact" onclick={close}>{t(ui.startProject)}<Icon name="arrow-up-right" size={16} /></a>
		<a href="mailto:{site.email}">{site.email}</a>
		<a href="tel:{tel}">{site.phone}</a>
		<p>{t(site.address)}</p>
	</div>
</dialog>

<style>
	.header { position: fixed; inset: 0 0 auto; z-index: 100; background: rgba(var(--bg-rgb), .88); border-bottom: 1px solid transparent; backdrop-filter: blur(18px); transition: border-color var(--dur-fast), background 280ms var(--ease-out), box-shadow 280ms var(--ease-out); }
	.header.scrolled { border-color: var(--line); background: rgba(var(--bg-rgb), .94); box-shadow: 0 12px 38px rgba(4, 10, 18, .08); }
	.bar { height: var(--header-h); display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
	.brand { display: inline-flex; align-items: center; gap: .7rem; flex: none; }
	.mark { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: var(--brand); color: var(--on-brand); font: 700 1.4rem var(--font-display); transition: transform 320ms var(--ease-emphasized), border-radius 320ms var(--ease-out); }
	.brand:hover .mark { transform: rotate(-7deg) scale(1.06); border-radius: 16px 10px 16px 10px; }
	.word { display: flex; flex-direction: column; font-family: var(--font-display); line-height: 1.1; }
	.word strong { font-size: 1.1rem; }
	.word em { font-style: normal; font-size: .65rem; letter-spacing: .3em; text-transform: uppercase; color: var(--brand-ink); margin-top: .2rem; }
	.desktop-nav { display: flex; gap: .25rem; }
	.desktop-nav a { position: relative; padding: .65rem 1rem; border-radius: var(--radius-pill); font-size: .9rem; color: var(--ink-muted); transition: color 160ms var(--ease-out), background 220ms var(--ease-out), transform 220ms var(--ease-emphasized); }
	.desktop-nav a:hover { transform: translateY(-2px); }
	.desktop-nav a:hover { color: var(--ink); background: var(--bg-raised); }
	.desktop-nav a.active { background: var(--brand-soft); color: var(--brand-ink); }
	.actions { display: flex; align-items: center; gap: .75rem; }
	.burger, .close { display: grid; place-items: center; width: 44px; height: 44px; flex: none; border: 1px solid var(--line-strong); border-radius: 50%; color: var(--ink); }
	.burger { display: none; }
	.drawer { position: fixed; inset: 0 0 0 auto; margin: 0; width: min(92vw, 400px); height: 100dvh; max-height: none; max-width: none; padding: 1.5rem; background: var(--bg-raised); color: var(--ink); border: 0; border-left: 1px solid var(--line); overscroll-behavior: contain; }
	.drawer[open] { display: flex; flex-direction: column; gap: 2rem; animation: drawer-in 300ms var(--ease-out); }
	.drawer::backdrop { background: rgba(0, 0, 0, .65); backdrop-filter: blur(4px); }
	.drawer-head { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }
	.drawer-head .eyebrow { font-size: .7rem; }
	.drawer-head .eyebrow::before { display: none; }
	.drawer nav a { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--line); font: 500 1.5rem var(--font-display); }
	.drawer nav a.active { color: var(--brand-ink); }
	.drawer-foot { display: flex; flex-direction: column; align-items: flex-start; gap: .8rem; margin-top: auto; padding-bottom: env(safe-area-inset-bottom); overflow-wrap: anywhere; }
	.drawer-foot .btn { margin-bottom: .75rem; }
	.drawer-foot > a:not(.btn), .drawer-foot p { font-size: .9rem; }
	@keyframes drawer-in { from { opacity: 0; transform: translateX(24px); } }
	@media (max-width: 1100px) { .desktop-nav { display: none; } .burger { display: grid; } }
	@media (max-width: 560px) { .cta { display: none; } .bar { gap: .5rem; } .actions { gap: .5rem; } }
	@media (max-width: 360px) { .word { display: none; } .brand { gap: .45rem; } .mark { width: 34px; height: 36px; } }
</style>
