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

module.exports = router;
