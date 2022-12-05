import Block from "../../../utils/Block";
import template from "./messageInput.hbs";
import CheckValidity, {FieldTypes} from "../../../utils/ValidateField";

type FileSettings = {
	name: string;
	accept: string;
	multiple: boolean;
};

type MessageSettings = {
	name: string;
	placeholder: string;
	value?: string;
	validationType: FieldTypes;
};

type MessageInputProps = {
	fileSettings: FileSettings;
	messageSettings: MessageSettings;
	events?: Record<string, (e?: Event) => void>;
};


export class MessageInput extends Block<MessageInputProps> {
	constructor(props: MessageInputProps) {
		super('form', props);

		this.element!.classList.add('toolbar');
		this.element!.addEventListener('focusin', this.checkValidation.bind(this));
	}

	checkValidation(): void {
		const inputField = this.element!.querySelector('.toolbar-message__textarea');
		if (!inputField) return;

		inputField.addEventListener('blur', (e) => {
			const target = e.target as HTMLInputElement;
			const validity = new CheckValidity(target, this.props.messageSettings.validationType);
			const isInputValid = validity.checkValidity();

			if (!isInputValid) {
				validity.reportValidity()
			}

		}, { once: true });
	};

	render() {
		return this.compile(template, { ...this.props })
	}
}
