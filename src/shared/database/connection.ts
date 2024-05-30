import mongoose from "mongoose";

export async function connectDatabase() {
	try {
		console.log("Trying to connect to the database");
		await mongoose.connect(process.env.MONGO_URI ?? "");
		console.log("Successfully connected to the database");
	} catch (error) {
		console.log(`Error trying to connect to the database: ${error}`);
	}
}
