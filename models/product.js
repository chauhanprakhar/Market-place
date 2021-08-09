const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    addedBy:{
       type:ObjectId,
       ref:"User"
    }
})

mongoose.model("Product",productSchema)
