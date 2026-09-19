<script lang="ts">
	import { navigating } from '$app/state';
	/** Thin scroll-progress bar pinned under the header. */
	let progress = $state(0);

	function onScroll() {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
	}
</script>

<svelte:window onscroll={onScroll} onresize={onScroll} />

<div class="progress" class:loading={Boolean(navigating.to)} role="presentation">
	<span style="transform: scaleX({progress})"></span>
</div>

<style>
	.progress.loading span { transform: none !important; width: 35%; animation: loading 1s ease-in-out infinite; }
	@keyframes loading { from { translate: -100% 0; } to { translate: 400% 0; } }
	.progress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		z-index: 101;
		pointer-events: none;
	}

	.progress span {
		display: block;
		height: 100%;
		background: linear-gradient(90deg, var(--brand), var(--accent));
		transform-origin: 0 50%;
		transform: scaleX(0);
	}
</style>
