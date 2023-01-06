import Block from "../../../utils/Block";
import template from './routerLink.hbs';
import { PropsWithRouter, withRouter } from "../../../hocs/withRouter";

export interface RouterLinkProps extends PropsWithRouter {
	styleClasses?: string[];
	additionalClasses?: string[];
	label: string;
	href: string;
	tagName?: string;
	events?: Record<string, (e?: Event) => void>;
}

class Link extends Block<RouterLinkProps> {
	constructor(props: RouterLinkProps) {
		super(props.tagName || 'a', {...props, events: {
				click: (e) => {
					e?.preventDefault();
					this.navigate()
				}
			}});

		if (!props.tagName) {
			this.element!.classList.add('link');
		}

		this.element!.addEventListener('click', this.navigate.bind(this));
	}

	navigate() {
		this.props.router.go(this.props.href);
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

export const RouterLink = withRouter(Link as unknown as typeof Block);
