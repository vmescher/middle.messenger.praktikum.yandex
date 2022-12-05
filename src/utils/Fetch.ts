type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface Options {
	method: Methods;
	data?: Record<string, unknown>;
	headers?: Record<string, string>;
	timeout?: number;
	withCredentials?: boolean;
}

export default class Fetch {
	public get(url: string, options: Partial<Options> = {}) {
		return this.request(url, { ...options, method: 'GET' }, options.timeout);
	}

	public post(url: string, options: Partial<Options> = {}) {
		return this.request(url, { ...options, method: 'POST' }, options.timeout);
	}

	public put(url: string, options: Partial<Options> = {}) {
		return this.request(url, { ...options, method: 'PUT' }, options.timeout);
	}

	public delete(url: string, options: Partial<Options> = {}) {
		return this.request(url, { ...options, method: 'DELETE' }, options.timeout);
	}

	private request(url: string, options: Options, timeout = 5000) {
		const {
			method,
			data = null,
			headers,
			withCredentials = false,
		} = options;
		let formData: string | FormData;

		if (data) {
			if (method === 'GET') {
				formData = this.queryStringify(data);
			} else {
				formData = this.objectToFormData(data);
			}
		}

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			if (method === 'GET' && formData) {
				xhr.open(method, url + formData);
			} else {
				xhr.open(method, url);
			}

			xhr.withCredentials = withCredentials;
			xhr.timeout = timeout;

			if (headers) {
				Object.entries(headers).forEach(([key, value]) => {
					xhr.setRequestHeader(key, value);
				});
			}

			xhr.onload = () => {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === 'GET' || !formData) {
				xhr.send();
			} else {
				xhr.send(formData);
			}
		});
	}

	private objectToFormData(data: object) {
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, String(value));
		});

		return formData;
	}

	private queryStringify(data: object) {
		const url = new URL('/', 'https://practicum.yandex.ru/');

		Object.entries(data).forEach(([key, value]) => {
			url.searchParams.append(key, value);
		});

		return url.search;
	}
}
