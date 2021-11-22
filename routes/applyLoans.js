const express = require('express')
const router = express.Router()
const Loan =require("../models/applyLoans");
const User = require('../models/userModel');
const verify=require('../middleware/auth')

router.get('/user',async (req, res) => {
    try {
        const loans = await Loan.find().populate('Users');
        res.json(loans);
        console.log(loans);
    } catch (error) {
        res.send({
            message: "Error"
        })
    }
})


router.post('/apply', async (req, res) => {
  const {  rate, amount, tenure, monthlyPayment} = req.body
  let apply = Loan({rate, amount, tenure, monthlyPayment})
  const data= await apply.save()
  res.send(data)
})

module.exports = router