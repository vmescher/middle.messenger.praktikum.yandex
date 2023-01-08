import BaseAPI from './BaseAPI';
import { IChat } from '../typings/interfaces';

export class ChatsAPI extends BaseAPI {

	private static __instance: ChatsAPI;
	constructor() {
		super('/chats');

		if (ChatsAPI.__instance) {
			return ChatsAPI.__instance;
		}

		ChatsAPI.__instance = this;
	}

	create(data: Record<'title', string>) {
		return this.http.post('/', { data });
	}

	loadChats(data: Record<'title', string>): Promise<IChat[]> {
		return this.http.get('/', { data });
	}

	delete(identifier: number) {
		return this.http.delete('/', { data: { chatId: identifier }});
	}

	async getToken(identifier: number): Promise<string> {
		const response = await this.http.post<{ token: string }>(`/token/${identifier}`);

		return response.token;
	}

	read = undefined;
	update = undefined;

}

export default new ChatsAPI();
