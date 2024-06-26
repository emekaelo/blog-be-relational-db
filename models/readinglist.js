const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../util/db");

class ReadingList extends Model{}

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {model: 'users', key: 'id'}
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {model: 'blogs', key: 'id'}
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readingList'
})

module.exports = ReadingList