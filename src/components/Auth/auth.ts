import Block from '../../utils/Block';
import template from "./auth.hbs";
import Input from "../utils/Input";
import Link from "../utils/Link";
import Button from "../utils/Button";

type AuthProps = {
	loginInput: Input;
	passwordInput: Input;
	submitButton: Button;
	registrationLink: Link;
}

export class Auth extends Block<AuthProps> {
	constructor(props: AuthProps) {
		super('div', props);

		this.element!.classList.add('form', 'form_block', 'login-layout__form');
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
