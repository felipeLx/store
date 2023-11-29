import { z } from 'zod'

const schema = z.object({
	NODE_ENV: z.enum(['production', 'development', 'test'] as const),
	SANITY_PROJECT_ID: z.string(),
	SANITY_DATASET: z.string(),
	SANITY_API_VERSION: z.string(),
	SANITY_READ_TOKEN: z.string(),
	SANITY_WRITE_TOKEN: z.string(),
	STRIPE_WEBHOOK_SECRET: z.string(),
	STRIPE_API_KEY: z.string(),
	STRIPE_PUBLIC_KEY: z.string(),
	CLOUDINARY_NAME: z.string(),
	CLOUDINARY_KEY: z.string(),
	CLOUDINARY_SECRET: z.string(),
	SESSION_SECRET: z.string(),
	SUPABASE_URL: z.string(),
	SUPABASE_ANON_KEY: z.string(),
	// DATABASE_PATH: z.string(),
	// DATABASE_URL: z.string(),
	// SESSION_SECRET: z.string(),
	// INTERNAL_COMMAND_TOKEN: z.string(),
	// HONEYPOT_SECRET: z.string(),
	// CACHE_DATABASE_PATH: z.string(),
	// If you plan on using Sentry, uncomment this line
	// SENTRY_DSN: z.string(),
	// If you plan to use Resend, uncomment this line
	// RESEND_API_KEY: z.string(),
	// If you plan to use GitHub auth, remove the default:
	// GITHUB_CLIENT_ID: z.string().default('MOCK_GITHUB_CLIENT_ID'),
	// GITHUB_CLIENT_SECRET: z.string().default('MOCK_GITHUB_CLIENT_SECRET'),
	// GITHUB_TOKEN: z.string().default('MOCK_GITHUB_TOKEN'),
})

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof schema> {}
	}
}

export function init() {
	const parsed = schema.safeParse(process.env)

	if (parsed.success === false) {
		console.error(
			'❌ Invalid environment variables:',
			parsed.error.flatten().fieldErrors,
		)

		throw new Error('Invalid environment variables')
	}
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
	return {
		MODE: process.env.NODE_ENV,
		SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
		SANITY_DATASET: process.env.SANITY_DATASET,
		SANITY_API_VERSION: process.env.SANITY_API_VERSION,
		SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
		SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		STRIPE_API_KEY: process.env.STRIPE_API_KEY,
		STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
		CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
		CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
		CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
		SESSION_SECRET: process.env.SESSION_SECRET,
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
	}
}

type ENV = ReturnType<typeof getEnv>

declare global {
	var ENV: ENV
	interface Window {
		// @ts-ignore
		ENV: ENV
	}
}
