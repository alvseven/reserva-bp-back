import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { MongooseInsuranceBrokersRepository } from "../repositories/insurance-brokers.js";

import { createInsuranceBrokerRequestSchema } from "../dtos/create-insurance-broker/create-insurance-broker-request.js";
import { deleteInsuranceBrokerRequestSchema } from "../dtos/delete-insurance-broker/delete-insurance-broker-request.js";
import { getInsuranceBrokerRequestSchema } from "../dtos/get-insurance-broker/get-insurance-broker-request.js";
import { updateInsuranceBrokerRequestSchema } from "../dtos/update-insurance-broker/update-insurance-broker-request.js";

import { createInsuranceBrokerUseCase } from "../use-cases/create-insurance-broker.js";
import { deleteInsuranceBrokerUseCase } from "../use-cases/delete-insurance-broker.js";
import { getInsuranceBrokerUseCase } from "../use-cases/get-insurance-broker.js";
import { updateInsuranceBrokerUseCase } from "../use-cases/update-insurance-broker.js";
import { loginUseCase } from "../use-cases/login.js";
import { loginRequestSchema } from "../dtos/login/login-request.dto.js";

export async function insuranceBrokersRoutes(fastify: FastifyInstance) {
	const insuranceBrokersRepository = new MongooseInsuranceBrokersRepository();

	fastify.withTypeProvider<ZodTypeProvider>().post(
		"/",
		{
			schema: {
				body: createInsuranceBrokerRequestSchema,
			},
		},
		async (req, reply) => {
			const createdInsuranceBroker = await createInsuranceBrokerUseCase(
				req.body,
				insuranceBrokersRepository,
			);

			return reply.status(201).send(createdInsuranceBroker);
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
			const insuranceBrokerLogged = await loginUseCase(req.body,insuranceBrokersRepository);

			return reply.send(insuranceBrokerLogged)
		},
	);

	fastify.withTypeProvider<ZodTypeProvider>().get(
		"/:id",
		{
			schema: {
				params: getInsuranceBrokerRequestSchema,
			},
		},
		async (req, reply) => {
			const user = await getInsuranceBrokerUseCase(
				req.params.id,
				insuranceBrokersRepository,
			);

			return reply.send(user);
		},
	);

	fastify.withTypeProvider<ZodTypeProvider>().patch(
		"/:id",
		{
			schema: {
				body: updateInsuranceBrokerRequestSchema,
			},
		},
		async (req, reply) => {
			await updateInsuranceBrokerUseCase(req.body, insuranceBrokersRepository);

			return reply.status(204).send();
		},
	);

	fastify.withTypeProvider<ZodTypeProvider>().delete(
		"/:id",
		{
			schema: {
				params: deleteInsuranceBrokerRequestSchema,
			},
		},
		async (req, reply) => {
			await deleteInsuranceBrokerUseCase(
				req.params.id,
				insuranceBrokersRepository,
			);

			return reply.status(204).send();
		},
	);
}
