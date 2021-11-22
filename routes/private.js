const express = require("express")
const router = express.Router();
const verify =require('../middleware/auth')


router.get("/", verify, (req,res)=>{
    res.status(200).json({
        success:true,
        data: "You get access to the private data in this route"
    })
})




module.exports= router