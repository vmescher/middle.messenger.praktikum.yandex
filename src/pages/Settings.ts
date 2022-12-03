import Settings from "../components/Settings";
import PhotoInput from "../components/utils/PhotoInput";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";
import Link from "../components/utils/Link";
import SettingsLayout from "../layouts/SettingsLayout";
import ReviewNav from "../components/utils/ReviewNav";
import changePasswordModal from "../modals/ChangePassword";
import { openModal } from "../utils/Modal";

const userData = {
	displayName: 'Super Ivan',
	login: 's_ivan001',
	name: 'Ivan',
	lastName: 'Ivanov',
	avatar: './img/person.jpeg',
	phone: '89998454455',
	email: 'ivan@ivan.ru',
};

const modals = {
	changePasswordModal,
};

const photoInput = new PhotoInput({
	additionalClasses: ['settings__photo'],
	accept: 'image/*',
	name: 'avatar',
	disabled: true,
	imageAlt: 'user avatar',
	imageUrl: userData.avatar,
});

const displayNameInput = new Input({
	label: 'Chat name',
	disabled: true,
	name: 'display_name',
	placeholder: 'Chat name',
	type: 'text',
	value: userData.displayName,
});

const loginInput = new Input({
	label: 'Login',
	disabled: true,
	name: 'login',
	placeholder: 'Login',
	type: 'text',
	value: userData.login,
});

const firstNameInput = new Input({
	label: 'First name',
	disabled: true,
	name: 'first_name',
	placeholder: 'First name',
	type: 'text',
	value: userData.name,
});

const secondNameInput = new Input({
	label: 'Last name',
	disabled: true,
	name: 'second_name',
	placeholder: 'Last name',
	type: 'text',
	value: userData.lastName,
});

const emailInput = new Input({
	label: 'E-mail',
	disabled: true,
	name: 'email',
	placeholder: 'E-mail',
	type: 'email',
	value: userData.email,
});

const phoneInput = new Input({
	label: 'Phone',
	disabled: true,
	name: 'phone',
	placeholder: 'Phone',
	type: 'tel',
	value: userData.phone,
});

const editButton = new Button({
	label: 'Edit',
	additionalClasses: ['form__submit-btn']
});

const changePasswordButton = new Button({
	label: 'Change password',
	additionalClasses: ['form__submit-btn'],
	events: {
		click: () => openModal(modals.changePasswordModal)
	}
});

const logoutButton = new Link({
	label: 'Logout',
	href: '#',
	styleClasses: ['link_red']
});

const reviewNav = new ReviewNav({
	additionalClasses: ['settings-layout__review-nav']
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
	editButton,
	changePasswordButton,
	logoutButton
});

const backLink = new Link({
	additionalClasses: ['settings-layout__back'],
	styleClasses: ['link_back'],
	label: 'Back to chats',
	href: '#',
});

const settingsPage = new SettingsLayout({
	backLink: backLink,
	component: settings,
	reviewNav: reviewNav,
});

export default settingsPage;
