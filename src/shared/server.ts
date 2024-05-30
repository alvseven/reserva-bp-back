import { app } from "./app.js";

const port = Number(process.env.API_PORT) ?? 3333;
const host = process.env.API_HOST ?? "localhost";

app.listen({ port, host }, (err, address) => {
	if (err) {
		console.error(
			`Error trying to run the server on port ${port}, error: ${err}`,
		);
		process.exit(1);
	}

	console.log(`Server is running on port ${port}, address: ${address}`);
});
