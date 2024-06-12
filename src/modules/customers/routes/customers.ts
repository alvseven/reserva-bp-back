import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { MongooseInsuranceBrokersRepository } from "@/modules/insurance-brokers/repositories/insurance-brokers.js";
import { MongooseCustomersRepository } from "../repositories/customers.js";

import { createCustomerRequestSchema } from "../dtos/create-customer/create-customer-request.dto.js";
import { createSchedulingRequestSchema } from "../dtos/create-scheduling/create-scheduling-request.dto.js";
import { deleteCustomerRequestSchema } from "../dtos/delete-customer/delete-customer-request.dto.js";
import { getCustomerRequestSchema } from "../dtos/get-customer/get-customer-request.dto.js";
import { loginRequestSchema } from "../dtos/login/login-request.dto.js";
import { loginResponseSchema } from "../dtos/login/login-response.dto.js";
import { updateCustomerRequestSchema } from "../dtos/update-customer/update-customer-request.dto.js";

import { createCustomerUseCase } from "../use-cases/create-customer.js";
import { createSchedulingUseCase } from "../use-cases/create-scheduling.js";
import { deleteCustomerUseCase } from "../use-cases/delete-customer.js";
import { getCustomerUseCase } from "../use-cases/get-customer.js";
import { loginUseCase } from "../use-cases/login.js";
import { getCustomerLoggedInUseCase } from "../use-cases/get-customer-logged-in.js";
import { updateCustomerUseCase } from "../use-cases/update-customer.js";
import verifyAuth from "@/shared/middlewares/verify-auth.js";

export async function customersRoutes(fastify: FastifyInstance) {
  const customersRepository = new MongooseCustomersRepository();
  const insuranceBrokersRepository = new MongooseInsuranceBrokersRepository();

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
        customersRepository
      );

      return reply.status(201).send(createdCustomer);
    }
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        body: loginRequestSchema,
        response: {
          "200": loginResponseSchema,
        },
      },
    },
    async (req, reply) => {
      const customerLoggedIn = await loginUseCase(
        req.body,
        customersRepository
      );

      return reply.send(customerLoggedIn);
    }
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/me",
    {
      preHandler: verifyAuth,
    },
    async (req, reply) => {
      const customerLoggedIn = await getCustomerLoggedInUseCase(
        req.user.id,
        customersRepository
      );

      return reply.send(customerLoggedIn);
    }
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/me/schedulings",
    {
      schema: {
        body: createSchedulingRequestSchema,
      },
    },
    async (req, reply) => {
      const createdScheduling = await createSchedulingUseCase(req.body, {
        customersRepository,
        insuranceBrokersRepository,
      });

      return reply.status(201).send(createdScheduling);
    }
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
    }
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
    }
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
    }
  );
}
