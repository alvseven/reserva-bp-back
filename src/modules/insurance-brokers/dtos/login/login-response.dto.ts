import { Types } from "mongoose";
import { z } from "zod";

const schedulingSchema = z.object({
	_id: z.string(),
	customerName: z.string(),
	date: z.coerce.date(),
	duration: z.string(),
	status: z.string(),
	createdAt: z.coerce.date(),
});

export const loginResponseSchema = z.object({
	_id: z.custom<Types.ObjectId>((value) => value instanceof Types.ObjectId),
	name: z.string(),
	email: z.string().email(),
	role: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	schedulings: z.array(schedulingSchema),
});
