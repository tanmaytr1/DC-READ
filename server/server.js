require("dotenv").config();
const express = require("express");
const app = require("./app.js");
const { connectDB } = require("./config/db.js");

const PORT = process.env.PORT;

const startServer = async ()=>{
    await connectDB();
    app.listen(PORT, ()=>{
        console.log(`server is running on http://localhost:${PORT}`);
    });
}

startServer();

