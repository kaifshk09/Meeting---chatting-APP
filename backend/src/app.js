import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();


import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error("Missing required env var: MONGODB_URI");
        process.exit(1);
    }

    try {
        const connectionDb = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });
        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
    } catch (err) {
        // If Mongo fails to connect (common during local dev), don't crash the entire server.
        // This allows the frontend/socket features to still work.
        console.error("Failed to connect to MongoDB:", err);
    }

    const port = app.get("port");
    server.listen(port, () => {
        console.log(`LISTENING ON PORT ${port}`);
    });

    server.on("error", (err) => {
        // Avoid crashing on dev hot-reload if previous instance is still bound.
        if (err && err.code === "EADDRINUSE") {
            console.warn(`Port ${port} already in use. Is another backend instance running?`);
            return;
        }
        console.error("Server error:", err);
    });
}






start();