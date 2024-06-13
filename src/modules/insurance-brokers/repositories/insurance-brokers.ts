import dayjs from "dayjs";

import type { InsuranceBrokersRepository } from "../contracts/insurance-brokers.js";
import { InsuranceBrokerModel } from "../models/insurance-broker.js";

export class MongooseInsuranceBrokersRepository
	implements InsuranceBrokersRepository
{
	private repository: typeof InsuranceBrokerModel;

	constructor() {
		this.repository = InsuranceBrokerModel;
	}

	async save(data: Parameters<InsuranceBrokersRepository["save"]>[0]) {
		const insuranceBroker = new this.repository(data);

		const insuranceBrokerSaved = await insuranceBroker.save();

		return insuranceBrokerSaved.toObject();
	}

	async find() {
		const insuranceBrokers = await this.repository.find();

		return insuranceBrokers;
	}

	async findById(id: Parameters<InsuranceBrokersRepository["findById"]>[0]) {
		const insuranceBrokerFound = await this.repository.findOne({ _id: id });

		return insuranceBrokerFound?.toObject();
	}

	async findByEmail(
		email: Parameters<InsuranceBrokersRepository["findByEmail"]>[0],
	) {
		const insuranceBrokerFound = await this.repository.findOne({ email });

		return insuranceBrokerFound?.toObject();
	}

	async updateById(
		id: Parameters<InsuranceBrokersRepository["updateById"]>[0],
		data: Parameters<InsuranceBrokersRepository["updateById"]>[1],
	) {
		await this.repository.updateOne({ _id: id }, data);
	}

	async deleteById(id: string) {
		await this.repository.deleteOne({ _id: id });
	}

	async createScheduling(
		data: Parameters<InsuranceBrokersRepository["createScheduling"]>[0],
	) {
		const { insuranceBrokerId, ...schedulingData } = data;

		await this.repository.findByIdAndUpdate(insuranceBrokerId, {
			$push: { schedulings: { ...schedulingData } },
		});
	}

	async checkConflictingSchedulingExists(
		data: Parameters<
			InsuranceBrokersRepository["checkConflictingSchedulingExists"]
		>[0],
	) {
		return false;
	}
}
