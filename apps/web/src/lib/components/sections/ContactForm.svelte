<script lang="ts">
	import { tick, untrack } from 'svelte';
	import { postJson } from '$lib/api';
	import { t } from '$lib/i18n.svelte';
	import { contactSchema, fieldErrors, formCopy, ui, type Service } from '@makutano/shared';
	import Icon from '../ui/Icon.svelte';

	interface Props {
		services: Service[];
		preselect?: string;
		email: string;
	}

	let { services, preselect = '', email }: Props = $props();

	const empty = () => ({
		name: '',
		email: '',
		phone: '',
		service: '',
		message: '',
		/** Honeypot — hidden from real users. */
		website: ''
	});

	let form = $state(empty());

	// Apply `?service=…` once the prop resolves, without clobbering typing.
	$effect(() => {
		const selected = services.find((service) => service.title.en === preselect || service.slug === preselect);
		untrack(() => { if (selected && !form.service) form.service = selected.title.en; });
	});

	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
	let errors = $state<Record<string, string>>({});
	let formError = $state('');
	let formElement = $state<HTMLFormElement>();
	let successElement = $state<HTMLDivElement>();
	const copy = {
	 title: { en: 'Tell us about your project', sw: 'Tueleze kuhusu mradi wako' },
	 intro: { en: 'Share your idea, challenge, or goal. We’ll help you find the right next step.', sw: 'Shiriki wazo, changamoto au lengo lako. Tutakusaidia kupata hatua inayofaa.' },
	 required: { en: 'Fields marked * are required.', sw: 'Sehemu zenye * zinahitajika.' },
	 name: { en: 'Full name', sw: 'Jina kamili' },
	 email: { en: 'Email address', sw: 'Barua pepe' },
	 phone: { en: 'Phone number', sw: 'Namba ya simu' },
	 optional: { en: 'optional', sw: 'si lazima' },
	 service: { en: 'Service of interest', sw: 'Huduma unayohitaji' },
	 select: { en: 'Select a service', sw: 'Chagua huduma' },
	 message: { en: 'How can we help?', sw: 'Tunawezaje kusaidia?' },
	 hint: { en: 'Tell us what you’d like to achieve, your timeline, and any details that would help.', sw: 'Tueleze unachotaka kufanikisha, muda uliopanga na maelezo mengine muhimu.' },
	 sending: { en: 'Sending your message…', sw: 'Tunatuma ujumbe wako…' },
	 another: { en: 'Send another message', sw: 'Tuma ujumbe mwingine' },
	 successTitle: { en: 'Message received', sw: 'Ujumbe umepokelewa' },
	 failure: { en: 'Your message could not be sent. Please try again or email us directly.', sw: 'Ujumbe wako haujatumwa. Tafadhali jaribu tena au tutumie barua pepe moja kwa moja.' },
	 validation: { en: 'Please check the highlighted fields.', sw: 'Tafadhali kagua sehemu zilizoonyeshwa.' },
	 privacy: { en: 'We’ll use these details to respond to your enquiry.', sw: 'Tutatumia maelezo haya kujibu ombi lako.' }
	};
	const validationCopy: Record<string, {en: string; sw: string}> = {
	 name: {en: 'Enter your full name (2–120 characters).', sw: 'Weka jina lako kamili (herufi 2–120).'},
	 email: {en: 'Enter a valid email address.', sw: 'Weka anwani sahihi ya barua pepe.'},
	 phone: {en: 'Enter a valid phone number, or leave this blank.', sw: 'Weka namba sahihi ya simu, au acha wazi.'},
	 service: {en: 'Choose a service from the list.', sw: 'Chagua huduma kutoka kwenye orodha.'},
	 message: {en: 'Enter a message of up to 5,000 characters.', sw: 'Andika ujumbe usiozidi herufi 5,000.'}
	};
	const errorText = (field: string) => validationCopy[field] ? t(validationCopy[field]) : errors[field];
	async function focusError() {
	 await tick();
	 const target = formElement?.querySelector<HTMLElement>('[aria-invalid="true"]') ?? formElement?.querySelector<HTMLElement>('[role="alert"]');
	 target?.focus();
	}


	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'sending') return;

		errors = {};
		formError = '';
		const parsed = contactSchema.safeParse(form);
		if (!parsed.success) {
		 errors = fieldErrors(parsed.error);
		 status = 'error';
		 await focusError();
		 return;
		}
		status = 'sending';
		const result = await postJson<{ id: string }>('/contact', parsed.data);

		if (result.ok) {
			status = 'sent';
			form = empty();
			await tick();
			successElement?.focus();
			return;
		}

		status = 'error';
		errors = result.fieldErrors ?? {};
		// Keep the enquiry intact and provide a direct contact option on failure.
		formError = 'failed';
		await focusError();
	}

	async function reset() {
		status = 'idle';
		errors = {};
		formError = '';
		await tick();
		formElement?.querySelector<HTMLInputElement>('#c-name')?.focus();
	}
</script>

<div class="form-shell">
	{#if status === 'sent'}
		<div bind:this={successElement} class="success" role="status" tabindex="-1">
			<span class="tick"><Icon name="check" size={26} stroke={2.2} /></span>
			<h2>{t(copy.successTitle)}</h2>
			<p>{t(formCopy.success)}</p>
			<button type="button" class="btn btn--ghost btn--sm" onclick={reset}>
				<Icon name="arrow-left" size={15} />
				{t(copy.another)}
			</button>
		</div>
	{:else}
		<div class="form-intro"><h2>{t(copy.title)}</h2><p>{t(copy.intro)}</p><small>{t(copy.required)}</small></div>
		<form bind:this={formElement} onsubmit={submit} novalidate aria-busy={status === 'sending'}>
			{#if Object.keys(errors).length}<p class="form-error" role="alert" tabindex="-1">{t(copy.validation)}</p>{/if}
			{#if formError}
				<p class="form-error" role="alert" tabindex="-1">
					<Icon name="info" size={16} />
					{t(copy.failure)} <a href="mailto:{email}">{email}</a>
				</p>
			{/if}

			<div class="row">
				<div class="field" class:invalid={errors.name}>
					<label for="c-name">{t(copy.name)} <span aria-hidden="true">*</span></label>
					<input
						id="c-name"
						name="name"
						type="text"
						bind:value={form.name}
						disabled={status === 'sending'}
						oninput={() => { if (errors.name) { const next = {...errors}; delete next.name; errors = next; } }}
						placeholder={t({en: 'Your full name', sw: 'Jina lako kamili'})} maxlength="120" required
						autocomplete="name"
						aria-invalid={Boolean(errors.name)}
						aria-describedby={errors.name ? 'err-name' : undefined} />
					{#if errors.name}<span class="err" id="err-name">{errorText('name')}</span>{/if}
				</div>

				<div class="field" class:invalid={errors.email}>
					<label for="c-email">{t(copy.email)} <span aria-hidden="true">*</span></label>
					<input
						id="c-email"
						name="email"
						type="email"
						bind:value={form.email}
						disabled={status === 'sending'}
						oninput={() => { if (errors.email) { const next = {...errors}; delete next.email; errors = next; } }}
						placeholder="you@company.com" maxlength="200" required
						autocomplete="email"
						aria-invalid={Boolean(errors.email)}
						aria-describedby={errors.email ? 'err-email' : undefined} />
					{#if errors.email}<span class="err" id="err-email">{errorText('email')}</span>{/if}
				</div>
			</div>

			<div class="row">
				<div class="field" class:invalid={errors.phone}>
					<label for="c-phone">{t(copy.phone)} <span class="optional">({t(copy.optional)})</span></label>
					<input
						id="c-phone"
						name="phone"
						type="tel"
						bind:value={form.phone}
						disabled={status === 'sending'}
						oninput={() => { if (errors.phone) { const next = {...errors}; delete next.phone; errors = next; } }}
						placeholder="+255 …" maxlength="40"
						autocomplete="tel"
						aria-invalid={Boolean(errors.phone)}
						aria-describedby={errors.phone ? 'err-phone' : undefined} />
					{#if errors.phone}<span class="err" id="err-phone">{errorText('phone')}</span>{/if}
				</div>

				<div class="field" class:invalid={errors.service}>
					<label for="c-service">{t(copy.service)} <span class="optional">({t(copy.optional)})</span></label>
					<div class="select-wrap">
						<select id="c-service" name="service" bind:value={form.service} disabled={status === 'sending'} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'err-service' : undefined}>
							<option value="">{t(copy.select)}</option>
							{#each services as service (service.id)}
								<option value={service.title.en}>{t(service.title)}</option>
							{/each}
						</select>
						{#if errors.service}<span class="err" id="err-service">{errorText('service')}</span>{/if}
						<Icon name="arrow-down" size={16} />
					</div>
				</div>
			</div>

			<div class="field" class:invalid={errors.message}>
				<label for="c-message">{t(copy.message)} <span aria-hidden="true">*</span></label>
				<textarea
					id="c-message"
					name="message"
					rows="5"
					bind:value={form.message}
						disabled={status === 'sending'}
						oninput={() => { if (errors.message) { const next = {...errors}; delete next.message; errors = next; } }}
					placeholder={t(copy.hint)} required
					maxlength="5000"
					aria-invalid={Boolean(errors.message)}
					aria-describedby={errors.message ? 'err-message' : undefined}></textarea>
				{#if errors.message}<span class="err" id="err-message">{errorText('message')}</span>{/if}
			</div>

			<!-- Honeypot: off-screen and skipped by keyboard and screen readers. -->
			<div class="hp" aria-hidden="true">
				<label for="c-website">Leave this field empty</label>
				<input id="c-website" name="website" type="text" tabindex="-1" bind:value={form.website} />
			</div>

			<p class="privacy"><Icon name="shield" size={15} />{t(copy.privacy)}</p>
			<button class="btn submit" type="submit" disabled={status === 'sending'}>
				{status === 'sending' ? t(copy.sending) : t(ui.sendMessage)}
				<Icon name="arrow-up-right" size={16} class="btn-arrow" />
			</button>
		</form>
	{/if}
</div>

<style>
	.form-shell {
		padding: clamp(1.25rem, 3.5vw, 2.5rem);
		background: var(--bg-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.125rem;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.125rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-intro { margin-bottom: 1.75rem; }
	.form-intro h2 { font-size: clamp(1.5rem, 2.4vw, 1.9rem); margin-bottom: .6rem; }
	.form-intro small { display: block; margin-top: .85rem; color: var(--ink-subtle); font-size: .8rem; }
	.field { min-width: 0; }
	.field label { font-size: .85rem; font-weight: 500; color: var(--ink); }
	.field label > span:not(.optional) { color: var(--brand-ink); }
	.optional { color: var(--ink-subtle); font-size: .75rem; font-weight: 400; }
	.privacy { display: flex; align-items: flex-start; gap: .5rem; font-size: .8rem; }
	.privacy :global(svg) { flex: none; margin-top: .25rem; color: var(--brand-ink); }
	.form-error { flex-wrap: wrap; }
	.form-error a { text-decoration: underline; overflow-wrap: anywhere; }
	.success h2 { font-size: 1.7rem; }
	input:disabled, textarea:disabled, select:disabled { opacity: .7; cursor: wait; }

	input,
	textarea,
	select {
		width: 100%;
		padding: 0.95rem 1.1rem;
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		color: var(--ink);
		font-size: 1rem;
		outline: none;
		transition:
			border-color var(--dur) var(--ease-out),
			background var(--dur) var(--ease-out);
	}

	textarea {
		resize: vertical;
		min-height: 8rem;
		line-height: 1.6;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--ink-subtle);
	}

	input:focus,
	textarea:focus,
	select:focus {
		border-color: var(--brand);
		background: var(--bg-raised-2);
		box-shadow: 0 0 0 3px var(--brand-soft);
	}

	.invalid input,
	.invalid textarea,
	.invalid select {
		border-color: var(--error);
	}

	.select-wrap {
		position: relative;
	}

	.select-wrap select {
		appearance: none;
		padding-right: 2.75rem;
		cursor: pointer;
	}

	.select-wrap :global(svg) {
		position: absolute;
		right: 1rem;
		top: 50%;
		translate: 0 -50%;
		color: var(--ink-subtle);
		pointer-events: none;
	}

	.err {
		font-size: 0.8125rem;
		color: var(--error);
	}

	.form-error {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin: 0;
		padding: 0.85rem 1.1rem;
		border: 1px solid rgba(var(--error-rgb), 0.4);
		border-radius: var(--radius);
		background: rgba(var(--error-rgb), 0.1);
		color: var(--error);
		font-size: 0.875rem;
	}

	.hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.submit {
		align-self: flex-start;
		margin-top: 0.25rem;
	}

	.submit:disabled {
		opacity: 0.6;
		cursor: wait;
	}

	/* success ------------------------------------------------------------ */

	.success {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		text-align: center;
		padding-block: clamp(2rem, 5vw, 3.5rem);
		animation: pop 500ms var(--ease-out);
	}

	.tick {
		display: grid;
		place-items: center;
		width: 68px;
		height: 68px;
		border-radius: 50%;
		background: var(--brand);
		color: var(--on-brand);
		animation: tick-in 600ms var(--ease-out) both;
	}

	.success p {
		margin: 0;
		font-size: 1.0625rem;
		color: var(--ink);
		max-width: 34ch;
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
	}

	@keyframes tick-in {
		from {
			transform: scale(0.4) rotate(-25deg);
			opacity: 0;
		}
	}

	@media (max-width: 640px) {
		.row {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.success,
		.tick {
			animation: none;
		}
	}
</style>
