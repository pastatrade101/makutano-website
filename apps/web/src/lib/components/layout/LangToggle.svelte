<script lang="ts">
	import { lang, t } from '$lib/i18n.svelte';

	/** EN / SW switch. The active half slides a pill behind it. */
	interface Props {
		compact?: boolean;
	}

	let { compact = false }: Props = $props();
</script>

<div class="toggle" class:compact role="group" aria-label={t({en:'Language',sw:'Lugha'})}>
 <button type="button" class:active={lang.current === 'en'} aria-label="English" aria-pressed={lang.current === 'en'} onclick={() => lang.set('en')}>EN</button>
 <button type="button" class:active={lang.current === 'sw'} aria-label="Kiswahili" aria-pressed={lang.current === 'sw'} onclick={() => lang.set('sw')}>SW</button>
</div>
<style>
 .toggle { display: inline-flex; padding: 3px; border: 1px solid var(--line); border-radius: var(--radius-pill); gap: 2px; }
 button { width: 38px; min-height: 38px; border-radius: 50%; font: 500 .75rem var(--font-display); color: var(--ink-muted); transition: background var(--dur-fast), color var(--dur-fast); }
 button.active { background: var(--brand); color: var(--on-brand); }
 button:not(.active):hover { background: var(--bg-raised-2); color: var(--ink); }
 .compact button { width: 36px; }
</style>
