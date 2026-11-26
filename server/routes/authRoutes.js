const express = require("express");
const {register, login} = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req,res)=>{
    res.status(200).json({message: "authenticated user",  user: req.user});
})
