import ChatsLayout from '../layouts/ChatsLayout';
import Chats from '../components/Chats';
import SearchInput from '../components/utils/SearchInput';
import RouterLink from "../components/utils/RouterLink";
import {Routes} from "../typings/enums";
// import MessageInput from "../components/utils/MessageInput";
import { withChats } from "../utils/Store";
import Block from "../utils/Block";
import template from "../layouts/ChatsLayout/chatsLayout.hbs";

const searchInput = new SearchInput({
	name: 'chat-search',
	additionalClasses: ['chats-nav__search'],
	placeholder: 'Search',
});

const settingsLink = new RouterLink({
	styleClasses: ['chats-nav__settings'],
	tagName: 'a',
	href: Routes.Settings,
});

const chatsList = new Chats({
	searchInput,
	settingsLink,
});

// const messageInput = new MessageInput({
// 	fileSettings: {
// 		multiple: false,
// 		name: 'message-file',
// 		accept: 'image/*',
// 	},
// 	messageSettings: {
// 		name: 'message',
// 		placeholder: 'Write a message...',
// 		validationType: 'base',
// 	},
// });

// const dialog = new Dialog({
// 	dialogData,
// 	actionsList,
// 	messageInput,
// 	reviewNav,
// });

class chatsPageBase extends ChatsLayout {
	constructor() {
		super({
			chatsList,
		});
	};
	render() {
		if (this.children.dialog) {
			this.element!.classList.add('chats-layout_dialog');
		}
		return this.compile(template, { ...this.props });
	}

	init() {
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount();
		})
	}
}

const ChatsPage = withChats(chatsPageBase as unknown as typeof Block);

export default ChatsPage;
