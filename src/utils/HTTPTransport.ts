import { queryString } from './helpers';

enum Methods {
	Get = 'GET',
	Post = 'POST',
	Put = 'PUT',
	Patch = 'PATCH',
	Delete = 'DELETE',
}

interface Options {
	method: Methods;
	data?: Record<string, unknown>;
	headers?: Record<string, string>;
	timeout?: number;
	withCredentials?: boolean;
}

type HTTPMethod = <Response>(url: string, options?: Partial<Options>) => Promise<Response>;

export default class HTTPTransport {
	static API_URL = 'https://ya-praktikum.tech/api/v2';
	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public get: HTTPMethod = (url = '/', options = {}) => {
		const { data } = options;
		let queriedUrl = url;

		if (data) {
			queriedUrl += queryString(data);
		}

		return this.request(queriedUrl, { ...options, method: Methods.Get }, options.timeout);
	};

	public post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: Methods.Post }, options.timeout);

	public put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: Methods.Put }, options.timeout);

	public delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: Methods.Delete }, options.timeout);

	private request<Response>(url: string, options: Options, timeout = 5000): Promise<Response> {
		const {
			method,
			data = null,
			headers,
			withCredentials = true,
		} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, this.endpoint + url);

			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			xhr.withCredentials = withCredentials;
			xhr.timeout = timeout;
			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-Type', 'application/json');

			if (headers) {
				Object.entries(headers).forEach(([key, value]) => {
					xhr.setRequestHeader(key, value);
				});
			}

			xhr.onabort = () => reject({reason: 'abort'});
			xhr.onerror = () => reject({reason: 'network error'});
			xhr.ontimeout = () => reject({reason: 'timeout'});

			if (method === Methods.Get || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	}

}


