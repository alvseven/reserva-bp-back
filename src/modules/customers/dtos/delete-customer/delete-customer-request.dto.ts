import type { infer as ZodInfer } from "zod";

import { defaultUserSchema } from "../default-user-dto.js";

export const deleteCustomerRequestSchema = defaultUserSchema.pick({
	_id: true,
});

export type DeleteCustomerInput = ZodInfer<typeof deleteCustomerRequestSchema>;
