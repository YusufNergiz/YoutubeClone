import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import videoRoutes from "./routes/videos.js"
import authRoutes from "./routes/auth.js"

import cookieParser from "cookie-parser";


const app = express()
dotenv.config()
app.use(express.json())

// Using Cookies
app.use(cookieParser());
//

// Connecting MongoDB to the App
const connect = () => {
    mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Successfully Connected to Databse!");
    }).catch((error) => {
        console.log(error)
    })
}
//

// Routing
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
//

// Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    })
});
//

// Port to Host
app.listen(3000, () => {
    connect();
    console.log("Server successfully connected!")
});
//