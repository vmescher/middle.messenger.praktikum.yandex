export interface LoginData {
	[key: string]: string;
	login: string;
	password: string;
}

export interface RegistrationData {
	[key: string]: string;
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export interface UserData {
	[key: string]: string;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export interface UserPassword {
	[key: string]: string;
	oldPassword: string;
	newPassword: string;
}

export interface UserAvatar {
	[key: string]: File | FileList;
	avatar: File | FileList;
}

export interface IUser {
	[key: string]: string | number;
	id: number;
	first_name: string;
	display_name: string;
	second_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
}
