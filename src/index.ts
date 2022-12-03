import './styles/main.sass';
import authPage from "./pages/Auth";
import registrationPage from "./pages/Registration";
import notFoundPage from "./pages/404";
import serviceErrorPage from "./pages/503";
import settingsPage from "./pages/Settings";
import settingsEditPage from "./pages/SettingsEdit";

declare const window: any;

const pagesList = {
	authPage,
	registrationPage,
	notFoundPage,
	serviceErrorPage,
	settingsPage,
	settingsEditPage
};

window.changePage = function (pageName: keyof typeof pagesList): void {
	const app = document.querySelector('#app')!;

	const nextPage = pagesList[pageName];

	if (nextPage) {
		app.innerHTML = '';
		app.append(nextPage.getContent()!);
	}
};
window.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('#app')!;

	app.append(authPage.getContent()!);
});
