const Blog = require('./blog')
const User = require('./user')
const ReadingList = require("./readinglist");

User.hasMany(Blog)
Blog.belongsTo(User)

/* Comment when using migrations */
// Blog.sync({alter: true})
// User.sync({alter: true})

User.belongsToMany(Blog, {through: ReadingList, as: 'bookmarks'}) // An alias must be used if the models already have prior relationships
Blog.belongsToMany(User, {through: ReadingList, as: 'users_added'})

module.exports = {
    Blog,
    User,
    ReadingList
}