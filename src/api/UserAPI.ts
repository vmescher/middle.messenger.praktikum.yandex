import BaseAPI from './BaseAPI';
import {IUser, UserAvatar, UserData, UserPassword} from '../typings/interfaces';

export class UserAPI extends BaseAPI {

	private static __instance: UserAPI;
	constructor() {
		super('/user');

		if (UserAPI.__instance) {
			return UserAPI.__instance;
		}

		UserAPI.__instance = this;
	}

	update(data: UserData): Promise<IUser> {
		return this.http.put('/profile', { data });
	}

	updateAvatar(data: UserAvatar): Promise<IUser> {
		return this.http.put('/profile/avatar', { data, withFile: true });
	}

	updatePassword(data: UserPassword): Promise<IUser> {
		return this.http.put('/profile/password', { data });
	}

	read(identifier: string): Promise<IUser> {
		return this.http.get(`/${identifier}`);
	}

	search(data: Record<'login', string>): Promise<IUser[]> {
		return this.http.post('/search', { data });
	}

	create = undefined;
	delete = undefined;
}

export default new UserAPI();
