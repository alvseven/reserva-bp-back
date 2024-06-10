import { app } from "../app.js";

import { customersRoutes } from "@/modules/customers/routes/customers.js";
import { insuranceBrokersRoutes } from "@/modules/insurance-brokers/routes/insurance-brokers.js";

export function registerRoutes() {
  app
    .register(insuranceBrokersRoutes, { prefix: "/insurance-brokers" })
    .register(customersRoutes, { prefix: "/customers" });
}
