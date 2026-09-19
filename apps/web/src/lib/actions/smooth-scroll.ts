import { browser, dev } from '$app/environment';
import Lenis from 'lenis';
import { prefersReducedMotion } from './motion.js';

let lenis: Lenis | null = null;
let raf = 0;

/**
 * Starts momentum-smoothed scrolling for the whole document.
 * Skipped entirely under `prefers-reduced-motion`, where native scrolling is
 * both expected and safer.
 */
export function startSmoothScroll() {
	if (!browser || lenis || prefersReducedMotion()) return null;

	lenis = new Lenis({
		duration: 1.05,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		touchMultiplier: 1.6
	});

	const loop = (time: number) => {
		lenis?.raf(time);
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);

	// Handle for debugging and automated checks; dev builds only.
	if (dev) (window as unknown as { lenis?: Lenis }).lenis = lenis;

	return lenis;
}

export function stopSmoothScroll() {
	cancelAnimationFrame(raf);
	lenis?.destroy();
	lenis = null;
}

/** Jumps to the top without the momentum easing — used on navigation. */
export function scrollToTop(immediate = true) {
	if (lenis) lenis.scrollTo(0, { immediate });
	else if (browser) window.scrollTo({ top: 0, behavior: immediate || prefersReducedMotion() ? 'instant' : 'smooth' });
}

/** Scrolls to an element or selector, accounting for the fixed header. */
export function scrollTo(target: string | HTMLElement, offset = -90) {
	if (lenis) lenis.scrollTo(target, { offset, duration: 1.1 });
	else if (browser) {
		const el = typeof target === 'string' ? document.querySelector(target) : target;
		el?.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' });
	}
}
