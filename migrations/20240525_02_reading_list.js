const {DataTypes} = require("sequelize");

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('reading_lists', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                reference: {model: 'users', key: 'id'}
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                reference: {model: 'blogs', key: 'id'}
            }
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('reading_lists')
    }
}