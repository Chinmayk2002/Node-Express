//const fsp = require("fs/promises");
const fs = require("fs");

// fs.writeFile("index.html", "hello, welcome", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("file created");
//   }
// });

// const createFile = async (fileToCreate, content) => {
//   try {
//     await fsp.writeFile(fileToCreate, content);
//     console.log("File created");
//   } catch (error) {
//     console.log(error);
//   }
// };
// createFile("test.pdf", "first test pdf");

// const result = fs.readFileSync("./test.pdf");
// console.log(result.toString());

// fs.readFile("./test.pdf", function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data.toString());
//   }
// });

// fs.rename("./test.pdf", "newname.pdf", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File renamed successfully");
//   }
// });

fs.copyFile("./content.docx", "./newname.pdf", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File copied successfully");
  }
});
