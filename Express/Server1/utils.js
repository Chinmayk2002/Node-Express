const fs = require("fs");

// create folder

const createFolder = (folderName) => {
  // chech if exist
  if (!fs.existsSync(folderName)) {
    // create folder
    fs.mkdirSync(folderName);
  }
};

const defaultPosts = `[
  {
    "id":"2023",
    "title":"HTML",
    "url":"http://someurl.com",
    "description":"the"
}
]`;

const createFile = (file) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, defaultPosts);
  }
};

module.exports = { createFile, createFolder };
