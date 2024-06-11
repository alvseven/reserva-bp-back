import cors from "@fastify/cors";
import { app } from "../app.js";

import { customersRoutes } from "@/modules/customers/routes/customers.js";
import { insuranceBrokersRoutes } from "@/modules/insurance-brokers/routes/insurance-brokers.js";

export async function registerRoutes() {
	await app
		.register(cors, {
			origin: "*",
			methods: "*",
		})
		.register(insuranceBrokersRoutes, { prefix: "/insurance-brokers" })
		.register(customersRoutes, { prefix: "/customers" });
}
