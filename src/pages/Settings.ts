import Settings from '../components/Settings';
import PhotoInput from '../components/utils/PhotoInput';
import Input from '../components/utils/Input';
import Button from '../components/utils/Button';
import Link from '../components/utils/Link';
import SettingsLayout from '../layouts/SettingsLayout';
import changePasswordModal from '../modals/ChangePassword';
import { openModal } from '../utils/Modal';
import {Routes, User} from "../typings/enums";
import AuthController from "../controllers/AuthController";
import RouterLink from "../components/utils/RouterLink";

const modals = {
	changePasswordModal,
};

const photoInput = new PhotoInput({
	additionalClasses: ['settings__photo'],
	accept: 'image/*',
	name: User.avatar,
	disabled: true,
	imageAlt: 'user avatar',
});

const displayNameInput = new Input({
	label: 'Chat name',
	disabled: true,
	name: User.display_name,
	placeholder: 'Chat name',
	type: 'text',
	validationType: 'name',
});

const loginInput = new Input({
	label: 'Login',
	disabled: true,
	name: User.login,
	placeholder: 'Login',
	type: 'text',
	validationType: 'login',
});

const firstNameInput = new Input({
	label: 'First name',
	disabled: true,
	name: User.first_name,
	placeholder: 'First name',
	type: 'text',
	validationType: 'name',
});

const secondNameInput = new Input({
	label: 'Last name',
	disabled: true,
	name: User.second_name,
	placeholder: 'Last name',
	type: 'text',
	validationType: 'name',
});

const emailInput = new Input({
	label: 'E-mail',
	disabled: true,
	name: User.email,
	placeholder: 'E-mail',
	type: 'email',
	validationType: 'email',
});

const phoneInput = new Input({
	label: 'Phone',
	disabled: true,
	name: User.phone,
	placeholder: 'Phone',
	type: 'tel',
	validationType: 'phone',
});

const editButton = new Button({
	label: 'Edit',
	additionalClasses: ['form__submit-btn'],
});

const changePasswordButton = new Button({
	label: 'Change password',
	additionalClasses: ['form__submit-btn'],
	events: {
		click: () => openModal(modals.changePasswordModal),
	},
});

const logoutButton = new Link({
	label: 'Logout',
	href: '#',
	styleClasses: ['link_red'],
	events: {
		click: (e) => {
			e!.preventDefault();
			AuthController.logout()
		}
	}
});

const settings = new Settings({
	photoInput,
	displayNameInput,
	loginInput,
	firstNameInput,
	secondNameInput,
	phoneInput,
	emailInput,
	editButton,
	changePasswordButton,
	logoutButton,
});

const backLink = new RouterLink({
	additionalClasses: ['settings-layout__back'],
	styleClasses: ['link_back'],
	label: 'Back to chats',
	href: Routes.Messenger,
});

export default class settingsPage extends SettingsLayout {
	constructor() {
		super({
			backLink,
			component: settings,
		});
	}
}
