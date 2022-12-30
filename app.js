require("dotenv").config()

const express=require("express")
const app =express()
const morgan=require("morgan")
const port =process.env.PORT
const mongoose=require("mongoose")
const Router=require("./routes/userRouter")
const cors=require("cors")
const config=require("config")
app.use(morgan("dev"))

//connecting to database
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>{
    console.log("database is connected!!!")
})
.catch(err=>{
    console.log("database connection failed")
})
process.env.NODE_ENV="production"
console.log(config.get("mode"))
app.use(cors())
app.use(express.json())
app.use("/api/user",Router)
//starting server
app.listen(port,()=>{
    console.log("serverr is running on " + port)
})