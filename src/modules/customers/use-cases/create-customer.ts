import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";

import type { CreateCustomerInput } from "../dtos/create-customer/create-customer-request.dto.js";

import type { CustomersRepository } from "../contracts/customer.js";

export async function createCustomerUseCase(
	data: CreateCustomerInput,
	customersRepository: CustomersRepository,
) {
	const customerFound = await customersRepository.findByEmail(data.email);

	if (customerFound) {
		throw httpErrors.conflict("Email já cadastrado");
	}

	const saltRounds = 12;
	const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

	const createdCustomer = await customersRepository.save({
		...data,
		password: hashedPassword,
	});

	return createdCustomer;
}
