const express = require("express");
const os = require("os");
const dns = require("dns");
const readDataFile = require("./read");

const app = express();
const PORT = 3000;

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to my Express server!");
});

// Test route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// Read file route
app.get("/readfile", (req, res) => {
  const fileContent = readDataFile();
  res.send(fileContent);
});

// System details route
app.get("/systemdetails", (req, res) => {
  const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2);
  const cpuModel = os.cpus()[0].model;
  const cpuCount = os.cpus().length; // Bonus: CPU core count

  res.json({
    platform: os.platform(),
    totalMemory: `${totalMemGB} GB`,
    freeMemory: `${freeMemGB} GB`,
    cpuModel: cpuModel,
    cpuCores: cpuCount,
  });
});

// Get IP address route
app.get("/getip", (req, res) => {
  const hostname = "masaischool.com";

  // Lookup all IPs (IPv4 & IPv6)
  dns.lookup(hostname, { all: true }, (err, addresses) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ hostname, addresses });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
