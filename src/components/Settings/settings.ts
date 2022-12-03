import Block from "../../utils/Block";
import template from "./settings.hbs";
import Link from "../utils/Link";
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

type SettingsProps = {
	photoInput: PhotoInput;
	displayNameInput: Input;
	loginInput: Input;
	firstNameInput: Input;
	secondNameInput: Input;
	emailInput: Input;
	phoneInput: Input;
	editButton: Button;
	changePasswordButton: Button;
	logoutButton: Link;
	userData: IUserData;
};

export class Settings extends Block<SettingsProps> {
	constructor(props: SettingsProps) {
		super('section', props);

		this.element!.classList.add('settings')
	}

	protected render() {
		return this.compile(template, { ...this.props })
	}
}
