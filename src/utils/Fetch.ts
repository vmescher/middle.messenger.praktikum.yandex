type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface Options {
	method: Methods;
	data?: Record<string, unknown>;
	headers?: Record<string, string>;
	timeout?: number;
	withCredentials?: boolean;
}

type HTTPMethod = (url: string, options?: Partial<Options>) => Promise<unknown>;

export default class Fetch {
	public get: HTTPMethod = (url, options = {}) => {
		const { data } = options;
		let queriedUrl = url;

		if (data) {
			queriedUrl += this.queryStringify(data);
		}

		return this.request(queriedUrl, { ...options, method: 'GET' }, options.timeout);
	};

	public post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: 'POST' }, options.timeout);

	public put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: 'PUT' }, options.timeout);

	public delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: 'DELETE' }, options.timeout);

	private request(url: string, options: Options, timeout = 5000) {
		const {
			method,
			data = null,
			headers,
			withCredentials = false,
		} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, url);

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

			if (method === 'GET' || !data) {
				xhr.send();
			} else {
				const formData = this.objectToFormData(data);
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
