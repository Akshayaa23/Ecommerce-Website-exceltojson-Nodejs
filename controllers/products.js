const Products = require('../database/models/product')
const XLSX = require('xlsx');

const uploadproduct = async (req, res) => {
    var workbook = XLSX.readFile(req.file.path);
    var sheetName = workbook.SheetNames;
    sheetName.forEach(async()=> {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
        // add data
        for (let i = 0; i < xlData.length; i++) {
            if (xlData[i].product_id || !xlData[i]._id) {
              await Products.create(xlData[i]) ;
                console.log(xlData[i],"product added");
            } else {
                // update
                const productExist = await Products.findOneAndUpdate(xlData[i].product_id) 
                if ((JSON.stringify(productExist) === JSON.stringify(xlData[i]))) {
                    await Products.updateOne({product_id:xlData[i].product_id},{$set:xlData[i]},{new:true});
                }
            }
        }
res.json(xlData)
})
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

//update
// const update = async(req,res) => {
//     try{
//     let filename = 'uploads/products.xlsx';
//     let workbook = new Excel.Workbook();
//     await workbook.xlsx.readFile(filename);
//     let worksheet = workbook.getWorksheet("Sheet1");
//     let row = worksheet.getRow('2');
//     row.getCell('I').value = 100;
//     row.commit();
//     workbook.xlsx.writeFile('uploads/updated.xlsx');
//     return res.status(200).json({message: "product updated"})
//     }catch(error){
//         res.status(400).json({error: "error occured!!"})
//     }
// }

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
