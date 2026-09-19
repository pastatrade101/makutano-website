import { z } from 'zod';

/** Payload validation shared by the API routes and the enquiry form. */

/** Validation messages are English-only on the live site. */
export const contactSchema = z.object({
	name: z.string().trim().min(2, 'Please enter your full name.').max(120),
	email: z.string().trim().email('Please enter a valid email address.').max(200),
	phone: z
		.string()
		.trim()
		.max(40)
		.regex(/^[0-9+()\-\s]*$/, 'Please enter a valid phone number.')
		.optional()
		.or(z.literal(''))
		.transform((v) => (v ? v : undefined)),
	service: z
		.string()
		.trim()
		.max(120)
		.optional()
		.or(z.literal(''))
		.transform((v) => (v ? v : undefined)),
	message: z
		.string()
		.trim()
		.min(1, 'Please enter a message (up to 5000 characters).')
		.max(5000, 'Please enter a message (up to 5000 characters).'),
	/**
	 * Honeypot — real users never see this field. Deliberately permissive so a
	 * bot that fills it still passes validation; the route then absorbs the
	 * submission silently rather than telling the bot which field gave it away.
	 */
	website: z.string().max(200).optional()
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;

/** Flattens a ZodError into `{ field: message }` for form rendering. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
	const out: Record<string, string> = {};
	for (const issue of error.issues) {
		const key = issue.path.join('.') || '_';
		if (!out[key]) out[key] = issue.message;
	}
	return out;
}

/** Copy the form itself renders. */
export const formCopy = {
	placeholders: {
		name: 'Full name / Jina kamili *',
		email: 'Email / Barua pepe *',
		phone: 'Phone / Simu',
		message: 'How can we help? / Tunawezaje kusaidia? *'
	},
	success: {
		en: "Thanks — your message has been sent. We'll get back to you shortly.",
		sw: 'Asante — ujumbe wako umetumwa. Tutawasiliana nawe hivi karibuni.'
	},
	failure: 'Sorry, something went wrong sending your message. Please email us directly.'
} as const;
