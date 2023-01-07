import Block from "../../../utils/Block";
import template from "./photoInput.hbs";

type PhotoInputProps = {
	styleClasses?: string[];
	additionalClasses?: string[];
	value?: string;
	loadedImage?: File;
	imageAlt?: string;
	name: string;
	accept: string;
	disabled?: boolean;
	events?: Record<string, (e?: Event) => void>;
};

export class PhotoInput extends Block<PhotoInputProps> {
	constructor(props: PhotoInputProps) {
		super('div', props);

		this.element!.classList.add('photo-input');
		this.element!.addEventListener('change', this.setValue.bind(this));
	}

	getName() {
		return this.props.name;
	}

	getValue() {
		return this.props.loadedImage;
	}

	setValue(e: Event) {
		if (e.target instanceof HTMLInputElement) {
			const target = e.target as HTMLInputElement;

			if (target.files && target.files.length) {
				this.setProps({ loadedImage: target.files[0], value: URL.createObjectURL(target.files[0])})
			}
		}
	}

	render() {
		if (this.props.styleClasses) {
			this.element!.classList.add(...this.props.styleClasses)
		}
		if (this.props.additionalClasses) {
			this.element!.classList.add(...this.props.additionalClasses)
		}

		return this.compile(template, { ...this.props })
	}
}
