import type { StrictOmit } from "@/shared/helpers/types/strict-omit.js";
import { type InferSchemaType, Schema, type Types, model } from "mongoose";

const schedulingSchema = new Schema({
	customerName: {
		type: String,
		required: true,
	},
	customerId: {
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
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const insuranceBrokerSchema = new Schema(
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
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "InsuranceBroker",
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

export type InsuranceBroker = StrictOmit<
	InferSchemaType<typeof insuranceBrokerSchema> & {
		_id: Types.ObjectId;
	},
	"schedulings"
> & {
	schedulings: Array<
		InferSchemaType<typeof schedulingSchema> & {
			_id?: Types.ObjectId;
		}
	>;
};

export const InsuranceBrokerModel = model(
	"InsuranceBroker",
	insuranceBrokerSchema,
);
