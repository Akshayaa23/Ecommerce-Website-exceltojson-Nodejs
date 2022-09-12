const Products = require('../database/models/product')
const excelToJson = require('convert-excel-to-json');

// upload
const uploadproduct = async(req,res,next) => {
  try{
      const file = req.file.path
      let excelData = excelToJson({
        sourceFile: file,
          header: {
            rows: 1
          },
          columnToKey: {
            A:'ids',
            B:'name',
            C:'description',
            D:'richDescription',
            E:'image',
            F:'brand',
            G:'price',
            H:'category',
            I:'countInStock',
            J:'rating',
            K:'numRevies',
          }
    })
    console.log(excelData)
    
    excelData = await Products.insertMany(excelData.Sheet1)
    // excelData = await Products.findOneAndUpdate({ids : excelData.map(a=>a.ids)},
    // {$set: {$or:[{name: excelData.map(a=>a.name)},{price: excelData.map(a=>a.price)}]}},{upsert : true})

    res.json({
        status: 200,
        message: 'Added successfully',
        excelData
    })
  }catch(error){ res.status(400).json({
      message:error.message
    })
  }
}

//get products
const getProduct = async(req,res) => {
  try{
    result = await Products.find()
    res.status(200).json({
      message:'product listed',
      result
    })

  }catch(error){
    res.status(400).json({msg:error})
  }
}


//get single product
const show = async(req,res) => {
    try{
        let id = req.params.id
        const productId = await Products.findById({_id :id})
        if(productId){
            res.status(200).json({
                data: productId
            })
        }
    } catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}

//delete a product
const destroy = async(req,res) => {
    try{
        id = req.params.id
        await Products.findByIdAndRemove({_id: id})
        return res.status(200).json({
            message: 'product Deleted...'
        })
    }catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}

//get count of products
const totalCount = async(req,res) => {
    try{
        
        const productcount = await Products.countDocuments()
        if(productcount){
            res.status(200).json({
                productCount: productcount
            })
        }
    } catch(error){
        res.status(400).send({successs:false,msg:error.message})
    }
}

//get only isfeatured products
const getFeaturedlimit = async(req,res) => {
    try{
        const count = req.params.count?req.params.count:0
        const products = await Products.find({isFeatured:true}).limit(+count)
        if(products){
            res.status(200).json({
                limitisfeaturedProducts: products
            })
        }
    } catch(error){
        res.status(400).send({successs:false,msg:error.message})
    }
}


module.exports = {
    show,destroy,totalCount,getFeaturedlimit,uploadproduct,getProduct
}
