import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { LoginInput } from "../dtos/login/login-request.dto.js";

import { parsedEnvs } from "@/shared/app.js";
import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";

export async function loginUseCase(
	data: LoginInput,
	insuranceBrokersRepository: InsuranceBrokersRepository,
) {
	const insuranceBrokerFound = await insuranceBrokersRepository.findByEmail(
		data.email,
	);

	if (!insuranceBrokerFound) {
		throw httpErrors.notFound("Insurance broker not found");
	}

	// biome-ignore lint/style/noNonNullAssertion: mongo issue btw
	const passwordMatch = bcrypt.compareSync(
		data.password,
		insuranceBrokerFound.password!,
	);

	if (!passwordMatch) {
		throw httpErrors.forbidden("Incorrect email or password");
	}

	const token = jwt.sign(
		{
			id: insuranceBrokerFound._id,
			email: insuranceBrokerFound.email,
		},
		parsedEnvs.JWT_SECRET,
		{
			expiresIn: parsedEnvs.JWT_EXPIRES,
		},
	);

	return {
		...insuranceBrokerFound,
		token,
	};
}
