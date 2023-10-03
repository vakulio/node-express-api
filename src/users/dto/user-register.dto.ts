import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Email is not valid' })
	email!: string;
	@IsString({ message: 'Password must be a string' })
	password!: string;
	@IsString({ message: 'Name must be a string' })
	name!: string;
}
