import mongoose from "mongoose";

import { parsedEnvs } from "../app.js";

export async function connectDatabase() {
	try {
		const mongoUri =
			parsedEnvs.NODE_ENV === "test"
				? parsedEnvs.MONGO_TEST_URI
				: parsedEnvs.MONGO_URI;

		console.log("Trying to connect to the database");

		await mongoose.connect(mongoUri ?? "");

		console.log("Successfully connected to the database");
	} catch (error) {
		console.log(`Error trying to connect to the database: ${error}`);
	}
}
