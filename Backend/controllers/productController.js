const Product = require("../models/productModel");
const ErrorHandler = require("../Utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../Utils/apifeatures");


// Create Product
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        sucess:true,
        product
    })

});


// Read/Get All Products
exports.getAllProduct = catchAsyncErrors(async(req,res)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apifeature = new  ApiFeatures(Product.find(),req.query)
    .search()
    .filter().pagination(resultPerPage);
    const products = await apifeature.query;

    res.status(200).json(
        {
            sucess:true,
            products
            
        })
    
});


//Get Product Details
exports.getProductDetails =catchAsyncErrors( async(req,res,next)=>{

    const  product = await Product.findById(req.params.id);

    if(!product)
    {
        // return res.status(500).json({
        //     sucess:false,
        //     message:"Product not found"
        // })

        return next(new ErrorHandler("Product not found",404));
    }

        
    

    res.status(200).json({
        sucess:true,
        product,
        productCount
    })


});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = Product.findById(req.params.id);

    if(!product)
    {
        return res.status(500).json({
            sucess:false,
            message:"Product not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        sucess:true,
        product
    })
});


//Delete Product

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{

    const  product = await Product.findById(req.params.id);

    if(!product)
    {
        return res.status(500).json({
            sucess:false,
            message:"Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        sucess:true,
        message:"Product Delete Sucessfully"
    })

});


