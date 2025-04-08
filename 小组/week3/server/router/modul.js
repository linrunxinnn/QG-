const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const { user_id, model_head, model_data, model_svg, model_url } = req.body;
  const sql = `insert into modelapp.PersonModulList(user_id,model_head,model_data,model_svg,model_url) values(?,?,?,?,?)`;

  db.query(
    sql,
    [user_id, model_head, model_data, model_svg, model_url],
    (err, result) => {
      if (err) {
        console.error("数据库插入错误:", err); // 加上这一句
        return res.status(500).json({ error: "添加失败" });
      }
      res.json({ message: "添加成功", id: result.insertId });
    }
  );
});

router.post("/addModul", (req, res) => {
  const { user_id, model_head, model_data, model_url } = req.body;
  const sql = `insert into modelapp.createmodullist(user_id,head,model_data,model_url) values(?,?,?,?)`;

  db.query(sql, [user_id, model_head, model_data, model_url], (err, result) => {
    if (err) {
      console.error("数据库插入错误:", err); // 加上这一句
      return res.status(500).json({ error: "添加失败" });
    }
    res.json({
      message: "添加成功",
      module_id: result.insertId,
    });
  });
});

// 初始化库路由
router.get("/initializeLibrary", (req, res) => {
  const user_id = req.query.user_id;
  console.log("查询用户模块列表，user_id:", user_id); // 添加调试日志

  const sql = `SELECT * FROM modelapp.personmodullist WHERE user_id=?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("获取数据错误:", err);
      return res.status(500).json({ error: "获取数据失败" });
    }
    console.log("查询结果:", results); // 添加调试日志
    res.json({ message: "获取数据成功", data: results });
  });
});

module.exports = router;
