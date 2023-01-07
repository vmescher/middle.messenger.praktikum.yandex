import Block from "../../utils/Block";
import template from "./chatsLayout.hbs";
import Chats from "../../components/Chats";
import Dialog from "../../components/Dialog";

type ChatsLayoutProps = {
	chatsList: Chats;
	dialog?: Dialog;
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
}
