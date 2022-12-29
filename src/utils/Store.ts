import EventBus from "./EventBus";
import { set } from "./helpers";

export enum StoreEvents {
	Updated = 'updated'
}

type StoreEventsType = {
	updated: [Record<string, unknown>];
}

class Store extends EventBus<StoreEventsType> {
	private static __instance: Store;
	private state: Record<string, unknown> = {
		user: {
			user_data: null,
		},
	};

	constructor() {
		super();

		if (Store.__instance) {
			return Store.__instance;
		}

		Store.__instance = this;
	}

	public set(keyPath: string, data: unknown) {
		set(this.state, keyPath, data);

		this.emit(StoreEvents.Updated, this.getState());
	}

	public getState() {
		return this.state;
	}
}
export default new Store();
