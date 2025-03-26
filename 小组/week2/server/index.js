const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/addData", (req, res) => {
  const title = req.body.title;
  const completed = req.body.completed || 0;
  const removed = req.body.removed || 0;
  const sql = `insert into tasks (title, completed, removed) values (?, ?, ?)`;
  db.query(sql, [title, completed, removed], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: 500, msg: "添加失败" });
    } else {
      res.status(200).json({
        status: 200,
        msg: "添加成功",
        data: {
          id: result.insertId,
          title,
          completed,
          removed,
        },
      });
    }
  });
});

app.post("/updateCompleted", (req, res) => {
  const id = req.body.id;
  const updateSql = `update tasks set completed = not completed where id = ?`;
  const selectSql = `select completed from tasks where id = ?`;

  db.query(updateSql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: "更新失败" });
    }

    db.query(selectSql, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: 500, msg: "查询失败" });
      }

      if (
        !result ||
        result.length === 0 ||
        typeof result[0].completed === "undefined"
      ) {
        return res.status(404).json({ error: "任务不存在或缺少completed字段" });
      }

      const completed = Boolean(result[0].completed); // 转换为布尔值
      res.status(200).json({
        status: 200,
        msg: "更新成功",
        data: { completed },
      });
    });
  });
});

app.post("/updateRemoved", (req, res) => {
  const id = req.body.id;
  const updateSql = `update tasks set removed=1 where id=?`;
  const selectSql = `select completed from tasks where id = ?`;

  db.query(updateSql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: "删除失败" });
    }

    db.query(selectSql, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: 500, msg: "查询失败" });
      }

      if (
        !result ||
        result.length === 0 ||
        typeof result[0].completed === "undefined"
      ) {
        return res.status(404).json({ error: "任务不存在或缺少completed字段" });
      }

      const removed = Boolean(result[0].removed); // 转换为布尔值
      const completed = Boolean(result[0].completed); // 转换为布尔值
      const title = result[0].title;
      res.status(200).json({
        status: 200,
        msg: "更新成功",
        data: { id, title, completed, removed },
      });
    });
  });
});

app.get("/checkAllRemove0", (req, res) => {
  //查询mysql中的所有数据，如果有remove=0的则返回该数据，否则返回空数组
  const sql = `select * from tasks where removed=0`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: "查询失败" });
    }
    res.status(200).json({
      status: 200,
      msg: "查询成功",
      data: result,
    });
  });
});

app.get("/checkAllRemove1", (req, res) => {
  //查询mysql中的所有数据，如果有remove=1的则返回该数据，否则返回空数组
  const sql = `select * from tasks where removed=1`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: "查询失败" });
    }
    res.status(200).json({
      status: 200,
      msg: "查询成功",
      data: result,
    });
  });
});

app.post("/clearCompleted", (req, res) => {
  const sql = `update tasks set removed=1 where completed=1`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: "更新失败" });
    }
    res.status(200).json({
      status: 200,
      msg: "更新成功",
    });
  });
});

app.post("/clearAll", (req, res) => {
  const sql = `update tasks set removed=1`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: "更新失败" });
    }
    res.status(200).json({
      status: 200,
      msg: "更新成功",
    });
  });
});

app.get("/findDataByTitle", (req, res) => {
  const title = req.query.title;
  const sql = `select * from tasks where title like '%${title}%'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: "查询失败" });
    }
    res.status(200).json({
      status: 200,
      msg: "查询成功",
      data: result,
    });
  });
});

app.post("/updateTitle", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const sql = `update tasks set title=? where id=?`;
  db.query(sql, [title, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: "更新失败" });
    }
    res.status(200).json({
      status: 200,
      msg: "更新成功",
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
