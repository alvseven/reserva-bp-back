import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(['test', 'development', 'production']),
    API_PORT: z.coerce.number().positive().default(3333),
    API_HOST: z.string(),
    API_URL: z.string(),
    MONGO_URI: z.string(),
    MONGO_TEST_URI: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES: z.string()
})

export function parseEnvs() {
    return envSchema.parse(process.env)
}