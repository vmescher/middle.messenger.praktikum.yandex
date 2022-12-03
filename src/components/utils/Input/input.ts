import Block from '../../../utils/Block';
import template from './input.hbs';

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
	events?: Record<string, (e?: Event) => void>;
}

export class Input extends Block<InputProps> {
	constructor(props: InputProps) {
		super('label', props);

		this.element!.classList.add('default-input');
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
		}
		if (this.props.value) {
			this.element!.classList.add('default-input_dirty')
		}
		if (this.props.disabled) {
			this.element!.classList.add('default-input_disabled')
		}

		return this.compile(template, { ...this.props })
	}
}
