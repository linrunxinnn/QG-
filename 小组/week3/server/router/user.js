const express = require("express");
const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const [results] = await req.db
      .promise()
      .query("SELECT * FROM CreateModulList");
    res.json(results);
  } catch (err) {
    console.error("获取模型列表失败:", err);
    res.status(500).json({ error: "获取模型列表失败" });
  }
});

module.exports = router;
