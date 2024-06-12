import { z } from "zod";
import { defaultUserSchema } from "../default-user-dto.js";

export const updateCustomerRequestSchema = z
	.object({
		password: z
			.string()
			.min(1, "O campo password é obrigatório")
			.min(8, {
				message: "O campo password deve conter pelo menos 8 caracteres.",
			})
			.regex(
				/(?=.*?[A-Z])/,
				"A senha deve conter pelo menos uma letra maiúscula",
			)
			.regex(
				/(?=.*?[a-z])/,
				"A senha deve conter pelo menos uma letra minúscula",
			)
			.regex(/(?=.*?\d)/, "A senha deve conter pelo menos um número"),
	})
	.and(
		defaultUserSchema.pick({
			_id: true,
			name: true,
			email: true,
		}),
	);

export type UpdateCustomerInput = z.infer<typeof updateCustomerRequestSchema>;
