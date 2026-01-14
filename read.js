// read.js
const fs = require("fs");
const path = require("path");

function readDataFile() {
  const filePath = path.join(__dirname, "Data.txt");
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (err) {
    return `Error reading file: ${err.message}`;
  }
}

module.exports = readDataFile;
