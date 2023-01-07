import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";

export class ChatsController {
	private readonly api: ChatsAPI;

	constructor() {
		this.api = API;
	}

	async create(title: string) {
		await this.api.create({ title });

		this.loadChats();
	}

	async delete(id: number) {
		await this.api.delete(id);

		this.loadChats();
	}

	selectChat(id: number) {
		store.set('currentChatId', id);
	}

	async loadChats() {
		const chats = await this.api.read();

		// chats.map(async (chat) => {
		// 	const token = await this.getToken(chat.id);
		//
		// 	await MessagesController.connect(chat.id, token);
		// });

		store.set('chats', chats);
	}

	getToken(id: number) {
		return this.api.getToken(id);
	}

}

export default new ChatsController();
