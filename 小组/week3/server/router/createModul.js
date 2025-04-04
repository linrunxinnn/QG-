const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const { modulId, name, layer, work, weight, remark, ins_outs, position } =
    req.body;
  const sql = `insert into modelapp.layerlist(modulId,name,layer,work,weight,remark,ins_outs,position) values(?,?,?,?,?,?,?,?)`;

  db.query(
    sql,
    [
      modulId,
      name,
      layer,
      work,
      weight,
      remark,
      JSON.stringify(ins_outs), // 一定要序列化成字符串
      JSON.stringify(position),
    ],
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
