import Block from "../../utils/Block";
import template from "./entranceLayout.hbs";
import Auth from "../../components/Auth";
import Registration from "../../components/Registration";
import ReviewNav from "../../components/utils/ReviewNav";

type EntranceLayoutProps = {
	component: Auth | Registration;
	reviewNav?: ReviewNav;
}

export class EntranceLayout extends Block<EntranceLayoutProps> {
	constructor(props: EntranceLayoutProps) {
		super('article', props);

		this.element!.classList.add('login-layout');
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
