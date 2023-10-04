import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './user.repository.interface';
import { IUserService } from './users.service.inteface';
import { UserService } from './users.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const CofigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(CofigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>('IConfigService');
	usersRepository = container.get<IUsersRepository>('IUsersRepository');
	usersService = container.get<IUserService>('IUserService');
});

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		usersRepository.find = jest.fn();

		expect(configService.get).toHaveBeenCalled();

		expect(usersRepository.create).toHaveBeenCalled();

		expect(usersRepository.find).not.toHaveBeenCalled();

		usersService.createUser({
			email: 'a@gma.com',
			name: 'John',
			password: 'XXXXXXXXXX',
		});

		expect(usersRepository.find).toHaveBeenCalled();
	});
});
