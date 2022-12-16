import CheckValidity, { FieldTypes } from './ValidateField';

export default function sendForm(e?: Event): void {
	if (!e) return;
	e.preventDefault();

	if (!(e.target instanceof HTMLFormElement)) return;

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
	} else {
		const formData = new FormData(form as HTMLFormElement);
		const formObj: Record<string, unknown> = {};

		formData.forEach((value, key) => {
			formObj[key] = value;
		});

		// eslint-disable-next-line
		console.log(formObj);
		form.reset();
	}
}
