const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../util/db");

class Session extends Model {
}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {model: 'users', key: 'id'}
    },
    sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: 'userSession'
})

module.exports = Session