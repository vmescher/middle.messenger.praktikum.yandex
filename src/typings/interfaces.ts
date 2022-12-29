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
