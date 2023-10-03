import { Container, ContainerModule, interfaces } from 'inversify';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.inteface';
import { TYPES } from './types';
import { ExeptionFilter } from './errors/exeption.filter';
import { App } from './app';
import { UserController } from './users/users.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserSevice } from './users/users.service.inteface';
import { IUserController } from './users/users.interface';
import { UserService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExceptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IUserSevice>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
