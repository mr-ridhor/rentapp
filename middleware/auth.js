const jwt=require('jsonwebtoken');


module.exports =  function(req, res, next){
    const token=req.header("authToken");
    if(!token) return res.status(401).send("Access Deneid");

    try {
        const verified =jwt.verify(token, process.env.TOKEN_SECRET);
        req.user =verified.email;
        
        next()
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}


