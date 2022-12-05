import Block from "../../../utils/Block";
import template from './button.hbs';

type ButtonProps = {
	styleClasses?: string[];
	additionalClasses?: string[];
	label: string;
	events?: Record<string, () => void>;
	type?: string;
}

export class Button extends Block<ButtonProps> {
	constructor(props: ButtonProps) {
		super('button', props);

		this.element!.classList.add('btn')
		if (this.props.type) {
			this.element!.setAttribute('type', this.props.type)
		}
	}

	render() {

		if (!this.props.styleClasses) {
			this.element!.classList.add('btn_base')
		} else {
			this.element!.classList.add(...this.props.styleClasses)
		}

		if (this.props.additionalClasses) {
			this.element!.classList.add(...this.props.additionalClasses)
		}

		return this.compile(template, { ...this.props })
	}
}
