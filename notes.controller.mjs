import { log } from "console";
import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesPath = path.join(__dirname, "db.json");

export async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  log(note);
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
  console.log(chalk.green.inverse("Note was added"));
}

export async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

export async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes: "));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

export async function remove(id) {
  const notes = await getNotes();
  const filtered = notes.filter((note) => note.id !== id);

  if (notes.length === filtered.length) {
    return;
  }
  await fs.writeFile(notesPath, JSON.stringify(filtered, null, 2));
  console.log(chalk.red.inverse(`Note with id ${id} was removed.`));
}
