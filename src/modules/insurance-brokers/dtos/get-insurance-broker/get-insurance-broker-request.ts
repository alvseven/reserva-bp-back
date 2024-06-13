import { z } from "zod";

export const getInsuranceBrokerRequestSchema = z.object({
	id: z.string(),
});

export type GetInsuranceBrokerInput = z.infer<
	typeof getInsuranceBrokerRequestSchema
>;
