import { z } from "zod";
import { defaultUserSchema } from "../default-user-dto.js";

export const createCustomerRequestSchema = defaultUserSchema
	.pick({
		name: true,
		email: true,
	})
	.and(
		z
			.object({
				password: z
					.string()
					.min(8, {
						message:
							"The password is required and must be at least 8 characters long.",
					})
					.regex(/(?=.*?[A-Z])/, "At least one uppercase letter is required")
					.regex(/(?=.*?[a-z])/, "At least one lowercase letter is required")
					.regex(/(?=.*?\d)/, "At least one number is required"),
				confirmPassword: z.string().min(1, "Password confirmation is required"),
			})
			.refine(({ password, confirmPassword }) => password === confirmPassword, {
				message: "Passwords need to match",
				path: ["confirmPassword"],
			}),
	);

export type CreateCustomerInput = z.infer<typeof createCustomerRequestSchema>;
