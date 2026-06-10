import jwt from "jsonwebtoken";

const isAuth =(req, res, next)=>{
    try{
        let {token}= req.cookies;
        if(!toke){
            return res.status(400).json({error: "Unauthorized"});
        }

        const verifyToken= jwt.verify(token, process.env.JWT_SECRET);

        req.user = verifyToken;
        next();

    }catch(error){
        return res.status(500).json({error: "Internal Server Error"});
    }
}