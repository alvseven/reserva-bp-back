import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { MongooseInsuranceBrokersRepository } from "../repositories/insurance-brokers.js";

import { createInsuranceBrokerRequestSchema } from "../dtos/create-insurance-broker/create-insurance-broker-request.js";
import { deleteInsuranceBrokerRequestSchema } from "../dtos/delete-insurance-broker/delete-insurance-broker-request.js";
import { getInsuranceBrokerRequestSchema } from "../dtos/get-insurance-broker/get-insurance-broker-request.js";
import { updateInsuranceBrokerRequestSchema } from "../dtos/update-insurance-broker/update-insurance-broker-request.js";

import { loginRequestSchema } from "../dtos/login/login-request.dto.js";
import { createInsuranceBrokerUseCase } from "../use-cases/create-insurance-broker.js";
import { deleteInsuranceBrokerUseCase } from "../use-cases/delete-insurance-broker.js";
import { getInsuranceBrokerLoggedInUseCase } from "../use-cases/get-insurance-broker-logged-in.js";
import { getInsuranceBrokerUseCase } from "../use-cases/get-insurance-broker.js";
import { getInsuranceBrokersUseCase } from "../use-cases/get-insurance-brokers.js";
import { loginUseCase } from "../use-cases/login.js";
import { updateInsuranceBrokerUseCase } from "../use-cases/update-insurance-broker.js";

import verifyAuth from "@/shared/middlewares/verify-auth.js";

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

	fastify
		.withTypeProvider<ZodTypeProvider>()
		.get("/", { preHandler: verifyAuth }, async (_req, reply) => {
			const insuranceBrokers = await getInsuranceBrokersUseCase(
				insuranceBrokersRepository,
			);

			return reply.status(200).send(insuranceBrokers);
		});

	fastify
		.withTypeProvider<ZodTypeProvider>()
		.get("/me", { preHandler: verifyAuth }, async (req, reply) => {
			const insuranceBrokerLoggedIn = await getInsuranceBrokerLoggedInUseCase(
				req.user.id,
				insuranceBrokersRepository,
			);

			return reply.status(200).send(insuranceBrokerLoggedIn);
		});

	fastify.withTypeProvider<ZodTypeProvider>().post(
		"/login",
		{
			schema: {
				body: loginRequestSchema,
			},
		},
		async (req, reply) => {
			const insuranceBrokerLoggedIn = await loginUseCase(
				req.body,
				insuranceBrokersRepository,
			);

			return reply.send(insuranceBrokerLoggedIn);
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
