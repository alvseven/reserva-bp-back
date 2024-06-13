import { z } from "zod";

export const loginRequestSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginInput = z.infer<typeof loginRequestSchema>;
