import { type InferSchemaType, Schema, type Types, model } from "mongoose";

const schedulingSchema = new Schema({
  insuranceBrokerName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
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

const customerSchema = new Schema(
  {
    name: {
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
    schedulings: {
      type: [schedulingSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export type Customer = InferSchemaType<typeof customerSchema> & {
  _id: Types.ObjectId;
};

export const CustomerModel = model("Customer", customerSchema);
