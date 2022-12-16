type FieldTypes = 'name' | 'login' | 'email' | 'password' | 'phone' | 'message'

type RuleType<P> = {
	message?: string;
	value: P;
};
interface ValidationRules {
	pattern?: RuleType<string>;
	required: RuleType<boolean>;
	maxlength?: RuleType<number>;
	minlength?: RuleType<number>;
}

class CheckValidity {
	private errors: string[] = [];

	private readonly type: FieldTypes;

	private rules: Record<FieldTypes, ValidationRules> = {
		name: {
			pattern: {
				value: '^[A-Z-А-ЯЁ][а-яА-ЯёЁa-zA-Z-]*$',
				message: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
			},
			required: {
				value: true,
			},
		},
		login: {
			pattern: {
				value: '^[a-zA-Z][a-zA-Z0-9-_]{3,20}$',
				message: 'От 3 до 20 символов, только латинские символы (допустимы дефис, нижнее подчёркивание и цифры)',
			},
			maxlength: {
				value: 20,
			},
			minlength: {
				value: 3,
			},
			required: {
				value: true,
			},
		},
		email: {
			pattern: {
				value: '^[a-zA-Z0-9.!#$%&\' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
				message: 'Неверный формат e-mail (example@email.com)',
			},
			required: {
				value: true,
			},
		},
		password: {
			pattern: {
				value: '(?=.*\\d)(?=.*[A-ZА-ЯЁ]).{8,40}',
				message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
			},
			required: {
				value: true,
			},
			maxlength: {
				value: 40,
			},
			minlength: {
				value: 8,
			},
		},
		phone: {
			pattern: {
				value: '^[0-9+][0-9]{10,15}$',
				message: 'От 10 до 15 символов, может начинается с плюса',
			},
			required: {
				value: true,
			},
			maxlength: {
				value: 15,
			},
			minlength: {
				value: 10,
			},
		},
		message: {
			required: {
				value: true,
			},
		},
	};

	private element: HTMLInputElement | HTMLTextAreaElement;

	constructor(input: HTMLInputElement | HTMLTextAreaElement, type: FieldTypes) {
		this.type = type;
		this.element = input;

		this._setRules();
	}

	private _getRules() {
		return this.rules[this.type];
	}

	private _setRules():void {
		const rules = this._getRules();

		Object.entries(rules).forEach(([ruleName, value]) => {
			this.element.setAttribute(ruleName, value.value);
		});
	}

	public checkValidity(): boolean {
		this.resetValidation();
		let isValid = true;
		const { validity } = this.element;
		const rules = this._getRules();

		if (validity.tooLong) {
			this._addInvalidity('Превышено максимальное кол-во символов');
			if (rules.maxlength) {
				if (rules.maxlength.message) {
					this.element.setCustomValidity(rules.maxlength.message);
					this.element.title = rules.maxlength.message;
				} else if (rules.maxlength.value) {
					this.element.setCustomValidity(`Превышено максимальное кол-во символов на ${this.element.value.length - rules.maxlength.value}`);
				}
			}
			isValid = false;
		}

		if (validity.tooShort) {
			this._addInvalidity('Значение слишком короткое');
			if (rules.minlength) {
				if (rules.minlength.message) {
					this.element.setCustomValidity(rules.minlength.message);
					this.element.title = rules.minlength.message;
				} else if (rules.minlength.value) {
					this.element.setCustomValidity(`Минимальное кол-во символов ${rules.minlength.value}`);
				}
			}
			isValid = false;
		}

		if (validity.patternMismatch) {
			this._addInvalidity('Неверный формат данных');
			if (rules.pattern?.message) {
				this.element.setCustomValidity(rules.pattern.message);
				this.element.title = rules.pattern.message;
			}
			isValid = false;
		}

		if (validity.valueMissing) {
			this._addInvalidity('Поле обязательно для заполнения');
			if (rules.required.message) {
				this.element.setCustomValidity(rules.required.message);
				this.element.title = rules.required.message;
			}
			isValid = false;
		}

		this.element.addEventListener('input', () => {
			this.element.setCustomValidity('');
		}, { once: true });

		return isValid;
	}

	private _addInvalidity(message: string): void {
		this.errors.push(message);
	}

	public resetValidation(): void {
		this.errors = [];
	}

	public reportValidity(): void {
		this.element.reportValidity();
	}

	public getError(): string {
		return this.errors[0] ? this.errors[0] : '';
	}

	public getErrors(): string {
		return this.errors.join('. ');
	}
}

export default CheckValidity;
export { FieldTypes };
