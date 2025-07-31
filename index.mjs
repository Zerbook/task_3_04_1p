import chalk from "chalk";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} from "./notes.controller.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const basePath = path.join(__dirname, "pages");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  try {
    await updateNote(id, title);
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
