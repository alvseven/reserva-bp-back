import { httpErrors } from "@fastify/sensible";

import type { CustomersRepository } from "../contracts/customer.js";

export async function getCustomerLoggedInUseCase(
	id: string,
	customersRepository: CustomersRepository,
) {
	const customerFound = await customersRepository.findById(id);

	if (!customerFound) {
		throw httpErrors.notFound("Cliente não encontrado");
	}

	return customerFound;
}
