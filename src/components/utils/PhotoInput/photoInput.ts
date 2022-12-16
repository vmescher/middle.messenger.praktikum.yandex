import Block from "../../../utils/Block";
import template from "./photoInput.hbs";

type PhotoInputProps = {
	styleClasses?: string[];
	additionalClasses?: string[];
	imageUrl?: string;
	imageAlt?: string;
	name: string;
	accept: string;
	disabled?: boolean;
};

export class PhotoInput extends Block<PhotoInputProps> {
	constructor(props: PhotoInputProps) {
		super('div', props);

		this.element!.classList.add('photo-input');
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
