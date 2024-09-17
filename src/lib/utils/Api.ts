export interface LoginParams {
	name: string;
	email: string;
}

export default class Api {
	private static get baseUrl(): string {
		return process.env.NODE_ENV === 'test' ? '' : 'https://frontend-take-home-service.fetch.com';
	}

	static async login({ name, email }: LoginParams) {
		return this.fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				name,
				email
			})
		});
	}

	static async searchDogs() {
		return this.fetch('/dogs/search', {
			method: 'GET'
		});
	}

	static async getDogs(ids: string[]) {
		return this.fetch('/dogs', {
			method: 'POST',
			body: JSON.stringify(ids)
		});
	}
	private static async fetch(endpoint: string, options: RequestInit = {}) {
		const url = `${this.baseUrl}${endpoint}`;
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
