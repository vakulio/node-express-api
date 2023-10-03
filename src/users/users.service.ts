import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserSevice } from './users.service.inteface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';

@injectable()
export class UserService implements IUserSevice {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));

		return null;
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return true;
	}
}
