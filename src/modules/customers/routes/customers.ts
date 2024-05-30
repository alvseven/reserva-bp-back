import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { MongooseCustomersRepository } from "../repositories/customers.js";

import { createCustomerRequestSchema } from "../dtos/create-customer/create-customer-request.dto.js";
import { createCustomerResponseSchema } from "../dtos/create-customer/create-customer-response.dto.js";
import { deleteCustomerRequestSchema } from "../dtos/delete-customer/delete-customer-request.dto.js";
import { getCustomerRequestSchema } from "../dtos/get-customer/get-customer-request.dto.js";
import { updateCustomerRequestSchema } from "../dtos/update-customer/update-customer-request.dto.js";

import { createCustomerUseCase } from "../use-cases/create-customer.js";
import { deleteCustomerUseCase } from "../use-cases/delete-customer.js";
import { getCustomerUseCase } from "../use-cases/get-customer.js";
import { updateCustomerUseCase } from "../use-cases/update-customer.js";

export async function customersRoutes(fastify: FastifyInstance) {
	const costumersRepository = new MongooseCustomersRepository();

	fastify.withTypeProvider<ZodTypeProvider>().post(
		"/",
		{
			schema: {
				body: createCustomerRequestSchema,
				response: {
					"201": createCustomerResponseSchema,
				},
			},
		},
		async (req, reply) => {
			const createdCustomer = await createCustomerUseCase(
				req.body,
				costumersRepository,
			);

			return reply.status(201).send(createdCustomer);
		},
	);

	fastify.withTypeProvider<ZodTypeProvider>().get(
		"/:id",
		{
			schema: {
				params: getCustomerRequestSchema,
			},
		},
		async (req, reply) => {
			const user = await getCustomerUseCase(req.params.id, costumersRepository);

			return reply.send(user);
		},
	);

	fastify.withTypeProvider<ZodTypeProvider>().patch(
		"/:id",
		{
			schema: {
				body: updateCustomerRequestSchema,
			},
		},
		async (req, reply) => {
			await updateCustomerUseCase(req.body, costumersRepository);

			return reply.status(204).send();
		},
	);

	fastify.withTypeProvider<ZodTypeProvider>().delete(
		"/:id",
		{
			schema: {
				params: deleteCustomerRequestSchema,
			},
		},
		async (req, reply) => {
			await deleteCustomerUseCase(req.params.id, costumersRepository);

			return reply.status(204).send();
		},
	);
}
