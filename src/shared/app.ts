import Fastify from "fastify";
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

import { parseEnvs } from "./config/envs.js";
import { connectDatabase } from "./database/connection.js";
import { registerRoutes } from "./routes/index.js";

export const app = Fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

export const parsedEnvs = parseEnvs();

connectDatabase();
registerRoutes();
