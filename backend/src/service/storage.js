// storage.js (ESM version)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "..", "data");
const FILE = path.join(DATA_DIR, "versions.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([], null, 2), "utf8");
  }
}

function readAll() {
  ensureDataFile();
  const raw = fs.readFileSync(FILE, "utf8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn("storage: corrupted JSON → resetting file.");
    writeAll([]);
    return [];
  }
}

function writeAll(arr) {
  ensureDataFile();
  fs.writeFileSync(FILE, JSON.stringify(arr, null, 2), "utf8");
}

export function getAll() {
  return readAll();
}

export function addVersion(versionObj) {
  const all = readAll();
  all.unshift(versionObj); // newest first
  writeAll(all);
  return versionObj;
}
