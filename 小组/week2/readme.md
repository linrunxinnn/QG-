# 第二周作业——todolist 复刻

### 实现内容

##### 静态页面

- 用 css 实现了顶部的菱形旋转效果和摆钟
- 基础的静态页面

##### 动态

###### 未实现：

- 中英页面
- 导入

###### 实现：

- 顶部 input，点击提交按钮可以提交新任务，点击 enter 键可以按照关键词搜索存在的任务
- 右边的导航部分开关，展示全部，展示回收站，清除已完成，清除全部的动态效果以及对应的功能实现
- 具体任务部分，左侧点击可以标记为完成并给任务内容附带划线效果，右侧的删除按钮可以将任务标记为回收并添加至回收站，中间文段部分可以双击进行重新编辑，按 enter 键重新保存并渲染
- 数据存储，初步将数据存储至 mysql 数据库中，通过 ajax 与数据库传输
- 导出任务文件

### 一些思考

- ajax 的异步性没有很深刻的理解，中间有多次因为该特性写出了 bug，比如下方：

```
function checkRecycle(callback) {
  //查询mysql中的所有数据，如果有remove=1的则返回该数据，否则返回空数组
  //返回格式：[{id:1,title:"xxx",completed:0,remove:1},{id:2,title:"xxx",completed:0,remove:1}]
  $.ajax({
    url: "http://localhost:3000/checkAllRemove1",
    type: "get",
    success: function (response) {
      callback(response.data || []);
    },
    error: function (err) {
      console.log(err);
      callback([]);
    },
  });
}
```

- 代码复用性不高，很多重复代码
- node 不熟练，以及很多知识点不了解或者忘记
- 善用输出大法来 debug
- 或许可以增加一个**运行日志**来帮助找 bug，不了解，后面学习
- 这次感觉有一定的结构化了，思路会更加清晰
