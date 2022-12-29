import Block from "../../utils/Block";
import template from "./settings.hbs";
import Link from "../utils/Link";
import Input from "../utils/Input";
import PhotoInput from "../utils/PhotoInput";
import Button from "../utils/Button";
import {withStore} from "../../hocs/withStore";
import {IUser} from "../../typings/interfaces";
import {isEqual} from "../../utils/helpers";

interface SettingsProps {
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
	user_data: IUser;
};

class SettingsBase extends Block<SettingsProps> {
	constructor(props: SettingsProps) {
		super('section', props);

		this.element!.classList.add('settings')
	}

	async init() {
		if (this.props.user_data) {
			this.updateUserData();
		}
	}

	getInputs(): Array<Input | PhotoInput> {
		// @ts-ignore
		return Object.values(this.children).filter(child => child instanceof Input || child instanceof PhotoInput);
	}

	updateUserData() {
		this.getInputs()
			.forEach((child: Input | PhotoInput) => {
				const dataItem = this.props.user_data[child.getName()];
				if (dataItem) {
					child.setProps({ value: String(dataItem) });
				}
			});
	}

	protected componentDidUpdate(oldProps: SettingsProps, newProps: SettingsProps) {
		if (!isEqual(oldProps.user_data || {}, newProps.user_data)) {
			this.updateUserData();
		}
		return true
	}

	protected render() {
		return this.compile(template, { ...this.props })
	}
}

const withUser = withStore((state) => {
	return {
		user_data: state.user.user_data ? { ...state.user.user_data } : null,
	}
});
export const Settings = withUser(SettingsBase as unknown as typeof Block);
