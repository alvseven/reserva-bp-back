import { type InferSchemaType, Schema, type Types, model } from "mongoose";

const insuranceBrokerSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
		},
		password: String,
		role: {
			type: String,
			default: "InsuranceBroker",
			immutable: true,
		},
	},
	{
		timestamps: true,
	},
);

export type InsuranceBroker = InferSchemaType<typeof insuranceBrokerSchema> & {
	_id: Types.ObjectId;
};

export const InsuranceBrokerModel = model(
	"InsuranceBroker",
	insuranceBrokerSchema,
);
