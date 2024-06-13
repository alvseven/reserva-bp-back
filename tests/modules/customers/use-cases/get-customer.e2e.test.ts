import { describe, expect, test } from "vitest";
import { api } from "../../../api.js";

describe("Get customer", () => {
	test("It should get a costumer", async () => {
		const getCustomerResponse = await api("http://localhost:3333/customers");

		expect(getCustomerResponse).toBeDefined();
	});

	test.todo("It should throw an error if the customer was not found");
});
