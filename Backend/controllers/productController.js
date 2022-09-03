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
    });y
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
    });

});



// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req,res,next) => {

    const {rating,comment,productID} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment

    };

    const product = await Product.findById(productID);

    const isReviewed = product.reviews.find(
        (rev)=> rev.user.toString() === req.user.id.toString()
        );

    
    if(isReviewed){
        product.review.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),(rev.comment = comment);
        });

    }else{
        product.review.push(review); 
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.ratings = product.reviews.forEach(rev=>{
        avg+=rev.rating
    })/product.reviews.length


    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success:true,

    });

});


// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req,res,next) => {


    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product nt found",404));
    }

    const reviews = product.reviews.filter( 
        (rev)=> rev._id.toString() !== req.query.id.toString()
        );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;

    });

    const rating = avg / reviews.length;

    const numofReviews = reviews.length;


    await product.findByIdAndUpdate(req.query.productId,{
        reviews,
        rating,
        numofReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });


    res.status(200).json({
        success:true,
    });


});

