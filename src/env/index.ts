import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'] as const)
    .default('production'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid Env. Variables', _env.error.format())

  throw new Error('❌ Invalid Env. Variables')
}

export const env = _env.data
