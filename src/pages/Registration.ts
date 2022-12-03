import Registration from "../components/Registration";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";
import Link from "../components/utils/Link";
import EntranceLayout from "../layouts/EntranceLayout";
import ReviewNav from "../components/utils/ReviewNav";

const loginInput = new Input({
	label: 'Login',
	type: 'text',
	placeholder: 'Login',
	name: 'login',
});

const nameInput = new Input({
	label: 'First name',
	type: 'text',
	placeholder: 'First name',
	name: 'first_name',
});

const lastnameInput = new Input({
	label: 'Last name',
	type: 'text',
	placeholder: 'Last name',
	name: 'second_name',
});

const emailInput = new Input({
	label: 'E-mail',
	type: 'email',
	placeholder: 'E-mail',
	name: 'email',
});

const phoneInput = new Input({
	label: 'Phone',
	type: 'tel',
	placeholder: 'Phone',
	name: 'phone',
});

const passwordInput = new Input({
	label: 'Password',
	type: 'password',
	placeholder: 'Password',
	name: 'password',
});

const submitButton = new Button({
	label: 'Sign Up',
	additionalClasses: ['form__submit-btn'],
});

const authLink = new Link({
	label: 'Sign In',
	href: '#',
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

const reviewNav = new ReviewNav({
	additionalClasses: ['login-layout__review-nav']
});

const registrationPage = new EntranceLayout({
	component: registration,
	reviewNav: reviewNav,
});

export default registrationPage;
