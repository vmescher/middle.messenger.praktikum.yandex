import CheckValidity, { FieldTypes } from './ValidateField';

export default function validateForm(e: Event): boolean {
	if (!e) {
		throw Error('event parameter is not transmitted');
	}

	if (!(e.target instanceof HTMLFormElement)) {
		throw Error('event target is not HTMLFormElement');
	}

	const form = e.target;
	let isFormValid = true;

	Array.from(form.elements).forEach((elem) => {
		if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
			const validationType = elem.getAttribute('data-validation-type');
			if (!validationType) return;

			const validity = new CheckValidity(elem, validationType as FieldTypes);

			const isInputValid = validity.checkValidity();
			if (!isInputValid) {
				isFormValid = false;
			}
		}
	});

	if (!isFormValid) {
		form.reportValidity();
	}

	return isFormValid;
}
