export type UserSchema = {
	id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	gender: string;
	role: string;
	avatar: string;
	dateOfBirth: string;
	isVerified: boolean;
	address: {
		id: string;
		country: string;
		province: string;
		district: string;
		ward: string;
		houseNumber: string;
	};
};
