import { createLogger, format, transports } from "winston";
const { combine, colorize, simple } = format;

const log = createLogger({
    format: combine(colorize(), simple()),
    transports: [new transports.Console()],
});
export default log;
