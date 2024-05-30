import { app } from "@/shared/app.js";

import { customersRoutes } from "@/modules/customers/routes/customers.js";
import { insuranceBrokersRoutes } from "@/modules/insurance-brokers/routes/insurance-brokers.js";

export function registerRoutes() {
	app
		.get("/hello-world", (_req, reply) => {
			return reply.send({
				success: true,
			});
		})
		.register(insuranceBrokersRoutes, { prefix: "/insurance-brokers" })
		.register(customersRoutes, { prefix: "/customers" });
}
