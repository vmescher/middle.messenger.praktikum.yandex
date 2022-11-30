export default class EventBus<E extends Record<string, unknown[]>> {
	private readonly listeners: {
		[K in keyof E]?: Array<(..._args: E[K]) => void>;
	} = {};

	on<K extends keyof E>(event: K, callback: (..._args: E[K]) => void) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event]!.push(callback);
	}

	off<K extends keyof E>(event: K, callback: () => void) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event as string}`);
		}

		this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
	}

	emit<K extends keyof E>(event: K, ...args: E[K]) {
		if (!this.listeners[event]) {
			throw new Event(`Нет события: ${event as string}`);
		}

		this.listeners[event]!.forEach((listener) => {
			listener(...args);
		});
	}
}
