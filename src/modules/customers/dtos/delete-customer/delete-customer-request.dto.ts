import { z } from "zod";

export const deleteCustomerRequestSchema = z.object({
	id: z.string(),
});

export type DeleteCustomerInput = z.infer<typeof deleteCustomerRequestSchema>;
