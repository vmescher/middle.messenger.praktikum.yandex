import Input from "../../utils/Input";
import Button from "../../utils/Button";
import Block from "../../../utils/Block";
import template from "./createChat.hbs";
import validateForm from "../../../utils/validateForm";
import ChatsController from "../../../controllers/ChatsController";
import { closeModal } from "../../../utils/Modal";

interface CreateChatProps {
	titleInput: Input;
	confirmButton: Button;
	cancelButton: Button;
}

export class CreateChat extends Block<CreateChatProps> {
	constructor(props: CreateChatProps) {
		super('form', props);

		this.element!.classList.add('form');

		this.element!.addEventListener('submit', async (e) => {
			e.preventDefault();
			const isFormReady = validateForm(e);
			if (isFormReady) {

				const response = await ChatsController.create((this.children.titleInput as Input).getValue()!);

				if (response?.reason) {
					(this.children.titleInput as Input).setError(response.reason);
				} else {
					closeModal();
				}
			}
		})
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
