import { ILogObj, ISettingsParam, Logger } from 'tslog'
import { ILogger } from './logger.inteface';
import { injectable } from 'inversify'
import 'reflect-metadata'

const loggerSettings = {
    displayInstanceName: false,
    displayLoggerName: false,
    displayFilePath: 'hidden',
    displayFunctionName: false
}

@injectable()
export class LoggerService implements ILogger {
    public logger: Logger<ILogObj>;
 
    constructor() {
        this.logger = new Logger(loggerSettings as ISettingsParam<ILogObj>)
    }


    log(...args: unknown[]) {
        this.logger.info(...args)
    }

    error(...args: unknown[]) {
        this.logger.error(...args)
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}