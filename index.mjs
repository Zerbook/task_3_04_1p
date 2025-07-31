import http from "http";
import chalk from "chalk";
import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { addNote } from "./notes.controller.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const basePath = path.join(__dirname, "pages");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html"));
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.sendFile(path.join(basePath, "index.html"));
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
