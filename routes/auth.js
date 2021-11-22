const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")



//GET ALL USERS

router.get('/users',async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.send({
            message: "Error"
        })
    }
})


//REGISTER A USER
router.post('/register', async (req, res) => {

    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("Email already exist");


    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //CREATE NEW USER
    const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPassword
    })
    
    try {
        const data = await newUser.save()
        res.json({
            message: "Account created",
            data,
            token 
        })
    } catch (error) {
        res.json({ message: "Error" })
    }
});

//USER LOGIN
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email does not exist");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password")
    
    const token =jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    res.header("authToken", token).send(token);
    console.log()
    // .send({ message: `${user.email} Logged in`, token });
})
router.get("/login",(req,res)=>{
    res.locals.user="verified"

})

//FORGOT PASSWORD
// router.post('/forgotpassword',async(req, res)=>{
//     const user = await User.findOne({ email: req.body.email });
//    try {
//     if(!user) return res.status(400).send("Email does not exist");
//     const resetToken =
//    } catch (error) {
       
//    }
// })

//RESET PASSWORD
router.put('/resetpassword', (req, res)=>{

})

module.exports =router