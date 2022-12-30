const Router=require("express").Router()
const {
    registerUser,
    loginUser,
    getUsers

} =require("../controllers/authControllers")
const {body} =require("express-validator")
const Authorization= require("../middleware/Autherization")
const user=require("../models/User")
const bcrypt=require("bcrypt")

const registerValidation=[
    body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({min:3}).withMessage("Username is too short")
    .custom(async value=>{
        const data = await user.findOne({username:value}) 
        if(data) {
           throw new Error("Username already exists") 
        }
        return true
    })
    .trim(),
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Input a valid email")
    .custom(async value=>{
        const data=await user.findOne({email:value})
        if(data){
            throw new Error("This email is already taken")
        }
        return true
    }),
    body("password")
    .notEmpty()
    .trim(),

    body("confirmPassword")
    .notEmpty()
    .custom((value,{req})=>{
        if(value!= req.body.password){
            throw new Error("password dose'nt match")
        }
        return true
    })
    .trim()
    

]

const loginValidation=[
    body("email")
    .isEmail()
    .notEmpty()
    .custom(async value=>{
        const data=await user.findOne({email:value})

        if(!data){
            throw new Error("Email not found ")
        }
        return true
        
    }),
    body("password")
    .notEmpty().withMessage("Invalid value")
    .custom(async(value,{req})=>{
        const data=await user.findOne({email:req.body.email})
        
            const passState=await bcrypt.compare(value,data.password)
            
            if(!passState){
                throw new Error("Invalid value")
            }
            return true
        
    })
]

Router.post("/register",registerValidation,registerUser)

Router.post("/login",loginValidation,loginUser)

Router.route("/all")
.post(Authorization,getUsers)





module.exports=Router
