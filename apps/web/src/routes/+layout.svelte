<script lang="ts">
	import '$styles/app.css';
	import { onMount } from 'svelte';
	import { lang, t } from '$lib/i18n.svelte';
	import { theme } from '$lib/theme.svelte';
	import Header from '$components/layout/Header.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import PageProgress from '$components/layout/PageProgress.svelte';
	import ScrollTop from '$components/layout/ScrollTop.svelte';
	import SiteMotion from '$components/layout/SiteMotion.svelte';
	import Cursor from '$components/ui/Cursor.svelte';
	let { data, children } = $props();
	onMount(() => lang.init());
	onMount(() => theme.init());
</script>

<a class="skip-link" href="#main">{t({en:'Skip to content',sw:'Ruka hadi maudhui'})}</a>
<PageProgress />
<SiteMotion />
<Header site={data.site} />
<main id="main" tabindex="-1">{@render children()}</main>
<Footer site={data.site} services={data.footerServices} />
<ScrollTop />
<Cursor />
<style>main { min-height: 60vh; } main:focus { outline: none; }</style>
