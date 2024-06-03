import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";

import type { CreateInsuranceBrokerInput } from "../dtos/create-insurance-broker/create-insurance-broker-request.js";

import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";

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

	return createdInsuranceBroker;
}
