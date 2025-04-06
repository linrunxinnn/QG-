const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const { modulId, name, layer, work, weight, remark, ins_outs, position } =
    req.body;
  const sql = `insert into modelApp.LayerList(modulId,name,layer,work,weight,remark,ins_outs,position) values(?,?,?,?,?,?,?,?)`;

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

router.post("/ins_outs", (req, res) => {
  const { start, end } = req.body;

  const updateStartSql = `
    UPDATE modelApp.LayerList
    SET ins_outs = JSON_SET(
      COALESCE(ins_outs, '{"ins":[],"outs":[]}'),
      '$.outs',
      JSON_ARRAY_APPEND(
        COALESCE(JSON_EXTRACT(ins_outs, '$.outs'), JSON_ARRAY()),
        '$',
        JSON_OBJECT('id', ?, 'x', ?, 'y', ?)
      )
    )
    WHERE id = ?;
  `;

  const updateEndSql = `
    UPDATE modelApp.LayerList
    SET ins_outs = JSON_SET(
      COALESCE(ins_outs, '{"ins":[],"outs":[]}'),
      '$.ins',
      JSON_ARRAY_APPEND(
        COALESCE(JSON_EXTRACT(ins_outs, '$.ins'), JSON_ARRAY()),
        '$',
        JSON_OBJECT('id', ?, 'x', ?, 'y', ?)
      )
    )
    WHERE id = ?;
  `;

  // 执行两个更新操作
  db.query(updateStartSql, [end.id, end.x, end.y, start.id], (err, result) => {
    if (err) {
      console.error("更新起始节点错误:", err);
      return res.status(500).json({ error: "更新失败" });
    }

    db.query(
      updateEndSql,
      [start.id, start.x, start.y, end.id],
      (err, result) => {
        if (err) {
          console.error("更新结束节点错误:", err);
          return res.status(500).json({ error: "更新失败" });
        }
        res.json({ message: "连接线数据保存成功" });
      }
    );
  });
});

router.patch("/updatePosition", (req, res) => {
  const { id, position } = req.body;
  console.log("收到位置更新请求:", { id, position });

  const sql = `UPDATE modelApp.LayerList SET position = ? WHERE id = ?`;

  db.query(sql, [JSON.stringify(position), id], (err, result) => {
    if (err) {
      console.error("更新位置错误:", err);
      return res.status(500).json({ error: "更新失败" });
    }
    console.log("数据库更新结果:", result);
    res.json({ message: "位置更新成功", updated: result.affectedRows > 0 });
  });
});

router.get("/getins_outs", (req, res) => {
  const sql = `SELECT id, ins_outs FROM modelApp.LayerList`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("获取节点连接数据错误:", err);
      return res.status(500).json({ error: "获取数据失败" });
    }

    const nodes = results.map((row) => ({
      id: row.id,
      ins_outs: row.ins_outs ? JSON.parse(row.ins_outs) : { ins: [], outs: [] },
    }));

    res.json(nodes);
  });
});

router.patch("/updateLayer", (req, res) => {
  const { id, layer } = req.body;
  const sql = `UPDATE modelApp.LayerList SET layer = ? WHERE id = ?`;

  db.query(sql, [layer, id], (err, result) => {
    if (err) {
      console.error("更新层级错误:", err);
      return res.status(500).json({ error: "更新失败" });
    }
    res.json({ message: "层级更新成功", updated: result.affectedRows > 0 });
  });
});

router.get("/get", (req, res) => {
  const sql = `SELECT * FROM modelApp.LayerList`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("获取数据错误:", err);
      return res.status(500).json({ error: "获取数据失败" });
    }
    res.json({ message: "获取数据成功", data: results });
  });
});

module.exports = router;
