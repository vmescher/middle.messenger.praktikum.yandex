import ModalLayout from '../layouts/ModalsLayout';
import Input from '../components/utils/Input';
import Button from '../components/utils/Button';
import { closeModal } from '../utils/Modal';
import CreateChat from "../components/Modals/CreateChat";

const titleInput = new Input({
	type: 'text',
	label: 'Chat title',
	placeholder: 'Chat title',
	name: 'title',
	validationType: 'base',
});

const confirmButton = new Button({
	label: 'Confirm',
	styleClasses: ['btn_trans'],
	additionalClasses: ['form__submit-btn'],
});

const cancelButton = new Button({
	label: 'Cancel',
	additionalClasses: ['form__submit-btn'],
	events: {
		click: () => closeModal(),
	},
});

const CreateChatForm = new CreateChat({
	titleInput,
	confirmButton,
	cancelButton,
});

const CreateChatModal = new ModalLayout({
	modal: CreateChatForm,
});

export default CreateChatModal;
