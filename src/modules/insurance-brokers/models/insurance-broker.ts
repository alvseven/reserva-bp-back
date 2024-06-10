import { type InferSchemaType, Schema, type Types, model } from "mongoose";

const schedulingSchema = new Schema({
  customerName: {
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

const insuranceBrokerSchema = new Schema(
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
  }
);

export type InsuranceBroker = InferSchemaType<typeof insuranceBrokerSchema> & {
  _id: Types.ObjectId;
};

export const InsuranceBrokerModel = model(
  "InsuranceBroker",
  insuranceBrokerSchema
);
