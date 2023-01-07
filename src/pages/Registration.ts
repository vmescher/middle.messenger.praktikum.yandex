import Registration from '../components/Registration';
import Input from '../components/utils/Input';
import Button from '../components/utils/Button';
import EntranceLayout from '../layouts/EntranceLayout';
import RouterLink from "../components/utils/RouterLink";
import {Routes} from "../typings/enums";

const loginInput = new Input({
	label: 'Login',
	type: 'text',
	placeholder: 'Login',
	name: 'login',
	validationType: 'login',
});

const nameInput = new Input({
	label: 'First name',
	type: 'text',
	placeholder: 'First name',
	name: 'first_name',
	validationType: 'name',
});

const lastnameInput = new Input({
	label: 'Last name',
	type: 'text',
	placeholder: 'Last name',
	name: 'second_name',
	validationType: 'name',
});

const emailInput = new Input({
	label: 'E-mail',
	type: 'email',
	placeholder: 'E-mail',
	name: 'email',
	validationType: 'email',
});

const phoneInput = new Input({
	label: 'Phone',
	type: 'tel',
	placeholder: 'Phone',
	name: 'phone',
	validationType: 'phone',
});

const passwordInput = new Input({
	label: 'Password',
	type: 'password',
	placeholder: 'Password',
	name: 'password',
	validationType: 'password',
});

const submitButton = new Button({
	label: 'Sign Up',
	additionalClasses: ['form__submit-btn'],
	type: 'submit',
});

const authLink = new RouterLink({
	label: 'Sign In',
	href: Routes.Login,
});

const registration = new Registration({
	loginInput,
	nameInput,
	lastnameInput,
	emailInput,
	phoneInput,
	passwordInput,
	submitButton,
	authLink,
});

export default class registrationPage extends EntranceLayout {
	constructor() {
		super({
			component: registration,
		});
	}
};
