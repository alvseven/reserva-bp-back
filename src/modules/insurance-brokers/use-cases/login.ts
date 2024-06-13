import { httpErrors } from "@fastify/sensible";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { parsedEnvs } from "@/shared/app.js";
import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";
import type { LoginInput } from "../dtos/login/login-request.dto.js";

export async function loginUseCase(
	data: LoginInput,
	insuranceBrokersRepository: InsuranceBrokersRepository,
) {
	const insuranceBrokerFound = await insuranceBrokersRepository.findByEmail(
		data.email,
	);

	if (!insuranceBrokerFound) {
		throw httpErrors.forbidden("Email ou/e senha incorretos");
	}

	const passwordMatch = bcrypt.compareSync(
		data.password,
		insuranceBrokerFound.password,
	);

	if (!passwordMatch) {
		throw httpErrors.forbidden("Email ou/e senha incorretos");
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
