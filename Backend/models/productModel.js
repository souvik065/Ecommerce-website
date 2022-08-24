const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"],
        trim:true
    },
    description:{
        type:String,
        require:[true,"Please Enter product Description"],
        
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxlength:[8,"Price cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxlength:[4,"Stock Cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            require:true
        },
        comment:{
            type:String,
            required:true
        }

        }
    ],
    createAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product",productSchema);