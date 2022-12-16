import Block from "../../utils/Block";
import template from "./settingsLayout.hbs";
import ReviewNav from "../../components/utils/ReviewNav";
import Link from "../../components/utils/Link";
import Settings from "../../components/Settings";
import SettingsEdit from "../../components/SettingsEdit";

type SettingsLayoutProps = {
	component: Settings | SettingsEdit;
	backLink: Link;
	reviewNav?: ReviewNav;

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
