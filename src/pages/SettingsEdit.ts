import Settings from '../components/SettingsEdit';
import PhotoInput from '../components/utils/PhotoInput';
import Input from '../components/utils/Input';
import Button from '../components/utils/Button';
import SettingsLayout from '../layouts/SettingsLayout';
import RouterLink from "../components/utils/RouterLink";
import {Routes, User} from "../typings/enums";

const photoInput = new PhotoInput({
	additionalClasses: ['settings__photo'],
	accept: 'image/*',
	name: User.avatar,
	imageAlt: 'user avatar',
});

const displayNameInput = new Input({
	label: 'Chat name',
	name: User.display_name,
	placeholder: 'Chat name',
	type: 'text',
	validationType: 'name',
});

const loginInput = new Input({
	label: 'Login',
	name: User.login,
	placeholder: 'Login',
	type: 'text',
	validationType: 'login',
});

const firstNameInput = new Input({
	label: 'First name',
	name: User.first_name,
	placeholder: 'First name',
	type: 'text',
	validationType: 'name',
});

const secondNameInput = new Input({
	label: 'Last name',
	name: User.second_name,
	placeholder: 'Last name',
	type: 'text',
	validationType: 'name',
});

const emailInput = new Input({
	label: 'E-mail',
	name: User.email,
	placeholder: 'E-mail',
	type: 'email',
	validationType: 'email',
});

const phoneInput = new Input({
	label: 'Phone',
	name: User.phone,
	placeholder: 'Phone',
	type: 'tel',
	validationType: 'phone',
});

const confirmButton = new Button({
	label: 'Confirm',
	additionalClasses: ['form__submit-btn'],
	type: 'submit',
});

const cancelButton = new RouterLink({
	label: 'Cancel',
	styleClasses: ['btn', 'btn_base', 'btn_trans'],
	tagName: 'a',
	href: Routes.Settings,
});

const settings = new Settings({
	photoInput,
	displayNameInput,
	loginInput,
	firstNameInput,
	secondNameInput,
	phoneInput,
	emailInput,
	confirmButton,
	cancelButton,
});

const backLink = new RouterLink({
	additionalClasses: ['settings-layout__back'],
	styleClasses: ['link_back'],
	label: 'Back to chats',
	href: Routes.Messenger,
});

export default class settingsEditPage extends SettingsLayout {
	constructor() {
		super({
			backLink,
			component: settings,
		});
	}
}

