const {Sequelize} = require("sequelize");
const {SequelizeStorage, Umzug} = require("umzug");

const sequelize = new Sequelize(process.env.DATABASE_URL)

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
            glob: 'migrations/*.js',
        },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        context: sequelize.getQueryInterface(),
        logger: console,
    })

    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
    return null
}

module.exports = {connectToDatabase, sequelize}