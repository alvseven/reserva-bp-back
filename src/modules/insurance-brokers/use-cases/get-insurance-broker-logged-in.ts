import { httpErrors } from "@fastify/sensible";

import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";

export async function getInsuranceBrokerLoggedInUseCase(
  id: string,
  insuranceBrokersRepository: InsuranceBrokersRepository
) {
  const insuranceBrokerFound = await insuranceBrokersRepository.findById(id);

  if (!insuranceBrokerFound) {
    throw httpErrors.notFound("Corretor de seguros não encontrado");
  }

  return insuranceBrokerFound;
}
