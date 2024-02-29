require("dotenv").config();
import config from "config";
const port = config.get("port");

import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import router from "./routes";

const logPath = path.join(__dirname, "..", "logs", "app.log");
const logStream = fs.createWriteStream(logPath, { flags: "a" });

const app = express();
app.use(morgan(":method :url :status", { stream: logStream }));
app.use(morgan(":method :url :status"));

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
