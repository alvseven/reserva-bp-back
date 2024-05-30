import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";
import type { UpdateInsuranceBrokerInput } from "../dtos/update-insurance-broker/update-insurance-broker-request.js";

export async function updateInsuranceBrokerUseCase(
	{ id, ...data }: UpdateInsuranceBrokerInput,
	insuranceBrokersRepository: InsuranceBrokersRepository,
) {
	await insuranceBrokersRepository.updateById(id, data);
}
