import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";

import type { CreateCustomerInput } from "../dtos/create-customer/create-customer-request.dto.js";

import type { CustomersRepository } from "../contracts/customer.js";

export async function createCustomerUseCase(
	data: CreateCustomerInput,
	customersRepository: CustomersRepository,
) {
	const [customerFoundByEmail, customerFoundByUsername] = await Promise.all([
		customersRepository.findByEmail(data.email),
		customersRepository.findByUsername(data.username),
	]);

	if (customerFoundByEmail) {
		throw httpErrors.conflict("Email already registered");
	}

	if (customerFoundByUsername) {
		throw httpErrors.conflict("Username already in use");
	}

	const saltRounds = 12;
	const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

	const createdCustomer = await customersRepository.save({
		...data,
		password: hashedPassword,
	});

	return createdCustomer;
}
