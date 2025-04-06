const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
// const user = require("./router/user");
const layer = require("./router/createModul");
const moduleList = require("./router/modul");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5501"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));

app.use("/layer", layer);
app.use("/modul", moduleList);
app.use("/run", (req, res) => {
  console.log("run", req.body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
