import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";

import type { CreateInsuranceBrokerInput } from "../dtos/create-insurance-broker/create-insurance-broker-request.js";

import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";

export async function createInsuranceBrokerUseCase(
	data: CreateInsuranceBrokerInput,
	insuranceBrokersRepository: InsuranceBrokersRepository,
) {
	const insuranceBrokerFound = await insuranceBrokersRepository.findByEmail(
		data.email,
	);

	if (insuranceBrokerFound) {
		throw httpErrors.conflict("Email já cadastrado");
	}

	const saltRounds = 12;
	const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

	const createdInsuranceBroker = await insuranceBrokersRepository.save({
		...data,
		password: hashedPassword,
	});

	return createdInsuranceBroker;
}
