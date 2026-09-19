import { browser } from '$app/environment';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'makutano-theme';
const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

class ThemeStore {
	current = $state<Theme>('dark');
	private preference: Theme | null = null;

	init() {
		if (!browser) return;
		const system = window.matchMedia('(prefers-color-scheme: dark)');
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			this.preference = isTheme(saved) ? saved : null;
		} catch { /* Storage can be unavailable in private browsing. */ }
		const sync = () => this.apply(this.preference ?? (system.matches ? 'dark' : 'light'));
		const onStorage = (event: StorageEvent) => {
			if (event.key !== STORAGE_KEY && event.key !== null) return;
			this.preference = isTheme(event.newValue) ? event.newValue : null;
			sync();
		};
		sync();
		system.addEventListener('change', sync);
		window.addEventListener('storage', onStorage);
		return () => {
			system.removeEventListener('change', sync);
			window.removeEventListener('storage', onStorage);
		};
	}

	toggle() {
		if (!browser) return;
		this.preference = this.current === 'dark' ? 'light' : 'dark';
		this.apply(this.preference);
		try { localStorage.setItem(STORAGE_KEY, this.preference); } catch { /* Keep the choice for this visit. */ }
	}

	private apply(value: Theme) {
		this.current = value;
		document.documentElement.dataset.theme = value;
		document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'light' ? '#ffffff' : '#0b1522');
	}
}

export const theme = new ThemeStore();
