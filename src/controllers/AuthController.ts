import API, {AuthAPI} from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import { LoginData, RegistrationData } from "../typings/interfaces";
import { Routes } from "../typings/enums";

export class AuthController {
	private readonly api: AuthAPI;

	constructor() {
		this.api = API;
	}

	async signin(data: LoginData) {
		try {
			await this.api.signin(data);

			await this.fetchUser();

			router.go(Routes.Settings);
		} catch (e: any) {
			console.error(e);
			return e;
		}
	}

	async signup(data: RegistrationData) {
		try {
			await this.api.signup(data);

			await this.fetchUser();

			router.go(Routes.Settings);
		} catch (e: any) {
			console.error(e.message);
		}
	}

	async fetchUser() {
		const user = await this.api.read();

		store.set('user.user_data', user);
	}

	async logout() {
		try {
			await this.api.logout();

			router.go(Routes.Login);
		} catch (e: any) {
			console.error(e.message);
		}
	}
}

export default new AuthController();
