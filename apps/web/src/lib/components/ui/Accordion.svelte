<script lang="ts">
	import Icon from './Icon.svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface Item {
		id: string;
		question: string;
		answer: string;
	}

	interface Props {
		items: Item[];
		/** Index open on first render. -1 opens none. */
		initial?: number;
	}

	let { items, initial = 0 }: Props = $props();

	/** Tracks the panel the visitor opened; null until they touch it. */
	let picked = $state<string | null>(null);
	let touched = $state(false);

	const openId = $derived(touched ? picked : (items[initial]?.id ?? null));

	function toggle(id: string) {
		touched = true;
		picked = openId === id ? null : id;
	}
</script>

<div class="accordion">
	{#each items as item (item.id)}
		{@const open = openId === item.id}
		<div class="item" class:open>
			<h3>
				<button
					type="button"
					aria-expanded={open}
					aria-controls="panel-{item.id}"
					onclick={() => toggle(item.id)}>
					<span>{item.question}</span>
					<span class="indicator">
						<Icon name={open ? 'minus' : 'plus'} size={16} />
					</span>
				</button>
			</h3>
			{#if open}
				<div
					class="panel"
					id="panel-{item.id}"
					transition:slide={{ duration: 320, easing: cubicOut }}>
					<p>{item.answer}</p>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.accordion {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.item {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--bg-raised);
		overflow: hidden;
		transition:
			border-color var(--dur) var(--ease-out),
			background var(--dur) var(--ease-out);
	}

	.item.open {
		border-color: rgba(var(--brand-rgb), 0.45);
		background: var(--bg-raised-2);
	}

	h3 {
		margin: 0;
		font-size: inherit;
	}

	button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.375rem 1.5rem;
		text-align: left;
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.4vw, 1.125rem);
		font-weight: 500;
		color: var(--ink);
		line-height: 1.4;
		transition: color var(--dur-fast) var(--ease-out);
	}

	button:hover {
		color: var(--brand);
	}

	.indicator {
		flex: none;
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		border: 1px solid var(--line-strong);
		color: var(--ink);
		transition:
			background var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out),
			border-color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out);
	}

	.open .indicator,
	button:hover .indicator {
		background: var(--brand);
		border-color: var(--brand);
		color: var(--on-brand);
		transform: rotate(90deg);
	}

	.panel {
		padding: 0 4.5rem 1.5rem 1.5rem;
	}

	.panel p {
		margin: 0;
		color: var(--ink-muted);
	}

	@media (max-width: 640px) {
		.panel {
			padding-right: 1.5rem;
		}
	}
</style>
