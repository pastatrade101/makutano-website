import { browser } from '$app/environment';
import { t as translate, type Lang, type Localized } from '@makutano/shared';

const STORAGE_KEY = 'makutano-lang';

/**
 * Site language. The site is bilingual EN / SW: every localized string is a
 * pair, and this store decides which half renders.
 *
 * The choice persists in localStorage and is mirrored onto `<html lang>` so
 * screen readers and search engines see the right language.
 */
class LanguageStore {
	current = $state<Lang>('en');

	init() {
		if (!browser) return;
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored === 'en' || stored === 'sw') this.current = stored;
		} catch {
			// Private mode or blocked storage — English is a fine default.
		}
		this.sync();
	}

	set(lang: Lang) {
		this.current = lang;
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, lang);
		} catch {
			// Ignore: the toggle still works for this page view.
		}
		this.sync();
	}

	toggle() {
		this.set(this.current === 'en' ? 'sw' : 'en');
	}

	private sync() {
		if (browser) document.documentElement.lang = this.current;
	}
}

export const lang = new LanguageStore();

/** Resolves a bilingual string against the active language. */
export function t(value: Localized | undefined): string {
	return translate(value, lang.current);
}
