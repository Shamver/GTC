const appRoot = require('app-root-path'); // app root 경로를 가져오는 lib
const { createLogger: CreatLogger, format, transports } = require('winston'); // winston lib
const process = require('process');

const {
  combine, timestamp, label, printf,
} = format;

// log 출력 포맷
const myFormat = printf(({
  level, message, label: _label, timestamp: _timestamp,
}) => `${_timestamp} [${_label}] ${level}: ${message}`);

const options = {
  // log file
  file: {
    level: 'info',
    filename: `${appRoot}/logs/log-gtc-web.log`, // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      label({ label: 'GTC' }),
      timestamp(),
      myFormat, // log 출력 포맷
    ),
  },
  // 개발 시 console에 출력
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false, // 로그형태를 json 으로도 뽑을 수 있다.
    colorize: true,
    format: combine(
      label({ label: 'nba_express' }),
      timestamp(),
      myFormat,
    ),
  },
};

const { file } = options;

const logger = new CreatLogger({
  transports: [
    new transports.File(file), // 중요! 위에서 선언한 option 으로 로그 파일 관리 모듈 transport
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console(options.console)); // 개발 시 console 로도 출력
}

module.exports = logger;
