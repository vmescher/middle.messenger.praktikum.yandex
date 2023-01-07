import ChatsLayout from '../layouts/ChatsLayout';
import Chats from '../components/Chats';
import SearchInput from '../components/utils/SearchInput';
import RouterLink from "../components/utils/RouterLink";
import {Routes} from "../typings/enums";

const searchInput = new SearchInput({
	name: 'chat-search',
	additionalClasses: ['chats-nav__search'],
	placeholder: 'Search',
});

const settingsLink = new RouterLink({
	styleClasses: ['chats-nav__settings'],
	tagName: 'a',
	href: Routes.Settings,
})

const chatsList = new Chats({
	searchInput,
	settingsLink,
});

export default class chatsPage extends ChatsLayout {
	constructor() {
		super({
			chatsList,
		});
	}
};
