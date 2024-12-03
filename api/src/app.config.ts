import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4200,
  globalPrefix: '/',
  corsRegex: process.env.CORS_REGEX,
  isDev: process.env.MODE === 'DEV',
  pg: {
    databaseConnectionString: process.env.DATABASE_CONNECTION_STRING,
  },
  redisCache: {
    host: process.env.REDIS_CACHE_HOST,
    port: parseInt(process.env.REDIS_CACHE_PORT, 10) || 6379,
    ttl: parseInt(process.env.REDIS_CACHE_TTL, 10) || 3 * 60000, // 3 minutes (milliseconds)
    max: parseInt(process.env.REDIS_CACHE_TTL, 10) || 100, // maximum number of items in cache
  },
});
