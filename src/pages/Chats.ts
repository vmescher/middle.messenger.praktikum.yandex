import ChatsLayout from '../layouts/ChatsLayout';
import Chats from '../components/Chats';
import SearchInput from '../components/utils/SearchInput';
import ReviewNav from '../components/utils/ReviewNav';

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
			value: 'Внезапно, базовые сценарии поведения пользователей, инициированные исключительно синтетически, объективно рассмотрены соответствующими инстанциями.',
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
	additionalClasses: ['chats-layout__review-nav'],
});

const chatsPage = new ChatsLayout({
	chatsList,
	reviewNav,
});

export default chatsPage;
