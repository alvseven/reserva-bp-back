import type { Types } from "mongoose";

import type { CustomersRepository } from "../contracts/customer.js";

export async function deleteCustomerUseCase(
	id: Types.ObjectId | string,
	customersRepository: CustomersRepository,
) {
	await customersRepository.deleteById(id);
}
