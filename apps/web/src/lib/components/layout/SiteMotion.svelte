<script lang="ts">
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	type ViewTransitionDocument = Document & {
		startViewTransition?: (callback: () => Promise<void> | void) => { finished: Promise<void> };
	};

	let ambient: HTMLDivElement;
	let cleanupPage = () => {};

	function preparePage() {
		cleanupPage();
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const selectors = [
			'main section:not(:first-child) > .container > .section-heading',
			'main section:not(:first-child) > .container > .section-intro',
			'main .service-grid > article',
			'main .partner-grid > article',
			'main .process-grid > li',
			'main .feature-grid > .feature',
			'main .proof-cards > a',
			'main .items > li',
			'main .closing-panel'
		];

		const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(',')))
			.filter((element) => !element.hasAttribute('data-reveal'));

		elements.forEach((element, index) => {
			element.dataset.motionReveal = '';
			element.style.setProperty('--motion-delay', `${Math.min(index % 4, 3) * 55}ms`);
		});

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					(entry.target as HTMLElement).classList.add('motion-in');
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.08, rootMargin: '0px 0px -7% 0px' }
		);

		elements.forEach((element) => observer.observe(element));
		cleanupPage = () => observer.disconnect();
	}

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (reduced.matches) return;

		document.documentElement.classList.add('motion-enabled');
		let frame = 0;
		let targetX = window.innerWidth * 0.75;
		let targetY = window.innerHeight * 0.25;
		let currentX = targetX;
		let currentY = targetY;

		const render = () => {
			currentX += (targetX - currentX) * 0.055;
			currentY += (targetY - currentY) * 0.055;
			ambient?.style.setProperty('--ambient-x', `${currentX}px`);
			ambient?.style.setProperty('--ambient-y', `${currentY}px`);
			frame = requestAnimationFrame(render);
		};

		const onPointer = (event: PointerEvent) => {
			targetX = event.clientX;
			targetY = event.clientY;
		};

		window.addEventListener('pointermove', onPointer, { passive: true });
		frame = requestAnimationFrame(render);
		preparePage();

		return () => {
			document.documentElement.classList.remove('motion-enabled');
			window.removeEventListener('pointermove', onPointer);
			cancelAnimationFrame(frame);
			cleanupPage();
		};
	});

	afterNavigate(() => requestAnimationFrame(preparePage));

	onNavigate((navigation) => {
		const doc = document as ViewTransitionDocument;
		if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise<void>((resolve) => {
			doc.startViewTransition?.(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div bind:this={ambient} class="ambient" aria-hidden="true">
	<span class="ambient-orb ambient-orb--pointer"></span>
	<span class="ambient-orb ambient-orb--drift"></span>
</div>

<style>
	.ambient { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; --ambient-x: 75vw; --ambient-y: 25vh; }
	.ambient-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .07; will-change: transform; }
	.ambient-orb--pointer { width: 30rem; height: 30rem; left: 0; top: 0; background: var(--brand); transform: translate3d(calc(var(--ambient-x) - 50%), calc(var(--ambient-y) - 50%), 0); }
	.ambient-orb--drift { width: 24rem; height: 24rem; right: -8rem; bottom: 8%; background: var(--primary-light); animation: ambient-drift 16s ease-in-out infinite alternate; }
	@keyframes ambient-drift { from { transform: translate3d(0, 0, 0) scale(.9); } to { transform: translate3d(-8vw, -5vh, 0) scale(1.12); } }
	@media (max-width: 700px), (pointer: coarse) { .ambient-orb--pointer { display: none; } .ambient-orb--drift { opacity: .045; } }
	@media (prefers-reduced-motion: reduce) { .ambient { display: none; } }
</style>
