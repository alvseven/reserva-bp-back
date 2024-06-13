import type { CustomersRepository } from "../contracts/customer.js";
import { type Customer, CustomerModel } from "../models/customer.js";

export class MongooseCustomersRepository implements CustomersRepository {
	private repository: typeof CustomerModel;

	constructor() {
		this.repository = CustomerModel;
	}

	async save(data: Parameters<CustomersRepository["save"]>[0]) {
		const customer = new this.repository(data);

		const customerSaved = await customer.save();

		return customerSaved.toObject();
	}

	async findById(id: Parameters<CustomersRepository["findById"]>[0]) {
		const customerFound = await this.repository.findOne({ _id: id });

		return customerFound?.toObject();
	}

	async findByEmail(email: Parameters<CustomersRepository["findByEmail"]>[0]) {
		const customerFound = await this.repository.findOne({ email });

		return customerFound?.toObject();
	}

	async createScheduling(
		data: Parameters<CustomersRepository["createScheduling"]>[0],
	) {
		const { customerId, ...schedulingData } = data;
		const schedulingCreated = await this.repository.findByIdAndUpdate(
			customerId,
			{
				$push: { schedulings: { ...schedulingData } },
			},
		);

		return schedulingCreated;
	}

	async updateById(
		id: Parameters<CustomersRepository["updateById"]>[0],
		data: Parameters<CustomersRepository["updateById"]>[1],
	) {
		await this.repository.updateOne({ _id: id }, data);
	}

	async deleteById(id: string) {
		await this.repository.deleteOne({ _id: id });
	}
}
