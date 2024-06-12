import { Types } from "mongoose";
import { z } from "zod";
import { defaultUserSchema } from "../default-user-dto.js";

export const createCustomerResponseSchema = defaultUserSchema
	.omit({
		schedulings: true,
	})
	.and(
		z.object({
			schedulings: z.array(z.unknown()),
		}),
	);
