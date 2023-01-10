import Block from "../../utils/Block";
import template from "./chats.hbs";
import SearchInput from "../utils/SearchInput";
import {IChat, ILastMessage} from "../../typings/interfaces";
import ChatsController from "../../controllers/ChatsController";
import {openModal} from "../../utils/Modal";
import CreateChatModal from "../../modals/CreateChat";
import {withChats} from "../../utils/Store";

interface ChatsProps {
	searchInput: SearchInput;
	settingsLink: Block;
	searching: boolean;
	chats: IChat[];
	currentChatId?: number;
	events: Record<string, (e?: Event) => void>;
}

interface chatListItem extends IChat {
	isActive: boolean;
	last_message: ILastMessage & Record<'human_time', string>
}

export class ChatsBase extends Block<ChatsProps> {

	searchBouncer: number | undefined;
	chatsItems: chatListItem[] = [];

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
		this.chatsItems = this.props.chats.map((chat) => {

			const newChatData = { ...chat } as chatListItem;

			newChatData.isActive = this.props.currentChatId === chat.id;

			if (chat.last_message) {
				const hour = String(new Date(chat.last_message.time).getHours()).padStart(2, '0'),
					minutes = String(new Date(chat.last_message.time).getMinutes()).padStart(2, '0');
				newChatData.last_message.human_time = `${hour}:${minutes}`;
			}

			return newChatData as chatListItem;
		});

		return this.compile(template, { ...this.props, chatsItems: this.chatsItems });
	}
}

export const Chats = withChats(ChatsBase as unknown as typeof Block);
