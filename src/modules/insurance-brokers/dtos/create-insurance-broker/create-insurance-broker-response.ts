import type { Types } from "mongoose";
import { z } from "zod";

export const createInsuranceBrokerResponseSchema = z
	.object({
		_id: z.string(),
		name: z.string().min(3),
		email: z.string().email(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date(),
	})
	.transform((data) => {
		const { _id, ...rest } = data;

		return {
			_id: _id as unknown as Types.ObjectId,
			...rest,
		};
	});
