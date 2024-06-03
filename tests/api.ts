import { parsedEnvs } from "@/shared/app.js";

export async function api(
	path: string,
	options?: RequestInit,
	body?: Record<string, unknown>,
) {
	const url = new URL(path, parsedEnvs.API_URL);

	const response = await fetch(url, {
		...options,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		...(body && { body: JSON.stringify(body) }),
	});

	return response.json();
}
