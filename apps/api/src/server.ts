import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import Fastify, { type FastifyError } from 'fastify';
import { env } from './lib/env.js';
import { repository } from './lib/repository.js';
import { contentRoutes } from './routes/content.js';
import { formRoutes } from './routes/forms.js';

export function buildServer() {
	const app = Fastify({
		logger: env.isProd
			? true
			: { transport: undefined, level: 'info' },
		trustProxy: true
	});

	app.register(helmet, { contentSecurityPolicy: false });

	app.register(cors, {
		origin: (origin, cb) => {
			// Same-origin/server-to-server requests arrive without an Origin header.
			if (!origin) return cb(null, true);
			cb(null, env.corsOrigins.includes(origin));
		},
		methods: ['GET', 'POST', 'OPTIONS'],
		credentials: true
	});

	app.register(rateLimit, { max: 120, timeWindow: '1 minute' });

	app.get('/health', async () => ({
		ok: true,
		data: {
			status: 'up',
			env: env.nodeEnv,
			storage: repository.usingSupabase ? 'supabase' : 'fallback-seed',
			time: new Date().toISOString()
		}
	}));

	app.register(
		async (api) => {
			await contentRoutes(api);
			await formRoutes(api);
		},
		{ prefix: '/api/v1' }
	);

	app.setNotFoundHandler((req, reply) => {
		reply.code(404).send({
			ok: false,
			error: { error: 'not_found', message: `No route for ${req.method} ${req.url}` }
		});
	});

	app.setErrorHandler((err: FastifyError, req, reply) => {
		req.log.error(err);
		const status = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
		reply.code(status).send({
			ok: false,
			error: {
				error: status === 429 ? 'rate_limited' : 'server_error',
				message: status === 500 && env.isProd ? 'Something went wrong' : err.message
			}
		});
	});

	return app;
}

const app = buildServer();

app
	.listen({ port: env.port, host: env.host })
	.then(() => {
		app.log.info(
			`Makutano API on http://localhost:${env.port} — storage: ${
				repository.usingSupabase ? 'supabase' : 'fallback seed content'
			}`
		);
		if (!repository.usingSupabase) {
			app.log.warn(
				'SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set. Serving seed content; form submissions are kept in memory only.'
			);
		}
	})
	.catch((err) => {
		app.log.error(err);
		process.exit(1);
	});
