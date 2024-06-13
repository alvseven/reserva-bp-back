import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";
import type { Types } from "mongoose";

import type { UpdateCustomerInput } from "../dtos/update-customer/update-customer-request.dto.js";
import type { CustomersRepository } from "../contracts/customer.js";

export async function updateCustomerUseCase(
	{ _id, ...data }: UpdateCustomerInput & { _id: Types.ObjectId | string },
	customersRepository: CustomersRepository,
) {
	const customerFound = await customersRepository.findByEmail(data.email);

	if (customerFound && String(customerFound._id) !== _id) {
		throw httpErrors.conflict("Email já cadastrado");
	}

	const saltRounds = 12;
	const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

	await customersRepository.updateById(_id, {
		...data,
		password: hashedPassword,
	});
}
