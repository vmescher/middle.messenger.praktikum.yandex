import ChangePassword from '../components/Modals/ChangePassword';
import ModalLayout from '../layouts/ModalsLayout';
import Input from '../components/utils/Input';
import Button from '../components/utils/Button';
import { closeModal } from '../utils/Modal';
import sendForm from '../utils/SendForm';

const oldPasswordInput = new Input({
	type: 'password',
	label: 'Old password',
	placeholder: 'Old password',
	name: 'oldPassword',
	validationType: 'password',
});

const newPasswordInput = new Input({
	type: 'password',
	label: 'New password',
	placeholder: 'New password',
	name: 'newPassword',
	validationType: 'password',
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

const changePasswordForm = new ChangePassword({
	oldPasswordInput,
	newPasswordInput,
	confirmButton,
	cancelButton,
	events: {
		submit: sendForm,
	},
});

const changePasswordModal = new ModalLayout({
	modal: changePasswordForm,
});

export default changePasswordModal;
