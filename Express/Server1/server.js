const express = require("express");
const { createFile, createFolder } = require("./utils");
const postsData = require("./data/posts.json");
const app = express();
const fs = require("fs");
// turn middlewear to true for execution
// middlewear

const middleWear = function (req, res, next) {
  // called in app.use
  const details = {
    isLogin: false,
    userName: "John",
  };
  if (details.isLogin) {
    next();
  } else {
    res.json("Please login first");
  }
};

const isAdmin = function (req, res, next) {
  // called at create
  const details = {
    isAdmin: false,
    userName: "John",
  };
  if (details.isAdmin) {
    next();
  } else {
    res.json("Not a admin");
  }
};

app.use(middleWear);

// pass incomming data
app.use(express.json());

// create folder
createFolder("data");
// create file
createFile("data/posts.json", "content here");
// routing

// home route
app.get("/", (req, res) => {
  res.send("Home route");
});

// fetch all posts
app.get("/posts", (req, res) => {
  res.json({ message: "Posts fetched successfully", postsData }); // in node js we use write
});

// fetch single posts
app.get("/posts/:id", (req, res) => {
  // get id
  const id = req.params.id;
  // res.send("Fetch single post routes"); // in node js we use write
  // find post by id
  const postFound = postsData.find((post) => {
    return post.id === id;
  });
  if (!postFound) {
    res.json({ message: "Post not found" });
  } else {
    res.json(postFound);
  }
});

// create posts
app.post("/posts", isAdmin, (req, res) => {
  const newPost = req.body;
  // res.send("Create post routes"); // in node js we use write
  // push into existing post
  postsData.unshift({ ...newPost, id: postsData.length.toString() });
  console.log(postsData);
  // write file
  fs.writeFile("data/posts.json", JSON.stringify(postsData), (err) => {
    if (err) {
      console.log(err);
    } else {
      // send message to client
      res.json({ message: "post created successfully" });
    }
  });
});

// Delete posts
app.delete("/posts/:id", (req, res) => {
  // res.send("Delete post routes"); // in node js we use write
  // get id
  const id = req.params.id;
  const filteredPosts = postsData.filter((post) => {
    return post.id !== id;
  });
  // write file
  fs.writeFile("data/posts.json", JSON.stringify(filteredPosts), (err) => {
    if (err) {
      console.log(err);
    } else {
      // send message to client
      res.json({ message: "post created successfully" });
    }
  });
});

// update posts
app.put("/posts/:id", (req, res) => {
  // get dynamic id === params
  const id = req.params.id;
  // console.log(id);
  // res.send("Update post routes"); // in node js we use write
  // get properties
  const { url, title, description } = req.body;
  // find post to update
  const foundPost = postsData.find((post) => {
    return post.id === id;
  });

  if (!foundPost) {
    return res.json({ message: "Post not found" });
  }
  // filterout all posts with post found
  const filteredPosts = postsData.filter((post) => post.id !== id);
  // update found post
  foundPost.title = title;
  foundPost.description = description;
  foundPost.url = url;
  // push updated post
  filteredPosts.unshift(foundPost);
  // write file
  fs.writeFile("data/posts.json", JSON.stringify(filteredPosts), (err) => {
    if (err) {
      console.log(err);
    } else {
      // send message to client
      res.json({ message: "post updated successfully" });
    }
  });
});

// create server
app.listen(9000, () => {
  console.log("Server is up and running");
});
