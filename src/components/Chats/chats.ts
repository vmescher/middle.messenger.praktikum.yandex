import Block from "../../utils/Block";
import template from "./chats.hbs";
import SearchInput from "../utils/SearchInput";

type ChatsProps = {
	chatsData: object[];
	searchInput: SearchInput;
};

export class Chats extends Block<ChatsProps> {
	constructor(props: ChatsProps) {
		super('section', props);

		this.element!.classList.add('chats');
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
