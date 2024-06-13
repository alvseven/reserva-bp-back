import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";

export async function getInsuranceBrokersUseCase(
	insuranceBrokersRepository: InsuranceBrokersRepository,
) {
	const insuranceBrokers = await insuranceBrokersRepository.find();

	return insuranceBrokers;
}
