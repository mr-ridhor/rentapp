const express =require('express');
const connectDB= require('./config/db')
const app =express()
require('dotenv/config');
const cors = require("cors");
const auth=require('./routes/auth')
const PrivateRoute=require('./routes/private')
const LoanRoute =require('./routes/applyLoans')
const errorHandler =require("./middleware/error")

app.use(express.json());

connectDB();
app.use(errorHandler)
app.use(cors());

app.use('/api/auth', auth);
app.use("/api/private", PrivateRoute)
app.use("/api/loan", LoanRoute)

const port =5000;

const server=app.listen(port,()=>{
    console.log(`Sever running on ${port}`)
});

process.on("unhandledRejection",(err, promise)=>{
    console.log(`Logged Error: ${err}`);
    server.close(()=>process.exit(1))
})