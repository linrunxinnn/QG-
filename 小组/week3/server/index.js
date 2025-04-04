const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
// const user = require("./router/user");
const layer = require("./router/createModul");
// const module = require("./router/modul");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/layer", layer);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
