const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req,res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "email and password are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({email, password: hashedPassword});

        res.status(201).json({
            message: "User registered succesfully",
            userId: user._id,
        });

    } catch (err) {
        console.log("Registration Error: ", err.message);
        return res.status(500).json({message: "server error during registration"});
    }
};

const login = async (req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "both email and password required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"});
        }
        const token = jwt.sign(
            {userId: user._id, email : user.email},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (err){
        console.log("Login Error: ", err);
        return res.status(500).json({message : "server error during login"});
    }
}