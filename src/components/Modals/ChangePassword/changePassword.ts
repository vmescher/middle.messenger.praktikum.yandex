import Block from "../../../utils/Block";
import template from "./changePassword.hbs";
import Input from "../../utils/Input";
import Button from "../../utils/Button";

type ChangePasswordProps = {
	oldPasswordInput: Input;
	newPasswordInput: Input;
	confirmButton: Button;
	cancelButton: Button;
};

export class ChangePassword extends Block<ChangePasswordProps> {
	constructor(props: ChangePasswordProps) {
		super('form', props);

		this.element!.classList.add('form');
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
