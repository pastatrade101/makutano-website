<script lang="ts">
	import { browser } from '$app/environment';
	import { prefersReducedMotion } from '$actions';
	import { onMount } from 'svelte';

	/**
	 * Trailing dot + ring cursor. Grows over interactive elements, and hides
	 * itself entirely on touch devices or under reduced-motion.
	 */

	let ring = $state<HTMLDivElement | null>(null);
	let dot = $state<HTMLDivElement | null>(null);
	let enabled = $state(false);
	let active = $state(false);
	let visible = $state(false);

	onMount(() => {
		if (!browser) return;
		if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

		enabled = true;

		let mx = window.innerWidth / 2;
		let my = window.innerHeight / 2;
		let rx = mx;
		let ry = my;
		let raf = 0;

		const loop = () => {
			rx += (mx - rx) * 0.16;
			ry += (my - ry) * 0.16;
			if (ring) ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
			if (dot) dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		const onMove = (e: PointerEvent) => {
			mx = e.clientX;
			my = e.clientY;
			visible = true;
			const target = e.target as HTMLElement | null;
			active = Boolean(
				target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]')
			);
		};

		const onLeave = () => (visible = false);

		window.addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('pointerleave', onLeave);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerleave', onLeave);
		};
	});
</script>

{#if enabled}
	<div
		class="ring"
		class:active
		class:visible
		bind:this={ring}
		aria-hidden="true">
	</div>
	<div class="dot" class:visible bind:this={dot} aria-hidden="true"></div>
{/if}

<style>
	.ring,
	.dot {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		pointer-events: none;
		opacity: 0;
		transition: opacity 250ms ease;
	}

	.ring.visible,
	.dot.visible {
		opacity: 1;
	}

	.ring {
		width: 40px;
		height: 40px;
		border: 1px solid rgba(var(--brand-rgb), 0.7);
		border-radius: 50%;
		transition:
			opacity 250ms ease,
			width 300ms var(--ease-out),
			height 300ms var(--ease-out),
			background 300ms var(--ease-out),
			border-color 300ms var(--ease-out);
	}

	.ring.active {
		background: rgba(var(--brand-rgb), 0.16);
		border-color: var(--brand);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--brand);
	}

	@media (pointer: coarse) {
		.ring,
		.dot {
			display: none;
		}
	}
</style>
