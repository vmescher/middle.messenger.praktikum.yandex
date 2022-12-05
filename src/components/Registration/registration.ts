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
	events?: Record<string, (e?: Event) => void>;

}

export class Registration extends Block<RegistrationProps> {
	constructor(props: RegistrationProps) {
		super('form', props);

		this.element!.classList.add('form', 'form_block', 'login-layout__form');
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
