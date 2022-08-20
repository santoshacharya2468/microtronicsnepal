const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        default:false,
        type:Boolean

    },

});
module.exports=mongoose.model("User",UserSchema);