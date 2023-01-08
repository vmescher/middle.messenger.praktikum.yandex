import Block from "../../utils/Block";
import template from "./modalsLayout.hbs";
import {closeModal} from "../../utils/Modal";

type modalProps = {
	modal: Partial<Block>;
};

export class ModalLayout extends Block<modalProps> {
	constructor(props: modalProps) {
		super('section', props);

		this.element!.classList.add('modal');

		this.element!.addEventListener('mousedown', (e) => {
			if (!e.target) return;

			if ((e.target as HTMLElement).closest('.modal__close') || e.target === this.element) {
				closeModal();
			}
		})
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}

