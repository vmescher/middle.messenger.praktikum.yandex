import Block from '../../utils/Block';
import template from "./registration.hbs";
import Input from "../utils/Input";
import Button from "../utils/Button";
import validateForm from "../../utils/validateForm";
import { RegistrationData } from "../../typings/interfaces";
import AuthController from "../../controllers/AuthController";

type RegistrationProps = {
	loginInput: Input;
	nameInput: Input;
	lastnameInput: Input;
	emailInput: Input;
	phoneInput: Input;
	passwordInput: Input;
	submitButton: Button;
	authLink: Block;
	events?: Record<string, (e?: Event) => void>;

}

export class Registration extends Block<RegistrationProps> {
	constructor(props: RegistrationProps) {
		super('form', props);

		this.element!.classList.add('form', 'form_block', 'login-layout__form');
		this.element!.addEventListener('submit', async (e) => {
			e.preventDefault();

			const isFormReady = validateForm(e);
			if (isFormReady) {
				const values = Object
					.values(this.children)
					.filter(child => child instanceof Input)
					.map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

				const data = Object.fromEntries(values);

				await AuthController.signup(data as RegistrationData);
			}
		});
		this.element!.addEventListener('reset', async () => {
			Object.values(this.children)
				.filter(child => child instanceof Input)
				.forEach((child) => ((child as Input).setProps({ value: ''})));
		})
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
