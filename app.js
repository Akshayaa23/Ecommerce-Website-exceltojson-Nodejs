const express = require('express')
const configs = require('./configs/config')
const httpCode = require('./configs/codeMsg')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

const authRoute = require('./routes/authRoute')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')


const db = require('./database/models');
const { errmsg } = require('./configs/codeMsg')
db.mongoose.connect(`mongodb://${configs.HOST}:${configs.PORT}/${configs.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

const Role = db.role;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
 
app.use('/api/auth',authRoute)
app.use('/api/categories',categoryRoute)
app.use('/api/products', productRoute)
app.listen(process.env.PORT,()=>console.log(httpCode.serversuccess))
