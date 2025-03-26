//2.input控制
const searchBtn = document.querySelector(".main-contain .input-box button");
const searchInput = document.querySelector(".main-contain .input-box input");
const inputDrop = document.querySelector(".input-drop");
const inputDropUl = document.querySelector(".input-drop ul");

// 输入框获得焦点时显示下拉菜单
searchInput.addEventListener("focus", () => {
  console.log("Input focused - showing dropdown");
  inputDrop.style.display = "block";
});

// 输入框失去焦点时隐藏下拉菜单
searchInput.addEventListener("blur", () => {
  console.log("Input blurred - hiding dropdown");
  setTimeout(() => {
    inputDrop.style.display = "none";
  }, 200);
});

// 确保元素存在
if (!searchInput) console.error("Search input not found");
if (!inputDrop) console.error("Dropdown element not found");

// 点击下拉菜单项时填充输入框
inputDrop.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    searchInput.value = e.target.textContent;
    inputDrop.style.display = "none";
  }
});
searchBtn.addEventListener("click", () => {
  if (searchInput.value === "") {
    alert("禁止输入空白内容");
  } else {
    addData(searchInput.value);
    searchInput.value = "";
  }
});
//搜索框回车事件
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (searchInput.value === "") {
      alert("禁止输入空白内容");
    } else {
      findDataByTitle(searchInput.value, function (data) {
        if (data && data.length > 0) {
          let html = "";
          for (let i = 0; i < data.length; i++) {
            html += `
              <li class="item">
                <div class="finish-box">
                ${
                  data[i].completed
                    ? '<img src="	data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIuMzYzMTcgOS42NzUwNkMxLjU1OTM5IDkuNDc0NDkgMC43NDUyMDQgOS45NjM0OCAwLjU0NDYyOSAxMC43NjczQzAuMzQ0MDU0IDExLjU3MSAwLjgzMzA0NyAxMi4zODUyIDEuNjM2ODMgMTIuNTg1OEwyLjM2MzE3IDkuNjc1MDZaTTguMTU4NzMgMTZMNi43ODA0MSAxNi41OTE4QzcuMDMwOTggMTcuMTc1NCA3LjYyMTk1IDE3LjUzNzkgOC4yNTU3NSAxNy40OTY5QzguODg5NTQgMTcuNDU1OCA5LjQyODc3IDE3LjAyIDkuNjAxOTEgMTYuNDA4OUw4LjE1ODczIDE2Wk0yMi4zMjYxIDMuNDY0MTNDMjMuMTM0NyAzLjI4NDA2IDIzLjY0NDIgMi40ODI1NyAyMy40NjQxIDEuNjczOTVDMjMuMjg0MSAwLjg2NTMyOCAyMi40ODI2IDAuMzU1NzkxIDIxLjY3MzkgMC41MzU4NjZMMjIuMzI2MSAzLjQ2NDEzWk0xLjYzNjgzIDEyLjU4NThDMi4wMjc2NCAxMi42ODMzIDMuMTIyOTkgMTMuMTUxIDQuMjc3OCAxMy45NDI2QzUuNDM5ODggMTQuNzM5MyA2LjM4OTA2IDE1LjY4MDMgNi43ODA0MSAxNi41OTE4TDkuNTM3MDUgMTUuNDA4MkM4LjgxMDk0IDEzLjcxNzEgNy4zMDE1NyAxMi4zNzgzIDUuOTc0MDYgMTEuNDY4MkM0LjYzOTI3IDEwLjU1MzIgMy4yMTM5OSA5Ljg4NzM4IDIuMzYzMTcgOS42NzUwNkwxLjYzNjgzIDEyLjU4NThaTTkuNjAxOTEgMTYuNDA4OUMxMC4xMzU5IDE0LjUyNDQgMTEuNDk0OCAxMS42NTg1IDEzLjY3MjcgOS4wNjM5NUMxNS44NDQ1IDYuNDc2NzUgMTguNzQxNyA0LjI2MjM1IDIyLjMyNjEgMy40NjQxM0wyMS42NzM5IDAuNTM1ODY2QzE3LjI1ODMgMS41MTkyIDEzLjgyNzUgNC4yMTM0MiAxMS4zNzQ5IDcuMTM1MTRDOC45Mjg1MiAxMC4wNDk1IDcuMzY2NzQgMTMuMjkyOSA2LjcxNTU1IDE1LjU5MTFMOS42MDE5MSAxNi40MDg5WiIgZmlsbD0iIzMzMzIyRSIvPgo8L3N2Zz4K" alt="标为未完成" class="icon-finish">'
                    : ""
                }
                </div>
                <div class="text-box">
                  <p>${data[i].title}</p>
                  <input
                        type="text"
                        placeholder="请输入您修改内容"
                        style="display:none"
                      />
                    
                </div>
              </li>
            `;
          }
          inputDropUl.innerHTML = html;
          inputDrop.style.display = "block";
        } else {
          alert("未找到该任务");
        }
        searchInput.value = "";
      });
    }
  }
});

//3.数据
function checkAllRemove(callback) {
  //查询mysql中的所有数据，如果有remove=0的则返回该数据，否则返回空数组
  //返回格式：[{id:1,title:"xxx",completed:0,remove:0},{id:2,title:"xxx",completed:0,remove:0}]
  $.ajax({
    url: "http://localhost:3000/checkAllRemove0",
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
function addData(title) {
  //将传入的title新增到mysql中
  let data = {
    title: title,
    completed: 0,
    removed: 0,
  };
  $.ajax({
    url: "http://localhost:3000/addData",
    method: "post",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (response) {
      console.log("完整服务器响应:", response);
      if (response.status === 200) {
        alert("添加成功");
        console.log("响应数据对象:", response.data);
        show(response.data, listMainUl);
        listDisplay();
      } else {
        alert("添加失败");
      }
    },
    error: function (error) {
      console.log(error);
      alert("添加失败");
    },
  });
}
function findDataByTitle(title, callback) {
  //根据title查找mysql中的数据
  $.ajax({
    url: "http://localhost:3000/findDataByTitle",
    type: "get",
    data: { title: title },
    success: function (response) {
      console.log("完整服务器响应:", response);
      if (response.status === 200) {
        console.log("响应数据对象:", response.data);
        callback(response.data || []);
      } else {
        console.log("查找失败");
        callback([]);
      }
    },
    error: function (error) {
      console.log(error);
      callback([]);
    },
  });
}

//4.主体渲染
const emptyBar = document.querySelector(".bar-contain .empty-bar");
const listBar = document.querySelector(".bar-contain .list-bar");
const emptyMain = document.querySelector(".main-contain .empty-main ");
const listMain = document.querySelector(".main-contain .list-main ");
const emptyMainUl = document.querySelector(".main-contain .empty-main ul");
const listMainUl = document.querySelector(".main-contain .list-main ul");

//初始化页面以及展示全部页面
function show(task, container) {
  if (!task || typeof task !== "object") {
    console.error("无效的任务数据:", task);
    return;
  }
  let { id, title, completed, removed } = task;
  html = `
  <li class="item" data-id="${id}">
    <div class="left" style="display: flex;">
      <div class="finish-box" style="background-color: ${
        completed ? "rgb(140 212 203)" : "transparent"
      }">
        ${
          completed
            ? '<img src="	data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIuMzYzMTcgOS42NzUwNkMxLjU1OTM5IDkuNDc0NDkgMC43NDUyMDQgOS45NjM0OCAwLjU0NDYyOSAxMC43NjczQzAuMzQ0MDU0IDExLjU3MSAwLjgzMzA0NyAxMi4zODUyIDEuNjM2ODMgMTIuNTg1OEwyLjM2MzE3IDkuNjc1MDZaTTguMTU4NzMgMTZMNi43ODA0MSAxNi41OTE4QzcuMDMwOTggMTcuMTc1NCA3LjYyMTk1IDE3LjUzNzkgOC4yNTU3NSAxNy40OTY5QzguODg5NTQgMTcuNDU1OCA5LjQyODc3IDE3LjAyIDkuNjAxOTEgMTYuNDA4OUw4LjE1ODczIDE2Wk0yMi4zMjYxIDMuNDY0MTNDMjMuMTM0NyAzLjI4NDA2IDIzLjY0NDIgMi40ODI1NyAyMy40NjQxIDEuNjczOTVDMjMuMjg0MSAwLjg2NTMyOCAyMi40ODI2IDAuMzU1NzkxIDIxLjY3MzkgMC41MzU4NjZMMjIuMzI2MSAzLjQ2NDEzWk0xLjYzNjgzIDEyLjU4NThDMi4wMjc2NCAxMi42ODMzIDMuMTIyOTkgMTMuMTUxIDQuMjc3OCAxMy45NDI2QzUuNDM5ODggMTQuNzM5MyA2LjM4OTA2IDE1LjY4MDMgNi43ODA0MSAxNi41OTE4TDkuNTM3MDUgMTUuNDA4MkM4LjgxMDk0IDEzLjcxNzEgNy4zMDE1NyAxMi4zNzgzIDUuOTc0MDYgMTEuNDY4MkM0LjYzOTI3IDEwLjU1MzIgMy4yMTM5OSA5Ljg4NzM4IDIuMzYzMTcgOS42NzUwNkwxLjYzNjgzIDEyLjU4NThaTTkuNjAxOTEgMTYuNDA4OUMxMC4xMzU5IDE0LjUyNDQgMTEuNDk0OCAxMS42NTg1IDEzLjY3MjcgOS4wNjM5NUMxNS44NDQ1IDYuNDc2NzUgMTguNzQxNyA0LjI2MjM1IDIyLjMyNjEgMy40NjQxM0wyMS42NzM5IDAuNTM1ODY2QzE3LjI1ODMgMS41MTkyIDEzLjgyNzUgNC4yMTM0MiAxMS4zNzQ5IDcuMTM1MTRDOC45Mjg1MiAxMC4wNDk1IDcuMzY2NzQgMTMuMjkyOSA2LjcxNTU1IDE1LjU5MTFMOS42MDE5MSAxNi40MDg5WiIgZmlsbD0iIzMzMzIyRSIvPgo8L3N2Zz4K" alt="标为未完成" class="icon-finish">'
            : ""
        }
      </div>
      <div class="text-box">
        <input
                        type="text"
                        placeholder="请输入您修改内容"
                        style="display: none"
                      />
        <p style="text-decoration: ${
          completed ? "line-through" : "none"
        }; color: ${completed ? "#33322e88" : "inherit"}">${title}</p>
      </div>
      
    </div>
    <div class="del-box" style="display: flex;" data-id="${id}">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS4wOTkzIDE3Ljc1OTdDMTUuNzk0OSAxOC4yMDk4IDE2LjcyMzUgMTguMDEwOCAxNy4xNzM2IDE3LjMxNTJDMTcuNjIzNiAxNi42MTk3IDE3LjQyNDYgMTUuNjkxMSAxNi43MjkxIDE1LjI0MUMxMy4zMDc5IDEzLjAyNzMgMTAuODIwOSAxMC45OTU5IDguOTIyNTEgOS4wMzczOUM5LjA5NzQyIDguODQ5ODIgOS4yNzI5MSA4LjY2NTcxIDkuNDQ4ODggOC40ODUzNEMxMS44ODY0IDUuOTg2OTIgMTQuMjQ3MiA0LjM4MDY2IDE2LjI5NDQgMy45NzEyMkMxNy4xMDY3IDMuODA4NzUgMTcuNjMzNSAzLjAxODUyIDE3LjQ3MTEgMi4yMDYxOEMxNy4zMDg2IDEuMzkzODQgMTYuNTE4NCAwLjg2NzAxMyAxNS43MDYgMS4wMjk0OEMxMi43NTMyIDEuNjIwMDUgOS44NjQwNiAzLjc2Mzc5IDcuMzAxNTQgNi4zOTAzN0M3LjE4MTUxIDYuNTEzNCA3LjA2MTgxIDYuNjM3ODkgNi45NDI0OSA2Ljc2Mzc1QzUuNDIwMDEgNC44MDQzMyA0LjM3MDU4IDIuODc2MzIgMy40MjU5MSAwLjg2MzE2NEMzLjA3Mzk5IDAuMTEzMjAyIDIuMTgwNzMgLTAuMjA5NDc1IDEuNDMwNzcgMC4xNDI0NDVDMC42ODA4MDkgMC40OTQzNjUgMC4zNTgxMzIgMS4zODc2MiAwLjcxMDA1MSAyLjEzNzU4QzEuODIwODggNC41MDQ4MSAzLjA3ODk5IDYuNzY1MTEgNC45MjkzMiA5LjA1MzA2QzMuMjIyMDYgMTEuMTM0MSAxLjYyNjY5IDEzLjQzMjggMC4yMjI3MjMgMTUuNzE0MkMtMC4yMTE0NTMgMTYuNDE5NyAwLjAwODUyNzUyIDE3LjM0MzcgMC43MTQwNjQgMTcuNzc3OEMxLjQxOTYgMTguMjEyIDIuMzQzNTIgMTcuOTkyIDIuNzc3NyAxNy4yODY1QzQuMDQ4MTkgMTUuMjIyIDUuNDY0MDUgMTMuMTcyNiA2Ljk1NTU5IDExLjMxNjhDOC45ODUgMTMuMzc2NSAxMS41OTU5IDE1LjQ5MjggMTUuMDk5MyAxNy43NTk3WiIgZmlsbD0iIzMzMzIyRSIvPgo8L3N2Zz4K"
        alt="删除"
      />
    </div>
</li>
`;
  container.insertAdjacentHTML("afterbegin", html);
}
//自动显示：除了初始化外在完成增删后页面的显示
function autoShow() {
  //判断list-main ul中是否有子元素
  if (listMainUl.children.length > 0) {
    listDisplay();
  } else {
    emptyDisplay();
  }
}
function showMain() {
  //empty-bar
  //如果mysql中有数据的remove为0，则显示，否则则不显示且主体显示empty-main
  checkAllRemove(function (data) {
    if (data && data.length > 0) {
      //显示
      emptyBar.style.display = "none";
      listBar.style.display = "block";
      listMain.style.display = "block";
      emptyMain.style.display = "none";
      //渲染数据
      listMainUl.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        show(data[i], listMainUl);
      }
    } else {
      emptyBar.style.display = "block";
      listBar.style.display = "none";
      listMain.style.display = "none";
      emptyMain.style.display = "block";
    }
  });
}
showMain();
//初始化recycle
const recycleMain = document.querySelector(".main-contain .recycle-main");
const recycleMainUl = document.querySelector(".main-contain .recycle-main ul");
function showRecycle() {
  checkRecycle(function (data) {
    try {
      if (!data || !Array.isArray(data)) {
        console.log("无效的回收数据:", data);
        data = []; // 确保data是数组
      }
      recycleMainUl.innerHTML = "";
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          show(data[i], recycleMainUl);
        }
      } else {
        console.log("没有回收的数据");
      }
    } catch (error) {
      console.error("showRecycle error:", error);
    }
  });
}
showRecycle();
//展示empty部分
function emptyDisplay() {
  emptyBar.style.display = "block";
  listBar.style.display = "none";
  listMain.style.display = "none";
  emptyMain.style.display = "block";
}
//展示list部分
function listDisplay() {
  emptyBar.style.display = "none";
  listBar.style.display = "block";
  listMain.style.display = "block";
  emptyMain.style.display = "none";
  recycleMain.style.display = "none";
}
//展示recycle部分
function recycleDisplay() {
  emptyBar.style.display = "none";
  listBar.style.display = "block";
  recycleMain.style.display = "block";
  emptyMain.style.display = "none";
  listMain.style.display = "none";
}

//5.item
function changeItem(e, completed) {
  //finish-box背景颜色变化，是否插入图片，p标签的样式变化
  const finishBox = e.closest(".item").querySelector(".finish-box");
  const pElement = finishBox.parentElement.querySelector("p");

  // finishBox.style.backgroundColor = completed ? "" : "rgb(140 212 203)";
  if (completed) {
    finishBox.style.backgroundColor = "rgb(140 212 203)";
    finishBox.innerHTML =
      '<img src="	data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIuMzYzMTcgOS42NzUwNkMxLjU1OTM5IDkuNDc0NDkgMC43NDUyMDQgOS45NjM0OCAwLjU0NDYyOSAxMC43NjczQzAuMzQ0MDU0IDExLjU3MSAwLjgzMzA0NyAxMi4zODUyIDEuNjM2ODMgMTIuNTg1OEwyLjM2MzE3IDkuNjc1MDZaTTguMTU4NzMgMTZMNi43ODA0MSAxNi41OTE4QzcuMDMwOTggMTcuMTc1NCA3LjYyMTk1IDE3LjUzNzkgOC4yNTU3NSAxNy40OTY5QzguODg5NTQgMTcuNDU1OCA5LjQyODc3IDE3LjAyIDkuNjAxOTEgMTYuNDA4OUw4LjE1ODczIDE2Wk0yMi4zMjYxIDMuNDY0MTNDMjMuMTM0NyAzLjI4NDA2IDIzLjY0NDIgMi40ODI1NyAyMy40NjQxIDEuNjczOTVDMjMuMjg0MSAwLjg2NTMyOCAyMi40ODI2IDAuMzU1NzkxIDIxLjY3MzkgMC41MzU4NjZMMjIuMzI2MSAzLjQ2NDEzWk0xLjYzNjgzIDEyLjU4NThDMi4wMjc2NCAxMi42ODMzIDMuMTIyOTkgMTMuMTUxIDQuMjc3OCAxMy45NDI2QzUuNDM5ODggMTQuNzM5MyA2LjM4OTA2IDE1LjY4MDMgNi43ODA0MSAxNi41OTE4TDkuNTM3MDUgMTUuNDA4MkM4LjgxMDk0IDEzLjcxNzEgNy4zMDE1NyAxMi4zNzgzIDUuOTc0MDYgMTEuNDY4MkM0LjYzOTI3IDEwLjU1MzIgMy4yMTM5OSA5Ljg4NzM4IDIuMzYzMTcgOS42NzUwNkwxLjYzNjgzIDEyLjU4NThaTTkuNjAxOTEgMTYuNDA4OUMxMC4xMzU5IDE0LjUyNDQgMTEuNDk0OCAxMS42NTg1IDEzLjY3MjcgOS4wNjM5NUMxNS44NDQ1IDYuNDc2NzUgMTguNzQxNyA0LjI2MjM1IDIyLjMyNjEgMy40NjQxM0wyMS42NzM5IDAuNTM1ODY2QzE3LjI1ODMgMS41MTkyIDEzLjgyNzUgNC4yMTM0MiAxMS4zNzQ5IDcuMTM1MTRDOC45Mjg1MiAxMC4wNDk1IDcuMzY2NzQgMTMuMjkyOSA2LjcxNTU1IDE1LjU5MTFMOS42MDE5MSAxNi40MDg5WiIgZmlsbD0iIzMzMzIyRSIvPgo8L3N2Zz4K" alt="标为未完成" class="icon-finish">';
  } else {
    finishBox.style.backgroundColor = "transparent";
    finishBox.innerHTML = "";
  }

  if (pElement) {
    pElement.style.textDecoration = completed ? "line-through" : "none";
    pElement.style.color = completed ? "#33322e88" : "inherit";
  }
}
function removeItem(e, data) {
  //从list-main中删掉，从recycle-main中加入
  // let id = e.closest(".item").getAttribute("data-id");
  const { id, title, completed } = data;
  document
    .querySelector(".container .list-main ul li[data-id='" + id + "']")
    .remove();
  const html = `
    <li class="item" data-id="${id}">
      <div class="left" style="display: flex;">
        <div class="finish-box" style="background-color: ${
          completed ? "rgb(140 212 203)" : "transparent"
        }">
           ${
             completed
               ? '<img src="	data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIuMzYzMTcgOS42NzUwNkMxLjU1OTM5IDkuNDc0NDkgMC43NDUyMDQgOS45NjM0OCAwLjU0NDYyOSAxMC43NjczQzAuMzQ0MDU0IDExLjU3MSAwLjgzMzA0NyAxMi4zODUyIDEuNjM2ODMgMTIuNTg1OEwyLjM2MzE3IDkuNjc1MDZaTTguMTU4NzMgMTZMNi43ODA0MSAxNi41OTE4QzcuMDMwOTggMTcuMTc1NCA3LjYyMTk1IDE3LjUzNzkgOC4yNTU3NSAxNy40OTY5QzguODg5NTQgMTcuNDU1OCA5LjQyODc3IDE3LjAyIDkuNjAxOTEgMTYuNDA4OUw4LjE1ODczIDE2Wk0yMi4zMjYxIDMuNDY0MTNDMjMuMTM0NyAzLjI4NDA2IDIzLjY0NDIgMi40ODI1NyAyMy40NjQxIDEuNjczOTVDMjMuMjg0MSAwLjg2NTMyOCAyMi40ODI2IDAuMzU1NzkxIDIxLjY3MzkgMC41MzU4NjZMMjIuMzI2MSAzLjQ2NDEzWk0xLjYzNjgzIDEyLjU4NThDMi4wMjc2NCAxMi42ODMzIDMuMTIyOTkgMTMuMTUxIDQuMjc3OCAxMy45NDI2QzUuNDM5ODggMTQuNzM5MyA2LjM4OTA2IDE1LjY4MDMgNi43ODA0MSAxNi41OTE4TDkuNTM3MDUgMTUuNDA4MkM4LjgxMDk0IDEzLjcxNzEgNy4zMDE1NyAxMi4zNzgzIDUuOTc0MDYgMTEuNDY4MkM0LjYzOTI3IDEwLjU1MzIgMy4yMTM5OSA5Ljg4NzM4IDIuMzYzMTcgOS42NzUwNkwxLjYzNjgzIDEyLjU4NThaTTkuNjAxOTEgMTYuNDA4OUMxMC4xMzU5IDE0LjUyNDQgMTEuNDk0OCAxMS42NTg1IDEzLjY3MjcgOS4wNjM5NUMxNS44NDQ1IDYuNDc2NzUgMTguNzQxNyA0LjI2MjM1IDIyLjMyNjEgMy40NjQxM0wyMS42NzM5IDAuNTM1ODY2QzE3LjI1ODMgMS41MTkyIDEzLjgyNzUgNC4yMTM0MiAxMS4zNzQ5IDcuMTM1MTRDOC45Mjg1MiAxMC4wNDk1IDcuMzY2NzQgMTMuMjkyOSA2LjcxNTU1IDE1LjU5MTFMOS42MDE5MSAxNi40MDg5WiIgZmlsbD0iIzMzMzIyRSIvPgo8L3N2Zz4K" alt="标为未完成" class="icon-finish">'
               : ""
           }
        </div>
        <div class="text-box">
        <input
                        type="text"
                        placeholder="请输入您修改内容"
                        style="display: none"
                      />
        <p style="text-decoration: ${
          completed ? "line-through" : "none"
        }; color: ${completed ? "#33322e88" : "inherit"}">${title}</p>
      </div>
      </div>
      <div class="del-box" style="display: flex;" data-id="${id}">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS4wOTkzIDE3Ljc1OTdDMTUuNzk0OSAxOC4yMDk4IDE2LjcyMzUgMTguMDEwOCAxNy4xNzM2IDE3LjMxNTJDMTcuNjIzNiAxNi42MTk3IDE3LjQyNDYgMTUuNjkxMSAxNi43MjkxIDE1LjI0MUMxMy4zMDc5IDEzLjAyNzMgMTAuODIwOSAxMC45OTU5IDguOTIyNTEgOS4wMzczOUM5LjA5NzQyIDguODQ5ODIgOS4yNzI5MSA4LjY2NTcxIDkuNDQ4ODggOC40ODUzNEMxMS44ODY0IDUuOTg2OTIgMTQuMjQ3MiA0LjM4MDY2IDE2LjI5NDQgMy45NzEyMkMxNy4xMDY3IDMuODA4NzUgMTcuNjMzNSAzLjAxODUyIDE3LjQ3MTEgMi4yMDYxOEMxNy4zMDg2IDEuMzkzODQgMTYuNTE4NCAwLjg2NzAxMyAxNS43MDYgMS4wMjk0OEMxMi43NTMyIDEuNjIwMDUgOS44NjQwNiAzLjc2Mzc5IDcuMzAxNTQgNi4zOTAzN0M3LjE4MTUxIDYuNTEzNCA3LjA2MTgxIDYuNjM3ODkgNi45NDI0OSA2Ljc2Mzc1QzUuNDIwMDEgNC44MDQzMyA0LjM3MDU4IDIuODc2MzIgMy40MjU5MSAwLjg2MzE2NEMzLjA3Mzk5IDAuMTEzMjAyIDIuMTgwNzMgLTAuMjA5NDc1IDEuNDMwNzcgMC4xNDI0NDVDMC42ODA4MDkgMC40OTQzNjUgMC4zNTgxMzIgMS4zODc2MiAwLjcxMDA1MSAyLjEzNzU4QzEuODIwODggNC41MDQ4MSAzLjA3ODk5IDYuNzY1MTEgNC45MjkzMiA5LjA1MzA2QzMuMjIyMDYgMTEuMTM0MSAxLjYyNjY5IDEzLjQzMjggMC4yMjI3MjMgMTUuNzE0MkMtMC4yMTE0NTMgMTYuNDE5NyAwLjAwODUyNzUyIDE3LjM0MzcgMC43MTQwNjQgMTcuNzc3OEMxLjQxOTYgMTguMjEyIDIuMzQzNTIgMTcuOTkyIDIuNzc3NyAxNy4yODY1QzQuMDQ4MTkgMTUuMjIyIDUuNDY0MDUgMTMuMTcyNiA2Ljk1NTU5IDExLjMxNjhDOC45ODUgMTMuMzc2NSAxMS41OTU5IDE1LjQ5MjggMTUuMDk5MyAxNy43NTk3WiIgZmlsbD0iIzMzMzIyRSIvPgo8L3N2Zz4K"
          alt="删除"
        />
      </div>
    </li>
  `;
  recycleMainUl.insertAdjacentHTML("afterbegin", html);
}
//finish-box点击事件 - 使用事件委托
document
  .querySelector(".container .todo-contain")
  .addEventListener("click", (e) => {
    if (e.target.closest(".finish-box")) {
      let id = e.target.closest(".item").getAttribute("data-id");
      $.ajax({
        url: "http://localhost:3000/updateCompleted",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({ id: id }),
        success: function (data) {
          console.log(data);
          changeItem(e.target, data.data.completed);
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  });
//del-box点击事件 - 使用事件委托
document
  .querySelector(".container .todo-contain")
  .addEventListener("click", (e) => {
    if (e.target.closest(".del-box")) {
      let id = e.target.closest(".del-box").getAttribute("data-id");
      $.ajax({
        url: "http://localhost:3000/updateRemoved",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({ id: id }),
        success: function (data) {
          console.log(data);
          removeItem(e.target, data.data);
          autoShow();
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  });
//双击修改title
document
  .querySelector(".container .todo-contain")
  .addEventListener("dblclick", (e) => {
    if (e.target.closest(".text-box")) {
      const pElement = e.target.closest(".text-box").querySelector("p");
      const id = e.target.closest(".item").getAttribute("data-id");
      const inputElement = e.target.closest(".text-box").querySelector("input");
      pElement.style.display = "none";
      inputElement.style.display = "block";
      inputElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const title = inputElement.value;
          $.ajax({
            url: "http://localhost:3000/updateTitle",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({ id: id, title: title }),
            success: function (data) {
              console.log(data);
              pElement.innerHTML = title;
              pElement.style.display = "block";
              inputElement.style.display = "none";
            },
            error: function (err) {
              console.log(err);
            },
          });
        }
      });
    }
  });

//1.bar控制
//bar开关
function barOpenClose(order) {
  if (order === "open") {
    document.querySelector(".bar-contain .empty-bar").style.display = "none";
    document.querySelector(".bar-contain .list-bar").style.display = "none";
    document.querySelector(".bar-contain [data-box='open']").style.display =
      "none";
    document.querySelector(".bar-contain [data-box='close']").style.display =
      "block";
  } else {
    console.log("close");
    document.querySelector(".bar-contain [data-box='open']").style.display =
      "block";
    document.querySelector(".bar-contain [data-box='close']").style.display =
      "none";
    if (listMainUl.children.length > 0) {
      document.querySelector(".bar-contain .list-bar").style.display = "block";
      document.querySelector(".bar-contain .empty-bar").style.display = "none";
    } else {
      console.log("open");
      document.querySelector(".bar-contain .empty-bar").style.display = "block";
      document.querySelector(".bar-contain .list-bar").style.display = "none";
    }
  }
}
function clearCompleted() {
  $.ajax({
    url: "http://localhost:3000/clearCompleted",
    method: "post",
    success: function (data) {
      console.log(data);
      autoShow();
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function clearall() {
  $.ajax({
    url: "http://localhost:3000/clearAll",
    method: "post",
    success: function (data) {
      console.log(data);
      autoShow();
    },
    error: function (err) {
      console.log(err);
    },
  });
}
function exportData() {
  // $.ajax({
  //   url: "http://localhost:3000/exportData",
  //   method: "get",
  //   success: function (data) {
  //     console.log(data);
  //     // const a = document.createElement("a");
  //     // a.href = data.url;
  //     // a.download = "todo.json";
  //     // a.click();
  //   },
  //   error: function (err) {
  //     console.log(err);
  //   },
  // });
  const link = document.createElement("a");
  link.href = "http://localhost:3000/exportData";
  link.download = "tasks.txt"; // 设置下载文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function addActive(boxType) {
  document.querySelectorAll(".bar-contain ul li").forEach((item) => {
    if (item.dataset.box === boxType) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
document.querySelectorAll(".bar-contain ul li").forEach((item) => {
  item.addEventListener("click", () => {
    const boxType = item.dataset.box;
    switch (boxType) {
      case "open":
        barOpenClose("open");
        addActive(boxType);
        break;
      case "close":
        barOpenClose("close");
        addActive(boxType);
        break;
      case "all-main":
        listDisplay();
        addActive(boxType);
        break;
      case "recycle-main":
        showRecycle();
        recycleDisplay();
        addActive(boxType);
        break;
      case "clearfinish-main":
        clearCompleted();
        showMain();
        addActive(boxType);
        break;
      case "clearall-main":
        clearall();
        showMain();
        addActive(boxType);
        break;
      case "exportdata-main":
        exportData();
        break;
      default:
        console.warn("Unknown box type:", boxType);
    }
  });
});
