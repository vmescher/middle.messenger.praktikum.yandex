import Block from "../../utils/Block";
import template from "./chats.hbs";
import SearchInput from "../utils/SearchInput";
import store, { withChats } from "../../utils/Store";
import { IChat, IUser } from "../../typings/interfaces";
import ChatsController from "../../controllers/ChatsController";
import UserController from "../../controllers/UserController";

interface ChatsProps {
	searchInput: SearchInput;
	settingsLink: Block;
	searchResults: Array<IUser>;
	searching: boolean;
	chats: IChat[];
};

export class ChatsBase extends Block<ChatsProps> {

	searchBouncer: number = 0;

	constructor(props: ChatsProps) {
		super('section', props);

		this.element!.classList.add('chats');

		this.children.searchInput.setProps({events: {
			// @ts-ignore
			input: this.findUsers.bind(this)
		}})
	}

	async init() {
		this.updateChatsList();
	}

	findUsers(e: Event) {
		if (e.target instanceof HTMLInputElement) {
			const target = e.target;
			clearTimeout(this.searchBouncer);
			this.searchBouncer = setTimeout(async () => {
				if (target.value) {
					const searchResults = await UserController.findUser({login: target.value})
					store.set('usersSearchResults', searchResults);
					this.setProps({ searching: true });
				} else {
					store.set('usersSearchResults', []);
					this.setProps({ searching: false });
				}
			}, 700)
		}
	}

	updateChatsList() {
		ChatsController.loadChats();
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export const Chats = withChats(ChatsBase as unknown as typeof Block);
