import chalk from "chalk";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { addNote, getNotes } from "./notes.controller.mjs";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const basePath = path.join(__dirname, "pages");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
