const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination:function(req,file ,cb){
        cb(null,'uploads/')
    
    },
    filename : function(req,file,cb){
        let ext =path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})
var upload = multer({
    storage :storage,
    fileFilter:function(req,file,callback){
        console.log( file.mimetype)
        if(
           
             file.mimetype =="image/png" || file.mimetype =="image/jpeg" || file.mimetype =="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"  
             
        ){
            callback(null , true)
        }else {
            console.log('only jpg & png file supported !')
        }
    },  
    limits:{
        fileSize:1024*1024*2
    }
})
module.exports = upload