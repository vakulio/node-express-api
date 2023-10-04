import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Invalid email or password' })
	email!: string;

	@IsString()
	password!: string;
}
