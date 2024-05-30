import type { StrictOmit } from "@/shared/helpers/types/strict-omit.js";
import type { Customer } from "../models/customer.js";

type CustomerId = Customer["_id"] | string;

export interface CustomersRepository {
	save(
		data: StrictOmit<Customer, "_id" | "createdAt" | "updatedAt" | "role">,
	): Promise<Customer>;
	findById(id: CustomerId): Promise<Customer | undefined>;
	findByEmail(id: Customer["email"]): Promise<Customer | undefined>;
	findByUsername(id: Customer["username"]): Promise<Customer | undefined>;
	updateById(
		id: CustomerId,
		data: StrictOmit<Customer, "_id" | "createdAt" | "updatedAt" | "role">,
	): Promise<void>;
	deleteById(id: CustomerId): Promise<void>;
}
