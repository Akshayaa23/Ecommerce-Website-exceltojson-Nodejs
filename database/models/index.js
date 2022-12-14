const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user");
db.role = require("./role");
db.product = require("./product");
db.category = require('./category');
db.gotocart = require('./gotocart');
db.order = require('./order');
db.ROLES = ["user","admin"];
module.exports = db;  