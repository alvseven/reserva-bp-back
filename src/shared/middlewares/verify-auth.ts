import type {
	FastifyReply,
	FastifyRequest,
	HookHandlerDoneFunction,
} from "fastify";
import jwt from "jsonwebtoken";
import { parsedEnvs } from "../app.js";

export function verifyAuth(
	req: FastifyRequest,
	reply: FastifyReply,
	done: HookHandlerDoneFunction,
) {
	const [_, token] = req.headers.authorization?.split(" ") ?? [];

	if (!token) {
		return reply.status(401).send({ message: "Token não encontrado" });
	}

	try {
		const decoded = jwt.verify(token, parsedEnvs.JWT_SECRET);
		req.user = {
			id: typeof decoded === "object" && decoded.id,
		};

		done();
		return req;
	} catch (err) {
		return reply.status(403).send({ message: "Token inválido" });
	}
}

export default verifyAuth;
