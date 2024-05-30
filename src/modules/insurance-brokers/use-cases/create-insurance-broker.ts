import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";

import type { CreateInsuranceBrokerInput } from "../dtos/create-insurance-broker/create-insurance-broker-request.js";

import type { NonNullableFields } from "@/shared/helpers/types/non-nullable-fields.js";
import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";
import type { InsuranceBroker } from "../models/insurance-broker.js";

export async function createInsuranceBrokerUseCase(
	data: CreateInsuranceBrokerInput,
	insuranceBrokersRepository: InsuranceBrokersRepository,
) {
	const [insuranceBrokerFoundByEmail, insuranceBrokerFoundByUsername] =
		await Promise.all([
			insuranceBrokersRepository.findByEmail(data.email),
			insuranceBrokersRepository.findByUsername(data.username),
		]);

	if (insuranceBrokerFoundByEmail) {
		throw httpErrors.conflict("Email already registered");
	}
	if (insuranceBrokerFoundByUsername) {
		throw httpErrors.conflict("Username already in use");
	}

	const saltRounds = 10;
	const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

	const createdInsuranceBroker = await insuranceBrokersRepository.save({
		...data,
		password: hashedPassword,
	});

	return createdInsuranceBroker as Required<NonNullableFields<InsuranceBroker>>;
}
