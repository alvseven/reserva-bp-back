import { z } from "zod";

export const getCustomerRequestSchema = z.object({
	id: z.string(),
});

export type GetCustomerInput = z.infer<typeof getCustomerRequestSchema>;
