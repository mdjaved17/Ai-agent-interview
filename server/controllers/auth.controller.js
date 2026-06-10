import User from "../models/user.model.js";
import {genToken} from "../config/token.js";

export const googleAuth = async (req, res) => {
    try{
        const {name, email} = req.body;
        let user = await User.findOne({
            email
        })
        if(!user){
            user = await User.create({
                name,
                email
            })
        }
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        console.log("User ID:", user._id);
        let token = await genToken(user._id);
        console.log("Generated Token:", token);
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })
        
        return res.status(200).json({ message: "Authentication successful", user});
    }catch(error){
        console.error("Error in Google Auth:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try{
        await res.clearCookie("token")
        return res.status(200).json({ message: "Logout successful" });
    }catch(error){
        console.error("Error in Logout:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}