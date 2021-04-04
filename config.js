module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'adwXsdfa2@dsxcv.24',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 's80CkqnkDf',
    password: process.env.MYSQL_PASSWORD || 'qxy9UKd2IW',
    database: process.env.MYSQL_DB || 's80CkqnkDf',
  },
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017',
    database: process.env.MONGO_DB || 'store',
  }
}
