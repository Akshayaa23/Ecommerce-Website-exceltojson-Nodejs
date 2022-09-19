const Products = require('../database/models/product')
const XLSX = require('xlsx');
 
const uploadproduct = async (req, res) => {
    var workbook = XLSX.readFile(req.file.path);
    var sheetName = workbook.SheetNames;
    // console.log(sheetName)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
    let product_details = await Products.find()
    console.log(product_details)
    if(!product_details.length){
    let tests =  await Products.insertMany(xlData)
    console.log(tests)

    return res.json({ data: tests })
    }else{
     xlData.map(async(e) => {
        let product_detail = await Products.find({ product_id: e.product_id })
        //console.log(product_detail.find(b=> b.product_id == e.product_id))
        let results = await Products.findByIdAndUpdate(product_detail.find(b=> b.product_id == e.product_id), { $set: { countInStock: parseInt(e.countInStock) + parseInt(product_detail.map(b=> b.countInStock))} })
        //return res.json({ data: results })
    })
        return res.json({ message : "update successfully" })
}
}
//get products
const getProduct = async (req, res) => {
    try {
        result = await Products.find()
        res.status(200).json({
            message: 'product listed',
            result
        })

    } catch (error) {
        res.status(400).json({ msg: error })
    }
}


//get single product
const show = async (req, res) => {
    try {
        let id = req.params.id
        const productId = await Products.findById({ _id: id })
        if (productId) {
            res.status(200).json({
                data: productId
            })
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

//delete a product
const destroy = async (req, res) => {
    try {
        id = req.params.id
        await Products.findByIdAndRemove({ _id: id })
        return res.status(200).json({
            message: 'product Deleted...'
        })
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

//get count of products
const totalCount = async (req, res) => {
    try {

        const productcount = await Products.countDocuments()
        if (productcount) {
            res.status(200).json({
                productCount: productcount
            })
        }
    } catch (error) {
        res.status(400).send({ successs: false, msg: error.message })
    }
}

//get only isfeatured products
const getFeaturedlimit = async (req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0
        const products = await Products.find({ isFeatured: true }).limit(+count)
        if (products) {
            res.status(200).json({
                limitisfeaturedProducts: products
            })
        }
    } catch (error) {
        res.status(400).send({ successs: false, msg: error.message })
    }
}


module.exports = {
    show, destroy, totalCount, getFeaturedlimit, uploadproduct, getProduct
}
