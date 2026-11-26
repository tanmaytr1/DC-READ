const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).json({message: "api is healthy"});
});

app.use("api/auth", authRoutes);

module.exports = app;