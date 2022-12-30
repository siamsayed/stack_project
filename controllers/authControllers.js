const user = require("../models/User")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req)
    const formatter = (value) => value.msg

    const formattedErros = errors.formatWith(formatter).mapped()

    try {


        data = new user({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(data.password, salt)
        data.password = hashedPass
        res.send({
            msg: "user registered",
            data: data,
            err: formattedErros

        })
        data.save()


    } catch (e) {
        res.send({
            msg: "error accoured",
            err: formattedErros,
            data: null,
        })
    }

}


module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req)
    const formatter = (value) => value.msg

    const formattedErros = errors.formatWith(formatter).mapped()
    try {
        const data = await user.findOne({ email: req.body.email })
        let token=null
        const passState=await bcrypt.compare(req.body.password,data.password)
        if(passState) token = data.generateJWT()
        res.send({
            msg: "user login successfull",
            data: data,
            token: token,
            err:formattedErros
        })
    } catch (error) {
        res.send({
            msg:"'error accured",
            data:null,
            token:null,
            err:formattedErros

        })
    }

}

module.exports.getUsers = async (req, res) => {
    try {
        const data = await user.find()
        if (!data) res.status(404).send("no user found ")
        res.send(data)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

