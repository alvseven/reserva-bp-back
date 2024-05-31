import mongoose from "mongoose";

export async function connectDatabase() {
	try {
		const mongoUri =
			process.env.NODE_ENV === "test"
				? process.env.MONGO_TEST_URI
				: process.env.MONGO_URI;

		console.log("Trying to connect to the database");

		await mongoose.connect(mongoUri ?? "");

		console.log("Successfully connected to the database");
	} catch (error) {
		console.log(`Error trying to connect to the database: ${error}`);
	}
}
