import { browser } from '$app/environment';

/**
 * Animation primitives used across the site.
 *
 * Everything here is a Svelte action: it runs only on the client, cleans up
 * after itself, and degrades to "content visible, nothing moves" when the
 * visitor has asked for reduced motion.
 */

export const prefersReducedMotion = () =>
	browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ reveal */

export interface RevealOptions {
	/** Direction of travel. Matches the `[data-reveal]` CSS states. */
	type?: 'up' | 'fade' | 'left' | 'right' | 'scale' | 'clip';
	/** Delay before this element animates, in ms. */
	delay?: number;
	/** Duration override, in ms. */
	duration?: number;
	/** Fraction of the element that must be visible before firing. */
	threshold?: number;
	/** Stagger children by this many ms instead of animating the element itself. */
	stagger?: number;
	/** Selector for the children to stagger. Defaults to direct children. */
	childSelector?: string;
	/** Replay the animation every time the element re-enters the viewport. */
	repeat?: boolean;
}

/**
 * Reveals an element (or staggers its children) when it scrolls into view.
 * Uses IntersectionObserver rather than GSAP — it is cheap and there are a lot
 * of these on a page.
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	if (!browser) return;

	let opts = { type: 'up', delay: 0, duration: 550, threshold: 0, ...options } as Required<
		Pick<RevealOptions, 'type' | 'delay' | 'duration' | 'threshold'>
	> &
		RevealOptions;

	const targets = (): HTMLElement[] =>
		opts.stagger
			? Array.from(
					node.querySelectorAll<HTMLElement>(opts.childSelector ?? ':scope > *')
				)
			: [node];

	function prime() {
		for (const el of targets()) {
			el.setAttribute('data-reveal', opts.type);
			el.style.transitionProperty = 'opacity, transform, clip-path';
			el.style.transitionTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)';
			el.style.transitionDuration = `${opts.duration}ms`;
		}
	}

	function show() {
		targets().forEach((el, i) => {
			el.style.transitionDelay = `${Math.min(opts.delay + i * (opts.stagger ?? 0), 400)}ms`;
			el.classList.add('is-revealed');
		});
	}

	function hide() {
		for (const el of targets()) el.classList.remove('is-revealed');
	}

	if (prefersReducedMotion()) {
		show();
		return;
	}

	prime();

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					show();
					if (!opts.repeat) observer.unobserve(entry.target);
				} else if (opts.repeat) {
					hide();
				}
			}
		},
		{ threshold: opts.threshold, rootMargin: '0px 0px -8% 0px' }
	);

	for (const target of targets()) observer.observe(target);

	return {
		update(next: RevealOptions) {
			opts = { ...opts, ...next };
		},
		destroy() {
			observer.disconnect();
		}
	};
}

/* --------------------------------------------------------------- splitText */

export interface SplitTextOptions {
	/** Split into lines (default) or individual words. */
	by?: 'line' | 'word' | 'char';
	delay?: number;
	stagger?: number;
	duration?: number;
}

/**
 * Masked line-by-line heading reveal — the signature move of the reference
 * templates. Words are wrapped, measured to detect where the browser broke the
 * lines, then each line slides up out of its own overflow mask.
 */
/** Animate the heading as a unit without replacing Svelte-owned text nodes.
 * This preserves translation updates, accessible text and natural line wrapping. */
export function splitText(node: HTMLElement, options: SplitTextOptions = {}) {
 return reveal(node, { type: 'up', delay: options.delay ?? 0, duration: options.duration ?? 550 });
}

/* ----------------------------------------------------------------- counter */

export interface CounterOptions {
	value: number;
	duration?: number;
	decimals?: number;
	suffix?: string;
	prefix?: string;
}

/** Counts a number up when it scrolls into view. */
export function counter(node: HTMLElement, options: CounterOptions) {
	if (!browser) return;

	const { value, duration = 1800, decimals = 0, suffix = '', prefix = '' } = options;
	const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

	if (prefersReducedMotion()) {
		node.textContent = format(value);
		return;
	}

	node.textContent = format(0);
	let frame = 0;

	function run() {
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min((now - start) / duration, 1);
			// easeOutExpo — fast start, long settle.
			const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
			node.textContent = format(value * eased);
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
	}

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				run();
				observer.disconnect();
			}
		},
		{ threshold: 0.5 }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
			cancelAnimationFrame(frame);
		}
	};
}

/* ---------------------------------------------------------------- magnetic */

/** Pulls an element gently toward the cursor while hovering it. */
export function magnetic(node: HTMLElement, strength = 0.35) {
	if (!browser || prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

	let raf = 0;
	let tx = 0;
	let ty = 0;
	let cx = 0;
	let cy = 0;

	const loop = () => {
		cx += (tx - cx) * 0.15;
		cy += (ty - cy) * 0.15;
		node.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
		if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
			raf = requestAnimationFrame(loop);
		} else {
			raf = 0;
		}
	};

	const start = () => {
		if (!raf) raf = requestAnimationFrame(loop);
	};

	const onMove = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		tx = (e.clientX - (r.left + r.width / 2)) * strength;
		ty = (e.clientY - (r.top + r.height / 2)) * strength;
		start();
	};

	const onLeave = () => {
		tx = 0;
		ty = 0;
		start();
	};

	node.addEventListener('pointermove', onMove);
	node.addEventListener('pointerleave', onLeave);

	return {
		destroy() {
			node.removeEventListener('pointermove', onMove);
			node.removeEventListener('pointerleave', onLeave);
			cancelAnimationFrame(raf);
		}
	};
}

/* -------------------------------------------------------------------- tilt */

/** Subtle 3D tilt toward the cursor. */
export function tilt(node: HTMLElement, max = 7) {
	if (!browser || prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

	node.style.transformStyle = 'preserve-3d';
	node.style.transition = 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)';

	const onMove = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - 0.5;
		const py = (e.clientY - r.top) / r.height - 0.5;
		node.style.transition = 'transform 120ms linear';
		node.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
	};

	const onLeave = () => {
		node.style.transition = 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)';
		node.style.transform = '';
	};

	node.addEventListener('pointermove', onMove);
	node.addEventListener('pointerleave', onLeave);

	return {
		destroy() {
			node.removeEventListener('pointermove', onMove);
			node.removeEventListener('pointerleave', onLeave);
		}
	};
}

/* ---------------------------------------------------------------- parallax */

/** Translates an element against the scroll direction. `speed` is a ratio. */
export function parallax(node: HTMLElement, speed = 0.15) {
	if (!browser || prefersReducedMotion()) return;

	let raf = 0;
	let visible = false;

	const update = () => {
		const r = node.getBoundingClientRect();
		const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
		node.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}px, 0)`;
		raf = 0;
	};

	const onScroll = () => {
		if (visible && !raf) raf = requestAnimationFrame(update);
	};

	const observer = new IntersectionObserver((entries) => {
		visible = entries[0].isIntersecting;
		if (visible) onScroll();
	});
	observer.observe(node);

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	update();

	return {
		destroy() {
			observer.disconnect();
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			cancelAnimationFrame(raf);
		}
	};
}
