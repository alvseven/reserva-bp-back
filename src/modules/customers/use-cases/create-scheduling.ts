import { httpErrors } from "@fastify/sensible";

import type { InsuranceBrokersRepository } from "@/modules/insurance-brokers/contracts/insurance-brokers.js";
import type { CustomersRepository } from "../contracts/customer.js";
import type { CreateSchedulingInput } from "../dtos/create-scheduling/create-scheduling-request.dto.js";

type CreateSchedulingRepositories = {
	customersRepository: CustomersRepository;
	insuranceBrokersRepository: InsuranceBrokersRepository;
};

export async function createSchedulingUseCase(
	data: CreateSchedulingInput,
	{
		customersRepository,
		insuranceBrokersRepository,
	}: CreateSchedulingRepositories,
) {
	const { customerId, insuranceBrokerId, ...schedulingData } = data;

	const customerFound = await customersRepository.findById(customerId);

	if (!customerFound) {
		throw httpErrors.notFound("Cliente não encontrado");
	}

	const insuranceBrokerFound =
		await insuranceBrokersRepository.findById(insuranceBrokerId);

	if (!insuranceBrokerFound) {
		throw httpErrors.notFound("Corretor de seguros não encontrado");
	}

	const hasSchedulingConflict =
		await insuranceBrokersRepository.checkConflictingSchedulingExists({
			insuranceBrokerId,
			...schedulingData,
		});

	if (hasSchedulingConflict) {
		throw httpErrors.conflict("Essa data e horário já estão ocupados");
	}

	const [createdScheduling] = await Promise.all([
		customersRepository.createScheduling({
			...data,
			insuranceBrokerName: insuranceBrokerFound.name,
		}),
		insuranceBrokersRepository.createScheduling({
			...data,
			customerName: customerFound.name,
		}),
	]);

	return createdScheduling;
}
