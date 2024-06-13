import { httpErrors } from "@fastify/sensible";

import type { GetInsuranceBrokerInput } from "../dtos/get-insurance-broker/get-insurance-broker-request.js";

import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";

export async function getInsuranceBrokerUseCase(
	id: GetInsuranceBrokerInput["id"],
	insuranceBrokersRepository: InsuranceBrokersRepository,
) {
	const insuranceBrokerFound = await insuranceBrokersRepository.findById(id);

	if (!insuranceBrokerFound) {
		throw httpErrors.notFound("Corretor de seguros não encontrado");
	}

	return insuranceBrokerFound;
}
