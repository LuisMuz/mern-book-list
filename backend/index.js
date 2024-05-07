import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Muddleware for parsing request body
app.use(express.json());

// Middleware for enabling CORS
// Allow all origins
app.use(cors());
// Allow only specific origins
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: [],
// }));

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("This is the MERN app!");
});

app.use("/books", booksRoute);

mongoose 
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}!`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

