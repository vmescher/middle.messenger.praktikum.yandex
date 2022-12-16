import ChatsLayout from '../layouts/ChatsLayout';
import Chats from '../components/Chats';
import SearchInput from '../components/utils/SearchInput';
import Dialog from '../components/Dialog';
import ReviewNav from '../components/utils/ReviewNav';
import MessageInput from '../components/utils/MessageInput';
import sendForm from '../utils/SendForm';

const chatsData = [
	{
		id: 11,
		user: {
			id: 34,
			displayName: 'Марат',
			avatar: './img/person.jpeg',
		},
		unreadMessages: 0,
		lastMessage: {
			value: 'Презентация',
			date: '2022-12-04T11:10:34.368Z',
			humanDate: '15:10',
			senderId: 34,
		},
	},
	{
		id: 25,
		user: {
			id: 12,
			displayName: 'Олег',
			avatar: './img/person2.jpeg',
		},
		unreadMessages: 4,
		lastMessage: {
			value: 'Картельные сговоры не допускают ситуации, при которой многие известные личности разоблачены.',
			date: '2022-12-04T04:10:34.368Z',
			humanDate: '09:10',
			senderId: 12,
		},
	},
];

const dialogData = {
	id: 11,
	user: {
		id: 34,
		displayName: 'Марат',
		avatar: './img/person.jpeg',
	},
};

const actionsList = [
	{
		action: 'remove',
		name: 'Удалить чат',
	},
];

const searchInput = new SearchInput({
	name: 'chat-search',
	additionalClasses: ['chats-nav__search'],
	placeholder: 'Search',
});

const chatsList = new Chats({
	chatsData,
	searchInput,
});

const reviewNav = new ReviewNav({
	additionalClasses: ['dialog__review-nav'],
});

const messageInput = new MessageInput({
	fileSettings: {
		multiple: false,
		name: 'message-file',
		accept: 'image/*',
	},
	messageSettings: {
		name: 'message',
		placeholder: 'Write a message...',
		validationType: 'message',
	},
	events: {
		submit: sendForm,
	},
});

const dialog = new Dialog({
	dialogData,
	actionsList,
	messageInput,
	reviewNav,
});

const dialogPage = new ChatsLayout({
	chatsList,
	dialog,
});

export default dialogPage;
