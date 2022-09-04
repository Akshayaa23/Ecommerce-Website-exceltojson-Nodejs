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
db.mongoose.connect(`mongodb://${configs.HOST}:${configs.PORT}/${configs.DB}`, 
{
    useNewUrlParser:true, 
    useUnifiedTopology:true
},(err,info)=>{
    if(info) console.log(httpCode.dbsuccess)
    else (console.log(httpCode.dberror,err))
})

app.listen(process.env.PORT,()=>console.log(httpCode.serversuccess))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth',authRoute)
app.use('/api/categories',categoryRoute)
app.use('/api/products', productRoute)
