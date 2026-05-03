const pino = require('pino');
const logger = pino({
  transport: {
    target: require.resolve('pino-pretty'),
    options: {
      ignore: 'pid,hostname',
      translateTime: 'yyyy-mm-dd HH:MM:ss',
    },
  },
});

module.exports = logger;