const jwt = require("jsonwebtoken");

const protect = (req,res,next)=>{
    const authHeader = req.headers.authorization; //imp
    if(!authHeader || !authHeader.startsWith("Bearer ")){ //imp
        return res.status(401).json({message : "unauthorized: no token provided"});
    }
    const token = authHeader.split(" ")[1]; //imp
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //imp
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({message: "unauthorized invalid or expired token"});
    }
}

module.exports = protect;