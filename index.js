require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, "src")));

// Route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Route for the about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "about.html"));
});

// Route for the contact-me page
app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "contact-me.html"));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "src", "404.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
