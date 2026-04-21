const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const app = express();

app.use(express.json());

const SECRET = "secret123";
let db = require("./db.json");

function saveDB() {
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
}