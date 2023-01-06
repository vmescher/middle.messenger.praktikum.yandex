import Block from "../../utils/Block";
import template from "./settingsEdit.hbs";
import Input from "../utils/Input";
import PhotoInput from "../utils/PhotoInput";
import Button from "../utils/Button";
import {IUser, UserData} from "../../typings/interfaces";
import {withUser} from "../../utils/Store";
import {isEqual} from "../../utils/helpers";
import validateForm from "../../utils/validateForm";
import UserController from "../../controllers/UserController";
import {User} from "../../typings/enums";

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
	user_data: IUser;
	events?: Record<string, (e?: Event) => void>;
};

class SettingsEditBase extends Block<SettingsEditProps> {
	constructor(props: SettingsEditProps) {
		super('form', props);

		this.element!.classList.add('settings')
		this.element!.addEventListener('submit', this.sendForm.bind(this));
	}

	async init() {
		if (this.props.user_data) {
			this.updateUserData();
		}
	}

	async sendForm(e: Event) {
		e.preventDefault();

		const isFormReady = validateForm(e);
		if (isFormReady) {
			const fieldsValues = this.getInputs()
				.map((child) => ([child.getName(), child.getValue()]));

			const data = Object.fromEntries(fieldsValues);
			const response = await UserController.update(data as UserData);

			if (response?.reason) {
				this.getInputs()
					.forEach((child) => {
						if ((child).getName() === User.display_name) {
							(child).setError(response.reason);
						}
					});
			}
		}
	}

	updateUserData() {
		[...this.getInputs(), this.getPhotoInput()]
			.forEach((child: Input | PhotoInput) => {
				const dataItem = this.props.user_data[child.getName()];
				if (dataItem) {
					child.setProps({ value: String(dataItem) });
				}
			});
	}

	getInputs(): Array<Input> {
		return Object.values(this.children).filter(child => child instanceof Input) as Array<Input>;
	}

	getPhotoInput(): PhotoInput {
		return Object.values(this.children).find((child) => child instanceof PhotoInput) as PhotoInput;
	}

	protected componentDidUpdate(oldProps: SettingsEditProps, newProps: SettingsEditProps) {
		if (!isEqual(oldProps.user_data || {}, newProps.user_data)) {
			this.updateUserData();
		}
		return true
	}

	protected render() {
		return this.compile(template, { ...this.props })
	}
}

export const SettingsEdit = withUser(SettingsEditBase as unknown as typeof Block);
