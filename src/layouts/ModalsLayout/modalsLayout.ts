import Block from "../../utils/Block";
import template from "./modalsLayout.hbs";

type modalProps = {
	modal: Partial<Block>;
};

export class ModalLayout extends Block<modalProps> {
	constructor(props: modalProps) {
		super('section', props);

		this.element!.classList.add('modal')
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}

