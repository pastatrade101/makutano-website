<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { scrollToTop } from '$actions';
	import Icon from '../ui/Icon.svelte';

	/** Circular back-to-top button with a progress ring. */
	let progress = $state(0);
	const visible = $derived(progress > 0.12);

	function onScroll() {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
	}

	const CIRCUMFERENCE = 2 * Math.PI * 20;
</script>

<svelte:window onscroll={onScroll} onresize={onScroll} />

<button
	class="top"
	class:visible
	type="button"
	aria-label={t({en: 'Back to top', sw: 'Rudi juu'})}
	tabindex={visible ? 0 : -1}
	aria-hidden={!visible}
	onclick={() => scrollToTop(false)}>
	<svg viewBox="0 0 44 44" aria-hidden="true">
		<circle cx="22" cy="22" r="20" class="track" />
		<circle
			cx="22"
			cy="22"
			r="20"
			class="bar"
			stroke-dasharray={CIRCUMFERENCE}
			stroke-dashoffset={CIRCUMFERENCE * (1 - progress)} />
	</svg>
	<Icon name="arrow-up-right" size={16} />
</button>

<style>
	.top {
		position: fixed;
		right: clamp(1rem, 3vw, 2rem);
		bottom: clamp(1rem, 3vw, 2rem);
		z-index: 90;
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--bg-raised);
		border: 1px solid var(--line);
		color: var(--ink);
		opacity: 0;
		transform: translateY(14px) scale(0.9);
		pointer-events: none;
		transition:
			opacity var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out),
			background var(--dur) var(--ease-out);
	}

	.top.visible {
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}

	.top:hover {
		background: var(--brand);
		border-color: var(--brand);
		color: var(--on-brand);
	}

	.top :global(svg:last-of-type) {
		transform: rotate(-45deg);
	}

	.top > svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
		fill: none;
	}

	.track {
		stroke: var(--line);
		stroke-width: 1.5;
	}

	.bar {
		stroke: var(--brand);
		stroke-width: 1.5;
		stroke-linecap: round;
		transition: stroke-dashoffset 120ms linear;
	}
</style>
