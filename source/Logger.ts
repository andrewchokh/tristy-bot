import winston from 'winston'
import colors from 'colors'

class Logger {
    logger: winston.Logger;

    constructor(LoggingFile: any) {
        this.logger = winston.createLogger({
            transports: [new winston.transports.File({ filename: LoggingFile })],
        });
    }

    // TODO: Make log function with different types (info, error, warning...)
    log(info: string) {
        let date = new Date();

        const dateForm = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}:${(date.getMonth()+1)}:${date.getFullYear()}`

        this.logger.log({
            level: "info",
            message: `${dateForm} | Info: ${info}`,
        });

        console.log(colors.green(dateForm + colors.yellow(" | Info: " + info)));       
    }

    error(err: string) {
        let date = new Date();

        const dateForm = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}:${(date.getMonth()+1)}:${date.getFullYear()}`

        this.logger.error({
            level: "error",
            message: `${dateForm} | Error: ${err}`,
        });

        console.log(colors.green(dateForm + colors.red(" | Error: " + err))); 
    }
}

export = Logger;