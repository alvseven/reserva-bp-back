import type { StrictOmit } from "@/shared/helpers/types/strict-omit.js";
import type { Customer } from "../models/customer.js";

type CustomerId = Customer["_id"] | string;

export interface CustomersRepository {
	save(data: Pick<Customer, "name" | "email" | "password">): Promise<Customer>;
	findById(id: CustomerId): Promise<Customer | undefined>;
	findByEmail(email: Customer["email"]): Promise<Customer | undefined>;
	createScheduling(data: {
		customerId: string;
		insuranceBrokerName: string;
		insuranceBrokerId: string;
		date: Date;
		time: string;
		duration: string;
	}): Promise<unknown>;
	updateById(
		id: CustomerId,
		data: StrictOmit<
			Customer,
			"_id" | "createdAt" | "updatedAt" | "role" | "schedulings"
		>,
	): Promise<void>;
	deleteById(id: CustomerId): Promise<void>;
}
