import Block from "../../utils/Block";
import template from "./dialog.hbs";
import ReviewNav from "../utils/ReviewNav";
import MessageInput from "../utils/MessageInput";

type DialogProps = {
	dialogData: Record<string, unknown>;
	messageInput: MessageInput;
	actionsList?: object[];
	reviewNav?: ReviewNav;
};

export class Dialog extends Block<DialogProps> {
	constructor(props: DialogProps) {
		super('section', props);

		this.element!.classList.add('dialog')
	}

	render() {
		return this.compile(template, { ...this.props });
	}

	componentDidMount() {
		const dialogListItem = document.querySelector(`[data-chat-id="${this.props.dialogData.id}"]`);
		if (dialogListItem) {
			dialogListItem.classList.add('chats-item_active');
		}

		const dialogTimeline = document.querySelector('.dialog-timeline');
		if (dialogTimeline) {
			dialogTimeline.scrollTop = dialogTimeline.scrollHeight;
		}
	}
}
