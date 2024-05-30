import type { DeleteInsuranceBrokerInput } from "../dtos/delete-insurance-broker/delete-insurance-broker-request.js";

import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";

export async function deleteInsuranceBrokerUseCase(
	id: DeleteInsuranceBrokerInput["id"],
	insuranceBrokersRepository: InsuranceBrokersRepository,
) {
	await insuranceBrokersRepository.deleteById(id);
}
