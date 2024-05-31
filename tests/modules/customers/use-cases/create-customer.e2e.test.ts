import { describe, expect, test } from "vitest";
import { api } from "../../../api.js";
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

		const id = {
			_id: expect.any(String)
		}

		expect(createCustomerResponse).toMatchObject(createCustomerMock);
		expect(createCustomerResponse).toMatchObject(expect.objectContaining(id))
	});

	test.todo(
		"It should throw an error if a user with same email already exists",
	);

	test.todo("It should throw an error if a user with same email alread exists");
});
