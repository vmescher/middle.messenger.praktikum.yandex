import Block from '../../../utils/Block';
import template from './input.hbs';
import CheckValidity, { FieldTypes } from "../../../utils/ValidateField";

type inputTypes = 'text' | 'email' | 'password' | 'tel' | 'num'

type InputProps = {
	styleClasses?: string[];
	additionalClasses?: string[];
	label: string;
	placeholder: string;
	name: string;
	type: inputTypes;
	value?: string;
	disabled?: boolean;
	error?: string;
	validationType: FieldTypes;
	events?: Record<string, (e?: Event) => void>;
}

export class Input extends Block<InputProps> {
	constructor(props: InputProps) {
		super('label', props);

		this.element!.classList.add('default-input');

		this.element!.addEventListener('focusin', this.checkValidation.bind(this));
	}

	checkValidation(): void {
		const inputField = this.element!.querySelector('.default-input__input');
		if (!inputField) return;

		inputField.addEventListener('blur', (e) => {
			const target = e.target as HTMLInputElement;
			const validity = new CheckValidity(target, this.props.validationType);

			validity.checkValidity();
			this.setProps({ error: validity.getError(), value: target!.value });

		}, { once: true });
	};

	getName() {
		return this.props.name;
	}

	setError(errorMessage: string) {
		this.setProps({ error: errorMessage });
	}

	getValue() {
		return this.props.value;
	}

	render() {
		if (this.props.styleClasses) {
			this.element!.classList.add(...this.props.styleClasses)
		}

		if (this.props.additionalClasses) {
			this.element!.classList.add(...this.props.additionalClasses)
		}

		if (this.props.error) {
			this.element!.classList.add('default-input_error')
		} else {
			this.element!.classList.remove('default-input_error')
		}

		if (this.props.value) {
			this.element!.classList.add('default-input_dirty')
		} else {
			this.element!.classList.remove('default-input_dirty')
		}

		if (this.props.disabled) {
			this.element!.classList.add('default-input_disabled')
		} else {
			this.element!.classList.remove('default-input_disabled')
		}

		return this.compile(template, { ...this.props })
	}
}
