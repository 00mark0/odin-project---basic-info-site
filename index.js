require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "src",
    req.url === "/" ? "index.html" : req.url
  );

  // If the request is for a directory, serve the corresponding HTML file
  if (req.url === "/about") {
    filePath = path.join(__dirname, "src", "about.html");
  } else if (req.url === "/contact-me") {
    filePath = path.join(__dirname, "src", "contact-me.html");
  }

  // Extension of the requested file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".ico":
      contentType = "image/x-icon";
      break;
    default:
      contentType = "text/html";
  }

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Page not found
        fs.readFile(path.join(__dirname, "src", "404.html"), (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content, "utf8");
        });
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
