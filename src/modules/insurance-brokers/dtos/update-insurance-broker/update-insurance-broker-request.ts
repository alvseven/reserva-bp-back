import { z } from "zod";

export const updateInsuranceBrokerRequestSchema = z.object({
	id: z.string(),
	name: z.string().min(3).optional(),
	password: z
		.string()
		.min(8, {
			message:
				"The password is required and must be at least 8 characters long.",
		})
		.regex(/(?=.*?[A-Z])/, "At least one uppercase letter is required")
		.regex(/(?=.*?[a-z])/, "At least one lowercase letter is required")
		.regex(/(?=.*?\d)/, "At least one number is required")
		.optional(),
});

export type UpdateInsuranceBrokerInput = z.infer<
	typeof updateInsuranceBrokerRequestSchema
>;
