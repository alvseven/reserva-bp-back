import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { LoginInput } from "../dtos/login/login-request.dto.js";

import { parsedEnvs } from "@/shared/app.js";
import type { CustomersRepository } from "../contracts/customer.js";

export async function loginUseCase(
	data: LoginInput,
	customersRepository: CustomersRepository,
) {
	const customerFound = await customersRepository.findByEmail(data.email);

	if (!customerFound) {
		throw httpErrors.notFound("Customer not found");
	}

	// biome-ignore lint/style/noNonNullAssertion: mongo issue btw
	const passwordMatch = bcrypt.compareSync(
		data.password,
		customerFound.password!,
	);

	if (!passwordMatch) {
		throw httpErrors.forbidden("Incorrect email or password");
	}

	const token = jwt.sign(
		{
			id: customerFound._id,
			email: customerFound.email,
		},
		parsedEnvs.JWT_SECRET,
		{
			expiresIn: parsedEnvs.JWT_EXPIRES,
		},
	);

	return {
		...customerFound,
		token,
	};
}
