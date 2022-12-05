import ModalLayout from '../layouts/ModalsLayout';

function openModal(modal: ModalLayout): void {
	const root = document.querySelector('#app');
	if (!root) return;

	let modalsContainer = root.querySelector('.modal-container');
	if (!modalsContainer) {
		modalsContainer = document.createElement('div');
		modalsContainer.classList.add('modal-container');
		root.append(modalsContainer);
	}

	modalsContainer.append(modal.getContent()!);
}

function closeModal() {
	const modalsContainer = document.querySelector('.modal-container');
	if (!modalsContainer) return;

	modalsContainer.innerHTML = '';
}

export { openModal, closeModal };
