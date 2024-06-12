import { z } from "zod";
import { defaultUserSchema } from "../default-user-dto.js";

export const loginRequestSchema = z
	.object({
		password: z.string(),
	})
	.and(
		defaultUserSchema.pick({
			email: true,
		}),
	);

export type LoginInput = z.infer<typeof loginRequestSchema>;
