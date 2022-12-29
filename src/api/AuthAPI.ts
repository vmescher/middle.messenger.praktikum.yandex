import BaseAPI from './BaseAPI';
import {LoginData, RegistrationData, IUser} from "../typings/interfaces";

export class AuthAPI extends BaseAPI {

	private static __instance: AuthAPI;
	constructor() {
		super('/auth');

		if (AuthAPI.__instance) {
			return AuthAPI.__instance;
		}

		AuthAPI.__instance = this;
	}

	signin(data: LoginData) {
		return this.http.post('/signin', { data });
	}

	signup(data: RegistrationData) {
		return this.http.post('/signup', { data });
	}

	read(): Promise<IUser> {
		return this.http.get('/user');
	}

	logout() {
		return this.http.post('/logout');
	}

	create = undefined;
	update = undefined;
	delete = undefined;
}

export default new AuthAPI();
