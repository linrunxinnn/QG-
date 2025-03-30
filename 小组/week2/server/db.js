const mysql = require("mysql");

// 创建连接但不指定数据库
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lrxyuzuru0314",
});

// 连接后自动创建数据库和表
connection.connect((err) => {
  if (err) {
    console.log("数据库连接失败:", err);
    return;
  }

  connection.query("CREATE DATABASE IF NOT EXISTS todo_list", (err) => {
    if (err) throw err;
    // 切换到新数据库
    connection.query("USE todo_list", (err) => {
      if (err) throw err;
      // 创建tasks表
      const createTable = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          completed TINYINT(1) DEFAULT 0,
          removed TINYINT(1) DEFAULT 0
        )`;

      connection.query(createTable, (err) => {
        if (err) throw err;
        console.log("数据库和表创建成功");
      });
    });
  });
});

// 创建新的数据库连接(使用todo_list数据库)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lrxyuzuru0314",
  database: "todo_list",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("数据库连接成功");
  }
});

module.exports = db;
