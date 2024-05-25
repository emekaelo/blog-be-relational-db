require('dotenv').config()

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001,
    SECRET: process.env.SECRET,
    dialect: process.env.DB_DIALECT,

    development: {
        DATABASE_URL: process.env.DATABASE_URL,
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        database: process.env.DB_DATABASE_DEV,
        host: process.env.DB_HOST_DEV,
        dialect: process.env.DB_DIALECT
    }
    // test: {
    //     username: process.env.DB_USER_2,
    //     password: process.env.DB_PASS_2,
    //     database: process.env.DB_TABLE,
    //     host: process.env.DB_HOST_2,
    //     dialect: "mysql"
    // },
    // production: {
    //     username: process.env.DB_USER_PRODUCTION,
    //     password: process.env.DB_PASS_PRODUCTION,
    //     database: process.env.DB_TABLE_PRODUCTION,
    //     host: process.env.DB_HOST_PRODUCTION,
    //     dialect: "mysql"
    // }
}