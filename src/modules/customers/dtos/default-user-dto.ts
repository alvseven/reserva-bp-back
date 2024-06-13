import { Types } from "mongoose";
import { z } from "zod";

const schedulingSchema = z.object({
	_id: z.custom<Types.ObjectId | string | undefined>(
		(value) => value instanceof Types.ObjectId || typeof value === "string",
	),
	insuranceBrokerName: z.string(),
	insuranceBrokerId: z.string(),
	date: z.coerce.date(),
	time: z.string(),
	duration: z.string(),
	status: z.enum(["Pendente", "Realizado"]),
	createdAt: z.coerce.date(),
});

export const defaultUserSchema = z.object({
	_id: z.custom<Types.ObjectId | string | undefined>(
		(value) => value instanceof Types.ObjectId || typeof value === "string",
	),
	name: z.string().min(3),
	email: z.string().email(),
	role: z.literal("Customer"),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	schedulings: z.array(schedulingSchema),
});
