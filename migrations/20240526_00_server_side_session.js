const {DataTypes} = require("sequelize");

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('user_sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                reference: {model: 'users', key: 'id'}
            },
            session_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        })

        await queryInterface.addColumn('users', 'disabled', {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('user_sessions')
        await queryInterface.removeColumn('users', 'disabled')
    }
}