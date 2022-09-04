const Category = require('../database/models/category')
const Product = require('../database/models/product')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


//get all products
const index = async(req,res) => {
    try{
        const productList = await Product.find().populate('category')
        //.select('name image -_id')
        if(productList){
            res.status(200).json({
                data: productList
            })
        }
    } catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}



//get single product
const show = async(req,res) => {
    try{
        let id = req.params.id
        const productId = await Product.findById({_id :id}).populate('category')
        if(productId){
            res.status(200).json({
                data: productId
            })
        }
    } catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}

//add new product
const store = async(req,res) => {
    try{
        const category = await Category.findById(req.body.category)
        if(!category){
            return res.status(400).json({error:'invalid category'})
        }
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        })
        await product.save()
        return res.status(200).json({
            message:'product added...',
            data:product
        })
    }catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}

//update a product
 const update = async(req,res)=> {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({error: 'invalid product id'})
        }
        const category = await Category.findById(req.body.category)
        if(!category){
            return res.status(400).json({error:'invalid category'})
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured  
            }
        )  
        if(product){
            return res.status(200).json({
                message:"product updated",
                data: product
            })
        } 
        }catch(error){
            res.status(400).send({success:false,msg:error.message})
        }
}

//delete a product
const destroy = async(req,res) => {
    try{
        id = req.params.id
        await Product.findByIdAndRemove({_id: id})
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
        
        const productcount = await Product.countDocuments()
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
        const products = await Product.find({isFeatured:true}).limit(+count)
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
    index,show,store,update,destroy,totalCount,getFeaturedlimit
}