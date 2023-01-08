import Block from "../../../utils/Block";
import template from "./searchInput.hbs";

type SearchInputProps = {
	styleClasses?: string[];
	additionalClasses?: string[];
	name: string;
	placeholder: string;
	disabled?: boolean;
	value?: string;
	events?: Record<string, (e?: Event) => void>;
};

export class SearchInput extends Block<SearchInputProps> {

	constructor(props: SearchInputProps) {
		super('label', props);

		this.element!.classList.add('search-input');
	};

	render() {
		if (this.props.styleClasses) {
			this.element!.classList.add(...this.props.styleClasses)
		}

		if (this.props.additionalClasses) {
			this.element!.classList.add(...this.props.additionalClasses)
		}

		return this.compile(template, { ...this.props });
	}
}
