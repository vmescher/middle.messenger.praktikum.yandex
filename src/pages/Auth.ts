import Auth from "../components/Auth";
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

const passwordInput = new Input({
	label: 'Password',
	type: 'password',
	placeholder: 'Password',
	name: 'password',
});

const submitButton = new Button({
	label: 'Sign In',
	additionalClasses: ['form__submit-btn'],
});

const registrationLink = new Link({
	label: 'Sign Up',
	href: '#',
});

const auth = new Auth({
	loginInput,
	passwordInput,
	submitButton,
	registrationLink,
});

const reviewNav = new ReviewNav({
	additionalClasses: ['login-layout__review-nav']
});

const authPage = new EntranceLayout({
	component: auth,
	reviewNav: reviewNav,
});
export default authPage;
