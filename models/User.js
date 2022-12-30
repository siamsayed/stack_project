const {Schema,model} =require("mongoose")
const jwt= require("jsonwebtoken")



const userSchema=new Schema({
    username:{
        type:String,
        trim:true,
        requried:true,
        unique:true
    },
    email:{
        type:String ,
        trim:true,
        required:true,
        unique:true

    },
    password:{
        type:String,
        trim:true,
        requried:true,

    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:"Profile"

    }
},{timestamps:true})

userSchema.methods.generateJWT= function(){
    const data =jwt.sign({_id:this._id,name:this.name,email:this.email,profile:this.profile},process.env.SECRET_KEY,{expiresIn:"24h"})
    return data
}

const User = model("User",userSchema)

module.exports=User