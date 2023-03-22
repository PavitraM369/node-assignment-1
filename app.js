const express = require("express");
const yargs = require("yargs");
const prompt = require("prompt-sync")();
const fs = require("fs");
const app = express();

var argv = require("yargs/yargs")(process.argv.slice(2)).argv;

if (argv.fileName) {
  let fileName = argv.fileName;
  const data = fs.readFileSync("fileNames.txt", "utf-8").split(" ");
  if (data.includes(fileName)) {
    const file = prompt("new file name: ");
    fs.writeFileSync(file + ".txt", "You are awesome", (err) => {
      if (err) throw err;
    });
  } else {
    fs.appendFileSync("fileNames.txt", argv.fileName + " ", (err) => {
      if (err) throw err;
    });
  }
}

app.get("/getData", function (req, res) {
  fs.readFile("data.json", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(JSON.parse(result));
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port number");
});
