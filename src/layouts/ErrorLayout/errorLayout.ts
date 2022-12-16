import Block from "../../utils/Block";
import template from "./errorLayout.hbs";
import ReviewNav from "../../components/utils/ReviewNav";
import Error from "../../components/Error";

type ErrorLayoutProps = {
	component: Error;
	reviewNav?: ReviewNav;
}

export class ErrorLayout extends Block<ErrorLayoutProps> {
	constructor(props: ErrorLayoutProps) {
		super('article', props);

		this.element!.classList.add('page-error');
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
