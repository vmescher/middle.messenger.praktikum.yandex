import Block from "../../utils/Block";
import template from "./error.hbs";
import Link from "../utils/Link";

type ErrorProps = {
	title: string;
	message: string;
	backLink?: Link;
}

export class Error extends Block<ErrorProps> {
	constructor(props: ErrorProps) {
		super('div', props);

		this.element!.classList.add('page-error__content');
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
