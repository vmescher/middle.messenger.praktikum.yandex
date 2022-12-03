import Block from "../../../utils/Block";
import template from './reviewNav.hbs';

type reviewNavProps = {
	additionalClasses?: string[];
};

export class ReviewNav extends Block<reviewNavProps> {
	constructor(props: reviewNavProps) {
		super('div', {...props});

		this.element!.classList.add('review-nav')
	}

	render() {
		if (this.props.additionalClasses) {
			this.element!.classList.add(...this.props.additionalClasses)
		}

		return this.compile(template, { ...this.props })
	}
}
