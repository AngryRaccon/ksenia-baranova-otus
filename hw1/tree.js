const { promises: fs } = require("node:fs");
const { join } = require("node:path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const getDirContent = async (path, prefix = "", depth) => {
  if (depth === 0) return;
  let dirEntries = [];
  try {
    dirEntries = await fs.readdir(path, { withFileTypes: true });
  } catch (err) {
    if (err?.code === "ENOENT") console.error("No such file or directory");
    else console.log(err);
  }

  const length = dirEntries.length;
  let currIndex = 0;

  for await (const dirEntry of dirEntries) {
    const separator = currIndex === length - 1 ? "└" : "├";
    const { name } = dirEntry;
    if (dirEntry.isDirectory()) {
      console.log(`${prefix}${separator}── ${name}`);
      await getDirContent(join(path, name), `${prefix}│ `, depth - 1);
    } else {
      console.log(`${prefix}${separator}── ${name}`);
    }
    currIndex += 1;
  }
};

const argv = yargs(hideBin(process.argv))
  .option("d", { alias: "depth" })
  .option("p", { alias: "path" })
  .check((argv, options) => {
    if (!argv.path) throw new Error("Path is required!");
    return true;
  }).argv;

const userPath = argv.path;
const userDepth = argv.depth || 3;

getDirContent(userPath, "", userDepth);
