import Block from "../../utils/Block";
import template from "./settingsLayout.hbs";

type SettingsLayoutProps = {
	component: Block;
	backLink: Block;
}

export class SettingsLayout extends Block<SettingsLayoutProps> {
	constructor(props: SettingsLayoutProps) {
		super('article', props);

		this.element!.classList.add('settings-layout');
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
