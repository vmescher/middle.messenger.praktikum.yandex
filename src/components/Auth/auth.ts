import Block from '../../utils/Block';
import template from "./auth.hbs";
import Input from "../utils/Input";
import Button from "../utils/Button";
import AuthController from "../../controllers/AuthController";
import validateForm from "../../utils/validateForm";
import { LoginData } from "../../typings/interfaces";

type AuthProps = {
	loginInput: Input;
	passwordInput: Input;
	submitButton: Button;
	registrationLink: Block;
	events?: Record<string, (e?: Event) => void>;

}

export class Auth extends Block<AuthProps> {
	constructor(props: AuthProps) {
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
				const response = await AuthController.signin(data as LoginData);

				if (response?.reason) {
					Object.values(this.children)
						.filter(child => child instanceof Input)
						.forEach((child) => {
							if ((child as Input).getName() === 'login') {
								(child as Input).setError(response.reason);
							}
						});
				}
			}
		});
		this.element!.addEventListener('reset', async () => {
			Object.values(this.children)
				.filter(child => child instanceof Input)
				.forEach((child) => ((child as Input).setProps({ value: ''})));
		})
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
