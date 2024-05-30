import type { StrictOmit } from "@/shared/helpers/types/strict-omit.js";
import type { InsuranceBroker } from "../models/insurance-broker.js";

type InsuranceBrokerId = InsuranceBroker["_id"] | string;

export interface InsuranceBrokersRepository {
	save(
		data: StrictOmit<
			InsuranceBroker,
			"_id" | "createdAt" | "updatedAt" | "role"
		>,
	): Promise<InsuranceBroker>;
	findById(id: InsuranceBrokerId): Promise<InsuranceBroker | undefined>;
	findByEmail(
		id: InsuranceBroker["email"],
	): Promise<InsuranceBroker | undefined>;
	findByUsername(
		id: InsuranceBroker["username"],
	): Promise<InsuranceBroker | undefined>;
	updateById(
		id: InsuranceBrokerId,
		data: StrictOmit<
			InsuranceBroker,
			"_id" | "createdAt" | "updatedAt" | "role"
		>,
	): Promise<void>;
	deleteById(id: InsuranceBrokerId): Promise<void>;
}
