<script lang="ts">
	import { reveal, splitText } from '$actions';

	interface Props {
		eyebrow?: string;
		title: string;
		lead?: string;
		align?: 'left' | 'center';
		/** Renders a lighter, wider variant used on dark hero-adjacent bands. */
		width?: 'default' | 'narrow';
	}

	let { eyebrow, title, lead, align = 'left', width = 'default' }: Props = $props();
</script>

<header class="sec-head" class:center={align === 'center'} class:narrow={width === 'narrow'}>
	{#if eyebrow}
		<span class="eyebrow" use:reveal={{ type: 'up', duration: 600 }}>{eyebrow}</span>
	{/if}
	<h2 use:splitText={{ by: 'line', stagger: 80 }}>{title}</h2>
	{#if lead}
		<p class="lead" use:reveal={{ type: 'up', delay: 180 }}>{lead}</p>
	{/if}
</header>

<style>
	.sec-head {
		display: flex;
		flex-direction: column;
		gap: 1.125rem;
		max-width: 46rem;
	}

	.sec-head.center {
		align-items: center;
		text-align: center;
		margin-inline: auto;
	}

	.sec-head.narrow {
		max-width: 36rem;
	}

	h2 {
		font-size: var(--fs-h2);
	}
</style>
