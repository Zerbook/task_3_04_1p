import http from "http";
import chalk from "chalk";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const basePath = path.join(__dirname, "pages");

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    // res.setHeader("Content-Type", "text/html");
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(content);
  }
});

server.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
