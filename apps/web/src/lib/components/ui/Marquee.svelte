<script lang="ts">
	/** Seamless infinite marquee. The track is duplicated and translated by 50%. */
	interface Props {
		items: string[];
		speed?: number;
		reverse?: boolean;
		separator?: string;
		variant?: 'outline' | 'solid';
	}

	let {
		items,
		speed = 32,
		reverse = false,
		separator = '✦',
		variant = 'solid'
	}: Props = $props();

	const doubled = $derived([...items, ...items]);
</script>

<div class="marquee" class:outline={variant === 'outline'} aria-hidden="true">
	<div class="track" class:reverse style="--speed: {speed}s">
		{#each doubled as item, i (i)}
			<span class="item">{item}</span>
			<span class="sep">{separator}</span>
		{/each}
	</div>
</div>

<style>
	.marquee {
		overflow: hidden;
		width: 100%;
		mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
	}

	.track {
		display: flex;
		align-items: center;
		gap: 1.75rem;
		width: max-content;
		animation: slide var(--speed) linear infinite;
	}

	.track.reverse {
		animation-direction: reverse;
	}

	.marquee:hover .track {
		animation-play-state: paused;
	}

	.item {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3.4vw, 2.75rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--ink);
		white-space: nowrap;
		line-height: 1.2;
	}

	.outline .item {
		color: transparent;
		-webkit-text-stroke: 1px var(--line-strong);
	}

	.sep {
		color: var(--brand);
		font-size: clamp(0.9rem, 1.6vw, 1.35rem);
	}

	@keyframes slide {
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
	}
</style>
