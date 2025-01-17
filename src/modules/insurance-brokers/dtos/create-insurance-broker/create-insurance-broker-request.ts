import { z } from "zod";

export const createInsuranceBrokerRequestSchema = z
	.object({
		name: z.string().min(3),
		email: z.string().email(),
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
	});

export type CreateInsuranceBrokerInput = z.infer<
	typeof createInsuranceBrokerRequestSchema
>;
