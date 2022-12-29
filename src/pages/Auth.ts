import Auth from '../components/Auth';
import Input from '../components/utils/Input';
import Button from '../components/utils/Button';
import EntranceLayout from '../layouts/EntranceLayout';
import RouterLink from "../components/utils/RouterLink";

const loginInput = new Input({
	label: 'Login',
	type: 'text',
	placeholder: 'Login',
	name: 'login',
	validationType: 'login',
});

const passwordInput = new Input({
	label: 'Password',
	type: 'password',
	placeholder: 'Password',
	name: 'password',
	validationType: 'password',
});

const submitButton = new Button({
	label: 'Sign In',
	additionalClasses: ['form__submit-btn'],
	type: 'submit',
});

const registrationLink = new RouterLink({
	label: 'Sign Up',
	href: '/sign-up',
});

const auth = new Auth({
	loginInput,
	passwordInput,
	submitButton,
	registrationLink,
});

export default class authPage extends EntranceLayout {
	constructor() {
		super({
			component: auth,
		});
	}
}
