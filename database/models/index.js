const mongoose = require('mongoose')
const User = require('./user')

const db = {}
db.mongoose = mongoose
db.user = User

module.exports = db