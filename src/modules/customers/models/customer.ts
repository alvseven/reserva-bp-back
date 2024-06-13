import dayjs from "dayjs";
import {
	type Document,
	type InferSchemaType,
	Schema,
	type Types,
	model,
} from "mongoose";

import type { StrictOmit } from "@/shared/helpers/types/strict-omit.js";

const schedulingSchema = new Schema({
	insuranceBrokerName: {
		type: String,
		required: true,
	},
	insuranceBrokerId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	duration: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["Pendente", "Realizado"],
		default: "Pendente",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const calculateEndDateTime = ({
	date,
	time,
	duration,
}: Pick<Customer["schedulings"][number], "date" | "time" | "duration">) => {
	const [hours, minutes] = time.split(":").map(Number);
	return dayjs(date).hour(hours).minute(minutes).add(dayjs.duration(duration));
};

const updateSchedulingStatus = async (
	doc: Customer["schedulings"][number] & Document,
) => {
	const { date, time, duration, status } = doc;

	const endDateTime = calculateEndDateTime({ date, time, duration });
	if (dayjs().isAfter(endDateTime) && status === "Pendente") {
		doc.status = "Realizado";
		await doc.save();
	}
};

schedulingSchema.pre("find", async function () {
	const docs = await this.model.find(this.getQuery());
	await Promise.all(docs.map(updateSchedulingStatus));
});

schedulingSchema.pre("findOne", async function () {
	const doc = await this.model.findOne(this.getQuery());
	if (doc) {
		await updateSchedulingStatus(doc);
	}
});

const customerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["Customer"],
			default: "Customer",
			immutable: true,
		},
		schedulings: {
			type: [schedulingSchema],
			default: [],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export type Customer = StrictOmit<
	InferSchemaType<typeof customerSchema> & {
		_id?: Types.ObjectId | string;
	},
	"schedulings"
> & {
	schedulings: Array<
		InferSchemaType<typeof schedulingSchema> & {
			_id?: Types.ObjectId | string;
		}
	>;
};

export const CustomerModel = model("Customer", customerSchema);
