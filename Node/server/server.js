const http = require("http");
const fs = require("fs");
// console.log("Someone has visited our server");
// // res header
// res.writeHead(200, { "Content-Type": "text/plane" });
// // send data to the user
// res.write("Hello, this is my first web server");
// // end response
// res.end();
const server = http.createServer(function (req, res) {});

server.listen(7000, () => {
  console.log("Server is up and running");
});

// http://localhost:7000

// create login html File

fs.writeFile(
  "login.html",
  `
<div>
<h1>
Login Page
</h1>
<p>
Provide your login credentials
</p>
</div>
`,
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("login File created");
    }
  }
);
// create register html File

fs.writeFile(
  "register.html",
  `
<div>
<h1>
Register Page
</h1>
<p>
Provide your register credentials
</p>
</div>
`,
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("register File created");
    }
  }
);

// listen to event

server.on("request", (req, res) => {
  console.log("Event has been fired");
  const url = req.url;
  if (url === "/login") {
    fs.readFile("./login.html", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }
  if (url === "/register") {
    fs.readFile("./register.html", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }
  if (url === "/") {
    fs.readFile("./home.html", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }
  // parse incomming data payload
  if (url === "/create-post" && req.method === "POST") {
    // recieve incomming data
    const post = [];
    req
      .on("data", (chunk) => {
        post.push(chunk);
      })
      .on("end", function () {
        // parse buffer data into actual data
        const parseData = Buffer.concat(post).toString();
        res.writeHead(200, { "content-Type": "text/json" });
        console.log(parseData);
        res.write("Post Created");
        res.end();
      });
  }
});
