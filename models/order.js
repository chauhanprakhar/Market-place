const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
    productId:{
        type:ObjectId,
        ref:"Product"
    },
    orderedBy:{
       type:ObjectId,
       ref:"User"
    },
    sellerId:{
        type:ObjectId,
        ref:"Seller"
    }
})

mongoose.model("Order",orderSchema)