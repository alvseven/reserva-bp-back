import type { CustomersRepository } from "../contracts/customer.js";
import type { UpdateCustomerInput } from "../dtos/update-customer/update-customer-request.dto.js";

export async function updateCustomerUseCase(
	{ id, ...data }: UpdateCustomerInput,
	customersRepository: CustomersRepository,
) {
	await customersRepository.updateById(id, data);
}
