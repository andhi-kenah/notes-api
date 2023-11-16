import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import "./middleware/passport.js"
import AuthResource from "./resources/AuthResource.js"
import NoteResource from "./resources/NoteResource.js"

dotenv.config();

// API REST
const host = process.env.HOST_NAME || "localhost";
const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


app.use("/api/auth", AuthResource);
app.use("/api/notes", NoteResource);

app.listen(port, () => console.log(`http://${host}:${port}`));