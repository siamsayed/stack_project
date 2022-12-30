const jwt=require("jsonwebtoken")


module.exports=(req,res,next)=>{
    //getting jwt token
    let token = req.header("Authorization")
    if(!token) res.status(404).send("no token found")
    token=token.split(" ")[1].trim()
    
    //varifying jwt token
    try {
        let decode=jwt.verify(token,process.env.SECRET_KEY)
        res.user=decode
        next()
    } catch (error) {
        res.status(400).send("token not valid")
    }

}