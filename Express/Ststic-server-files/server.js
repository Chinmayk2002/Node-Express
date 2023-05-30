const express = require("express");
const app = express();

//serve static files from the public
app.use(express.static("public"));
//configure express to pass data from a form
app.use(express.urlencoded({ extended: true }));
//home
app.get("/", (req, res) => {
  //displau html page
  console.log(__dirname);
  res.sendFile(__dirname + "/public/pages/index.html");
});

//about page
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/pages/about.html");
});

//add post
app.post("/addPost", (req, res) => {
  //we have access to the data from the client
  console.log(req.body);
  res.send(req.body);
});

//get post form
app.get("/addPost", (req, res) => {
  res.sendFile(__dirname + "/public/pages/addPost.html");
});

//contact page
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/pages/contact.html");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
