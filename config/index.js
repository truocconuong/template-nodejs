const envVariables = {
  env: process.env.NODE_ENV,
  app: {
    secretKey: process.env.APP_SECRET_KEY || '',
    port: process.env.APP_PORT || 9999,
    apiLimit:{
      time:1,
      max:30
    }
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'devmanh',
    password: process.env.DB_PASS || 'PASSWORD',
    scheme: process.env.DB_SCHEME || 'pincstyle'
  },
  logsystem:{
    host: process.env.LOG_DB_HOST || 'localhost',
    port: process.env.LOG_DB_PORT || 27017,
    username: process.env.LOG_DB_USER || '',
    password: process.env.LOG_DB_PASS || '',
    scheme: process.env.LOG_DB_SCHEME || 'system_log'
  },
  redis:{
    host: process.env.REDIS_HOST || '140.82.10.8',
    port: process.env.REDIS_PORT || 6379,
  },
  api_cache:{
    enable:process.env.API_CACHE || true,
    time: process.env.REDIS_CACHE_TIME || 5,
  }
}

// console.log(envVariables);

module.exports = envVariables;