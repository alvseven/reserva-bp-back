import { z } from "zod";

import { defaultUserSchema } from "../default-user-dto.js";

export const loginResponseSchema = z
	.object({
		token: z.string(),
	})
	.and(defaultUserSchema);
