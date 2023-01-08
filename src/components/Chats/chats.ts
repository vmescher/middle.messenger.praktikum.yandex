import Block from "../../utils/Block";
import template from "./chats.hbs";
import SearchInput from "../utils/SearchInput";
import { withChats } from "../../utils/Store";
import { IChat } from "../../typings/interfaces";
import ChatsController from "../../controllers/ChatsController";
import { openModal } from "../../utils/Modal";
import CreateChatModal from "../../modals/CreateChat";

interface ChatsProps {
	searchInput: SearchInput;
	settingsLink: Block;
	searching: boolean;
	chats: IChat[];
	currentChatId?: number;
	events: Record<string, (e?: Event) => void>;
}

export class ChatsBase extends Block<ChatsProps> {

	searchBouncer: NodeJS.Timeout | undefined;

	constructor(props: ChatsProps) {
		super('section', props);

		this.element!.classList.add('chats');

		this.element!.addEventListener('click', (e) => {
			if (e.target instanceof HTMLElement) {
				if (e.target.classList.contains('chats-item_empty') || e.target.closest('.chats-item_empty')) {
					openModal(CreateChatModal);
				}

				if (e.target.hasAttribute('data-chat-id')) {
					ChatsController.selectChat(Number(e.target.getAttribute('data-chat-id')));
				} else if (e.target.closest('.chats-item')?.hasAttribute('data-chat-id')) {
					ChatsController.selectChat(Number(e.target.closest('.chats-item')?.getAttribute('data-chat-id')));
				}
			}
		});

		this.children.searchInput.setProps({events: {
			// @ts-ignore
			input: this.findUsers.bind(this)
		}})
	}

	selectChat(id: number) {
		ChatsController.selectChat(id);
	}

	componentDidMount() {
		this.updateChatsList();
	}

	findUsers(e: Event) {
		if (e.target instanceof HTMLInputElement) {
			const target = e.target;
			clearTimeout(this.searchBouncer);
			this.searchBouncer = setTimeout(async () => {
				if (target.value) {
					await ChatsController.loadChats(target.value);
					this.setProps({ searching: true });
				} else {
					await ChatsController.loadChats();
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
