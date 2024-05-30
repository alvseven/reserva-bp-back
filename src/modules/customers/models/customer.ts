import { type InferSchemaType, Schema, type Types, model } from "mongoose";

const customerSchema = new Schema(
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
			default: "Customer",
			immutable: true,
		},
	},
	{
		timestamps: true,
	},
);

export type Customer = InferSchemaType<typeof customerSchema> & {
	_id: Types.ObjectId;
};

export const CustomerModel = model("Customer", customerSchema);
