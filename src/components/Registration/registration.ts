import Block from '../../utils/Block';
import template from "./registration.hbs";
import Input from "../utils/Input";
import Link from "../utils/Link";
import Button from "../utils/Button";

type RegistrationProps = {
	loginInput: Input;
	nameInput: Input;
	lastnameInput: Input;
	emailInput: Input;
	phoneInput: Input;
	passwordInput: Input;
	submitButton: Button;
	authLink: Link;
}

export class Registration extends Block<RegistrationProps> {
	constructor(props: RegistrationProps) {
		super('div', props);

		this.element!.classList.add('form', 'form_block', 'login-layout__form');
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
