<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { theme } from '$lib/theme.svelte';
	import Icon from '../ui/Icon.svelte';
</script>

<button
	type="button"
	class="theme-toggle"
	role="switch"
	aria-checked={theme.current === 'dark'}
	aria-label={t({ en: 'Dark mode', sw: 'Hali ya giza' })}
	title={theme.current === 'dark' ? t({ en: 'Switch to light mode', sw: 'Washa hali ya mwanga' }) : t({ en: 'Switch to dark mode', sw: 'Washa hali ya giza' })}
	onclick={() => theme.toggle()}>
	<span class="sun"><Icon name="sun" size={20} /></span>
	<span class="moon"><Icon name="moon" size={20} /></span>
</button>

<style>
	.theme-toggle { display: grid; place-items: center; width: 44px; height: 44px; flex: none; border: 1px solid var(--line-strong); border-radius: 50%; color: var(--brand-ink); background: var(--bg-raised); }
	.theme-toggle:hover { background: var(--brand-soft); border-color: var(--brand); }
	.sun, .moon { grid-area: 1 / 1; }
	.moon { display: none; }
	:global(html[data-theme='light']) .sun { display: none; }
	:global(html[data-theme='light']) .moon { display: block; }
</style>
