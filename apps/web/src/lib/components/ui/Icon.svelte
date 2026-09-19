<script lang="ts">
	/** Inline SVG icon set — no icon font, no extra request. */
	interface Props {
		name: string;
		size?: number | string;
		stroke?: number;
		class?: string;
	}

	let { name, size = 20, stroke = 1.6, class: className = '' }: Props = $props();

	const paths: Record<string, string> = {
		mobile:
			'<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
		building:
			'<path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 21V10h3a2 2 0 0 1 2 2v9"/><path d="M8 7h3M8 11h3M8 15h3"/>',
		coin: '<ellipse cx="12" cy="7" rx="7.5" ry="3.5"/><path d="M4.5 7v10c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5V7"/><path d="M4.5 12c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5"/>',
		info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.01"/>',
		handshake:
			'<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2l-.5-.5a1.4 1.4 0 0 0 2-2l-4-4-2 1.5a2 2 0 0 1-2.4 0L6 9.5 3 12.5"/><path d="m14 7 3-2 4 4-2.5 2.5M3 12.5 7 8.5"/>',
		shield: '<path d="M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6l-7-3Z"/>',
		'check-badge':
			'<path d="m12 2.8 2.2 1.7 2.8-.2.9 2.6 2.3 1.5-.9 2.6.9 2.6-2.3 1.5-.9 2.6-2.8-.2L12 21.2l-2.2-1.7-2.8.2-.9-2.6L3.8 15.6l.9-2.6-.9-2.6 2.3-1.5.9-2.6 2.8.2L12 2.8Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
		award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.8-1.3 7.2 4.8-2.6 4.8 2.6-1.3-7.2"/>',
		users:
			'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.5 3.5 0 0 1 0 5.6M18 20a6.5 6.5 0 0 0-2.3-5"/>',
		globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
		languages:
			'<path d="M3 6h9M7.5 4v2c0 3.5-2 6.5-4.5 8M6 10c1 2.5 3 4.5 5.5 5.5"/><path d="m13 20 3.8-9 3.7 9M14.5 17h5"/>',
		'arrow-up-right': '<path d="M7 17 17 7M9 7h8v8"/>',
		'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
		'arrow-left': '<path d="M19 12H5M11 18l-6-6 6-6"/>',
		'arrow-down': '<path d="M12 5v14M18 13l-6 6-6-6"/>',
		plus: '<path d="M12 5v14M5 12h14"/>',
		minus: '<path d="M5 12h14"/>',
		check: '<path d="m20 6-11 11-5-5"/>',
		menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
		close: '<path d="M18 6 6 18M6 6l12 12"/>',
		mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>',
		phone:
			'<path d="M21 16.9v2.6a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-5.9-5.9 19.5 19.5 0 0 1-3-8.6A2 2 0 0 1 3.4 2H6a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.8a16 16 0 0 0 5.9 5.9l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 21 16.9Z"/>',
		pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
		clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
		spark:
			'<path d="M12 2.5 14.4 9 21 11.5 14.4 14 12 20.5 9.6 14 3 11.5 9.6 9 12 2.5Z"/>',
		code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>',
		target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
		megaphone:
			'<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1Z"/><path d="M17 8a5 5 0 0 1 0 8"/>',
		chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
		layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
		quote:
			'<path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3M19 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3"/>',
		star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2-5.4-2.9-5.4 2.9 1-6.2L3.2 9.5l6.1-.9L12 3Z"/>',
		play: '<path d="M7 4.5v15l13-7.5-13-7.5Z"/>',
		search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
		instagram:
			'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>',
		linkedin:
			'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.5v.01M12 17v-3.6a2 2 0 0 1 4 0V17"/>',
		x: '<path d="M4 4l16 16M20 4 4 20"/>',
		youtube:
			'<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z"/>',
		github:
			'<path d="M9 19c-4 1.3-4-2.2-6-2.7m12 5.2v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.5 3.1 5.5 3.4 5.5 3.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.8c0 4.7 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21"/>',
		whatsapp:
			'<path d="M3 21l1.7-5A8.3 8.3 0 1 1 8 19.3L3 21Z"/><path d="M8.6 9.2c.2 1.9 2.2 4 4.2 4.3l1.1-1.2 1.9.9v1.5c-3 .6-6.6-2.7-6.9-6.1l1.5-.2.9 1.9-1.1 1.1" stroke-width="1.2"/>'
	};
</script>

<svg
	class={className}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html paths[name] ?? paths['arrow-right']}
</svg>

<style>
	svg {
		flex: none;
	}
</style>
