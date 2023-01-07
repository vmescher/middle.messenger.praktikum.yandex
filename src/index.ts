import './styles/main.sass';
import authPage from './pages/Auth';
import registrationPage from './pages/Registration';
// // import notFoundPage from './pages/404';
// // import serviceErrorPage from './pages/503';
import settingsPage from './pages/Settings';
import settingsEditPage from './pages/SettingsEdit';
import chatsPage from './pages/Chats';
// import dialogPage from './pages/Dialog';
import Router from "./utils/Router";
import Block from "./utils/Block";
import { Routes } from "./typings/enums";
import AuthController from "./controllers/AuthController";

declare const window: any;

window.addEventListener('DOMContentLoaded', async () => {
	Router
		.use(Routes.Login, authPage as typeof Block)
		.use(Routes.Register, registrationPage as typeof Block)
		.use(Routes.Settings, settingsPage as typeof Block)
		.use(Routes.SettingsEdit, settingsEditPage as typeof Block)
		.use(Routes.Messenger, chatsPage as typeof Block);

	let isProtectedRoute = true;

	switch (window.location.pathname) {
		case Routes.Login:
		case Routes.Register:
			isProtectedRoute = false;
			break;
	}

	try {
		await AuthController.fetchUser();

		Router.start();

		if (!isProtectedRoute) {
			Router.go(Routes.Settings)
		}
	} catch (e) {
		Router.start();

		if (isProtectedRoute) {
			Router.go(Routes.Login);
		}
	}
});
