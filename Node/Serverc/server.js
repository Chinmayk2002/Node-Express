const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {});

server.listen(9000, () => {
  console.log("server is running");
});

// fs.mkdir("public", () => {
//   console.log("public folder created");
// });
// fs.mkdir("./public/css", () => {
//   console.log("css sub-folder created");
// });
// fs.mkdir("./public/pages", (err) => {
//   if (err) {
//     console.log("error");
//   } else {
//     console.log("pages sub-folder created");
//   }
// });

// fs.writeFileSync(
//   "./public/pages/home.html",
//   `
// <div>
// <h1>
// Home Page
// </h1>
// <p>
// This is Home page
// </p>
// </div>
// `
// );
// fs.writeFileSync(
//   "./public/pages/about.html",
//   `
// <div>
// <h1>
// About Page
// </h1>
// <p>
// This is About page
// </p>
// </div>
// `
// );
// fs.writeFileSync(
//   "./public/css/style.css",
//   `
// *{
//     margin: 0px,
// }
// `
// );

server.on("request", (req, res) => {
  console.log("Event fired");
  const url = req.url;
  if (url === "/") {
    fs.readFile("./public/pages/home.html", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }
  if (url === "/about") {
    const filePath = path.join(__dirname, "public/pages", "about.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }
});
