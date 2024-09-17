const BASE_URL = 'https://frontend-take-home-service.fetch.com';
export interface LoginParams {
	name: string;
	email: string;
}

export default class Api {
	static async login({ name, email }: LoginParams) {
		return this.fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				name,
				email
			})
		});
	}
	private static async fetch(endpoint: string, options: RequestInit = {}) {
		const url = `${BASE_URL}${endpoint}`;

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			...(options.headers as Record<string, string>)
		};

		const response = await fetch(url, {
			...options,
			headers,
			credentials: 'include'
		});

		return response;
	}
}
