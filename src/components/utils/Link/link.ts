import Block from "../../../utils/Block";
import template from './link.hbs';

type LinkProps = {
	styleClasses?: string[];
	additionalClasses?: string[];
	label: string;
	href: string;
	events?: Record<string, (e?: Event) => void>;
}

export class Link extends Block<LinkProps> {
	constructor(props: LinkProps) {
		super('a', props);

		this.element!.classList.add('link')
	}

	render() {

		if (!this.props.styleClasses) {
			this.element!.classList.add('link_base')
		} else {
			this.element!.classList.add(...this.props.styleClasses)
		}

		if (this.props.additionalClasses) {
			this.element!.classList.add(...this.props.additionalClasses)
		}

		this.element!.setAttribute('href', this.props.href);

		return this.compile(template, { ...this.props })
	}
}
