import type { DeleteCustomerInput } from "../dtos/delete-customer/delete-customer-request.dto.js";

import type { CustomersRepository } from "../contracts/customer.js";

export async function deleteCustomerUseCase(
	id: DeleteCustomerInput["id"],
	customersRepository: CustomersRepository,
) {
	await customersRepository.deleteById(id);
}
