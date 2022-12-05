import Settings from '../components/SettingsEdit';
import PhotoInput from '../components/utils/PhotoInput';
import Input from '../components/utils/Input';
import Button from '../components/utils/Button';
import Link from '../components/utils/Link';
import SettingsLayout from '../layouts/SettingsLayout';
import ReviewNav from '../components/utils/ReviewNav';
import sendForm from '../utils/SendForm';

const userData = {
	displayName: 'Super Ivan',
	login: 's_ivan001',
	name: 'Ivan',
	lastName: 'Ivanov',
	avatar: './img/person.jpeg',
	phone: '89998454455',
	email: 'ivan@ivan.ru',
};

const photoInput = new PhotoInput({
	additionalClasses: ['settings__photo'],
	accept: 'image/*',
	name: 'avatar',
	imageAlt: 'user avatar',
	imageUrl: userData.avatar,
});

const displayNameInput = new Input({
	label: 'Chat name',
	name: 'display_name',
	placeholder: 'Chat name',
	type: 'text',
	value: userData.displayName,
	validationType: 'name',
});

const loginInput = new Input({
	label: 'Login',
	name: 'login',
	placeholder: 'Login',
	type: 'text',
	value: userData.login,
	validationType: 'login',
});

const firstNameInput = new Input({
	label: 'First name',
	name: 'first_name',
	placeholder: 'First name',
	type: 'text',
	value: userData.name,
	validationType: 'name',
});

const secondNameInput = new Input({
	label: 'Last name',
	name: 'second_name',
	placeholder: 'Last name',
	type: 'text',
	value: userData.lastName,
	validationType: 'name',
});

const emailInput = new Input({
	label: 'E-mail',
	name: 'email',
	placeholder: 'E-mail',
	type: 'email',
	value: userData.email,
	validationType: 'email',
});

const phoneInput = new Input({
	label: 'Phone',
	name: 'phone',
	placeholder: 'Phone',
	type: 'tel',
	value: userData.phone,
	validationType: 'phone',
});

const confirmButton = new Button({
	label: 'Confirm',
	additionalClasses: ['form__submit-btn'],
	type: 'submit',
});

const cancelButton = new Button({
	label: 'Cancel',
	styleClasses: ['btn_trans'],
});

const reviewNav = new ReviewNav({
	additionalClasses: ['settings-layout__review-nav'],
});

const settings = new Settings({
	userData,
	photoInput,
	displayNameInput,
	loginInput,
	firstNameInput,
	secondNameInput,
	phoneInput,
	emailInput,
	confirmButton,
	cancelButton,
	events: {
		submit: sendForm,
	},
});

const backLink = new Link({
	additionalClasses: ['settings-layout__back'],
	styleClasses: ['link_back'],
	label: 'Back to chats',
	href: '#',
});

const settingsEditPage = new SettingsLayout({
	backLink,
	component: settings,
	reviewNav,
});

export default settingsEditPage;
