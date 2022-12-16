import Block from "../../utils/Block";
import template from "./chatsLayout.hbs";
import Chats from "../../components/Chats";
import ReviewNav from "../../components/utils/ReviewNav";
import Dialog from "../../components/Dialog";

type ChatsLayoutProps = {
	chatsList: Chats;
	dialog?: Dialog;
	reviewNav?: ReviewNav;
}

export class ChatsLayout extends Block<ChatsLayoutProps> {
	constructor(props: ChatsLayoutProps) {
		super('article', props);

		this.element!.classList.add('chats-layout');
	}

	render() {
		if (this.children.dialog) {
			this.element!.classList.add('chats-layout_dialog');
		}

		return this.compile(template, { ...this.props });
	}

	componentDidMount() {
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount()
		})
	}
}
