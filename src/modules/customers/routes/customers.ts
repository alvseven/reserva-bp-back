import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { MongooseCustomersRepository } from "../repositories/customers.js";

import { createCustomerRequestSchema } from "../dtos/create-customer/create-customer-request.dto.js";
import { deleteCustomerRequestSchema } from "../dtos/delete-customer/delete-customer-request.dto.js";
import { getCustomerRequestSchema } from "../dtos/get-customer/get-customer-request.dto.js";
import { updateCustomerRequestSchema } from "../dtos/update-customer/update-customer-request.dto.js";

import { loginRequestSchema } from "../dtos/login/login-request.dto.js";
import { createCustomerUseCase } from "../use-cases/create-customer.js";
import { deleteCustomerUseCase } from "../use-cases/delete-customer.js";
import { getCustomerUseCase } from "../use-cases/get-customer.js";
import { loginUseCase } from "../use-cases/login.js";
import { updateCustomerUseCase } from "../use-cases/update-customer.js";

export async function customersRoutes(fastify: FastifyInstance) {
	const customersRepository = new MongooseCustomersRepository();

	fastify.withTypeProvider<ZodTypeProvider>().post(
		"/",
		{
			schema: {
				body: createCustomerRequestSchema,
			},
		},
		async (req, reply) => {
			const createdCustomer = await createCustomerUseCase(
				req.body,
				customersRepository,
			);

			return reply.status(201).send(createdCustomer);
		},
	);

	fastify.withTypeProvider<ZodTypeProvider>().post(
		"/login",
		{
			schema: {
				body: loginRequestSchema,
			},
		},
		async (req, reply) => {
			const customerLogged = await loginUseCase(req.body, customersRepository);

			return reply.send(customerLogged)
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
			const user = await getCustomerUseCase(req.params.id, customersRepository);

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
			await updateCustomerUseCase(req.body, customersRepository);

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
			await deleteCustomerUseCase(req.params.id, customersRepository);

			return reply.status(204).send();
		},
	);
}
