import Block from "../../utils/Block";
import template from "./settingsEdit.hbs";
import Input from "../utils/Input";
import PhotoInput from "../utils/PhotoInput";
import Button from "../utils/Button";

interface IUserData {
	displayName: string;
	login: string;
	name: string;
	lastName: string;
	avatar: string;
	phone: string;
	email: string;
};

type SettingsEditProps = {
	photoInput: PhotoInput;
	displayNameInput: Input;
	loginInput: Input;
	firstNameInput: Input;
	secondNameInput: Input;
	emailInput: Input;
	phoneInput: Input;
	confirmButton: Button;
	cancelButton: Button;
	userData: IUserData;
};

export class SettingsEdit extends Block<SettingsEditProps> {
	constructor(props: SettingsEditProps) {
		super('form', props);

		this.element!.classList.add('settings')
	}

	protected render() {
		return this.compile(template, { ...this.props })
	}
}
