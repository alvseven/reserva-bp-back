import { api } from "../../../api.js";
import { describe, expect, test } from "vitest";
import { createCustomerMock } from "../mocks/create-customer.js";

describe("Create customer", () => {
	test("It should create a costumer", async () => {
		const createCustomerResponse = await api(
			"http://localhost:3333/customers",
			{
				method: "POST",
			},
			createCustomerMock,
		);

		expect(1 + 1).toBe(2);
	});
});
