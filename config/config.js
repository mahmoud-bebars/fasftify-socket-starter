require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DIALECT,
    timezone: process.env.DB_TIMEZONE,
  },
};
