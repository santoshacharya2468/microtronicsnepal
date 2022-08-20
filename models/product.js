const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    body:{
        type:String,
        require:true,
    },
    
    images:[
        {
            type:String
        }
    ],
    video:{
        type:String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

      category:{
        type:Number,
        require:true
      },

});
module.exports=mongoose.model("Product",productSchema);