import dayjs, { type Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration.js";
import { z } from "zod";

dayjs.extend(duration);

const hourRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const durationSchema = z
	.string()
	.regex(/^\d{2}:\d{2}$/)
	.refine(
		(value) => {
			const [hours, minutes] = value.split(":").map(Number);
			const totalMinutes = dayjs.duration({ hours, minutes }).asMinutes();

			const minDuration = dayjs.duration({ minutes: 30 }).asMinutes();
			const maxDuration = dayjs.duration({ hours: 2 }).asMinutes();

			return totalMinutes >= minDuration && totalMinutes <= maxDuration;
		},
		{
			message:
				"Duração inválida, um agendamento deve durar no mínimo 30 minutos e no máximo 2 horas",
		},
	);

export const createSchedulingRequestSchema = z
	.object({
		customerId: z.string(),
		insuranceBrokerId: z.string().min(1).min(1),
		date: z.coerce.date(),
		time: z.string().min(1).regex(hourRegex),
		duration: durationSchema,
	})
	.superRefine(({ date, time }, ctx) => {
		const [hour, minutes] = time.split(":").map(Number);

		const formattedDate = dayjs(date).set("hour", hour).set("minutes", minutes);

		const nowOneMinuteInTheFuture = dayjs(new Date())
			.second(0)
			.add(1, "minute");

		if (nowOneMinuteInTheFuture.isAfter(formattedDate)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Horário inválido, a data deve estar no futuro",
				path: ["time"],
			});
		}
	});

export type CreateSchedulingInput = z.infer<
	typeof createSchedulingRequestSchema
>;
