import { app, parsedEnvs } from "./app.js";

const port = parsedEnvs.PORT;
const host = parsedEnvs.HOST;

app.listen({ port, host }, (err, address) => {
	if (err) {
		console.error(
			`Error trying to run the server on port ${port}, error: ${err}`,
		);
		process.exit(1);
	}

	console.log(`Server is running on port ${port}, address: ${address}`);
});
