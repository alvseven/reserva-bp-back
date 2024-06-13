import { z } from "zod";

export const deleteInsuranceBrokerRequestSchema = z.object({
	id: z.string(),
});

export type DeleteInsuranceBrokerInput = z.infer<
	typeof deleteInsuranceBrokerRequestSchema
>;
