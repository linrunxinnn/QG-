const mysql = require("mysql");

// 创建连接但不指定数据库
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "lrxyuzuru0314",
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.log("数据库连接失败:", err);
    return;
  }
  connection.query("CREATE DATABASE IF NOT EXISTS modelApp", (err) => {
    if (err) throw err;
    // 切换到新数据库
    connection.query("USE modelApp", (err) => {
      if (err) throw err;
      // 创建用户表
      const UserList = `
          CREATE TABLE IF NOT EXISTS UserList (
            id INT AUTO_INCREMENT PRIMARY KEY,
            phone VARCHAR(11) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
          )`;

      // 创建系统自带模型
      const SystemModulList = `
          CREATE TABLE IF NOT EXISTS SystemModulList (
            id INT AUTO_INCREMENT PRIMARY KEY,
            model_head VARCHAR(255) NOT NULL,
            model_data JSON,
            model_svg LONGTEXT,
            model_url VARCHAR(255) NOT NULL
          )`;

      // 创建用户添加模型表
      const PersonModulList = `
          CREATE TABLE IF NOT EXISTS PersonModulList (
            user_id INT NOT NULL,
            id INT AUTO_INCREMENT PRIMARY KEY,
            model_head VARCHAR(255) NOT NULL,
            model_data JSON,
            model_svg LONGTEXT,
            model_url VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES UserList(id) ON DELETE CASCADE On UPDATE CASCADE
            )`;

      // 创建自定义模型表
      const CreateModulList = `
          CREATE TABLE IF NOT EXISTS CreateModulList (
            id INT AUTO_INCREMENT PRIMARY KEY,
            head VARCHAR(255) NOT NULL,
            model_data varchar(500) NOT NULL,
            removed BOOLEAN DEFAULT false,
            scale INT DEFAULT 1,
            model_url VARCHAR(255) NOT NULL,
            user_id INT NOT NULL,
            foreign key(user_id) references UserList(id) on delete cascade on update cascade
          )`;

      // 创建层级表
      const LayerList = `
          CREATE TABLE IF NOT EXISTS LayerList (
            modulId INT NOT NULL,
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            layer INT NOT NULL,
            work varchar(255) NOT NULL,
            weight INT NOT NULL,
            remark varchar(255) NOT NULL,
            ins_outs json,
            position json,
            foreign key(modulId) references CreateModulList(id) on delete cascade on update cascade
          )`;

      // 执行所有表创建
      connection.query(UserList, (err) => {
        if (err) throw err;
        connection.query(SystemModulList, (err) => {
          if (err) throw err;
          connection.query(PersonModulList, (err) => {
            if (err) throw err;
            connection.query(CreateModulList, (err) => {
              if (err) throw err;
              connection.query(LayerList, (err) => {
                if (err) throw err;
                console.log("所有数据库表创建成功");
              });
            });
          });
        });
      });
    });
  });
});

// 创建新的数据库连接(使用modelApp数据库)
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "lrxyuzuru0314",
  port: 3306,
  database: "modelApp",
});

db.connect((err) => {
  if (err) {
    console.log("数据库连接失败", err);
  } else {
    console.log("数据库连接成功");
  }
});

module.exports = db;
