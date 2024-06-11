import { httpErrors } from "@fastify/sensible";
import type { GetCustomerInput } from "../dtos/get-customer/get-customer-request.dto.js";

import type { CustomersRepository } from "../contracts/customer.js";

export async function getCustomerUseCase(
	id: GetCustomerInput["id"],
	customersRepository: CustomersRepository,
) {
	const customerFound = await customersRepository.findById(id);

	if (!customerFound) {
		throw httpErrors.notFound("Cliente não encontrado");
	}

	return customerFound;
}
