// 添加模型
//蒙版
const overlay = document.querySelector(".overlay");
const addBox = document.querySelector(".add-box");
document
  .querySelector(".main .left-box .head .add")
  .addEventListener("click", (item) => {
    overlay.classList.add("show-block");
    addBox.classList.add("show-flex");
  });
//关闭蒙版
document
  .querySelector(".add-box .btn-box .cancel-btn")
  .addEventListener("click", (item) => {
    console.log(1);

    overlay.classList.remove("show-block");
    addBox.classList.remove("show-flex");
  });

//搜索

//模型列表
document
  .querySelectorAll(".main .left-box .list ul li .item")
  .forEach((item) => {
    if (item.classList.contains("item")) {
      item.addEventListener("click", (e) => {
        e.currentTarget
          .querySelectorAll(".right svg")
          .forEach((x) => x.classList.toggle("hide"));

        const dropdown =
          e.currentTarget.parentElement.querySelector(".dropdown");
        if (dropdown) {
          dropdown.classList.toggle("hide");
        }
      });
    }
  });

//展示部分
//串行并行按钮
document
  .querySelectorAll(".main .show-box .change-box span")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      e.currentTarget.classList.add("active");
      e.currentTarget.parentElement.querySelectorAll("span").forEach((x) => {
        if (x != e.currentTarget) {
          x.classList.remove("active");
        }
      });
    });
  });

//拖拽展示
let scale = 1; //缩放比例
const stage = document.querySelector(".main .right-box .show-box");
//拖拽初始化
document
  .querySelectorAll(".main .left-box .list ul li .dropdown .item")
  .forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      const modelName = e.currentTarget.querySelector(".left h4").textContent;
      const modelDesc =
        e.currentTarget.querySelector(".message p")?.textContent || "暂无描述";

      e.dataTransfer.setData("type", "model-list-item");
      e.dataTransfer.setData("offsetX", (e.offsetX * scale).toFixed(2));
      e.dataTransfer.setData("offsetY", (e.offsetY * scale).toFixed(2));
      e.dataTransfer.setData("modelName", modelName);
      e.dataTransfer.setData("modelDesc", modelDesc);
    });
  });
//放置处理
stage.addEventListener("drop", (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  if (type === "model-list-item") {
    const offsetX = e.dataTransfer.getData("offsetX");
    const offsetY = e.dataTransfer.getData("offsetY");
    const stageRect = stage.getBoundingClientRect();
    const scrollLeft = document.documentElement.scrollLeft;
    const scrollTop = document.documentElement.scrollTop;

    const x =
      (e.clientX - stageRect.left + scrollLeft) / scale - parseFloat(offsetX);
    const y =
      (e.clientY - stageRect.top + scrollTop) / scale - parseFloat(offsetY);

    // 创建固定样式的item
    const modelName = e.dataTransfer.getData("modelName");
    const modelDesc = e.dataTransfer.getData("modelDesc");

    const newItem = document.createElement("div");
    newItem.className = "show-item item";
    newItem.draggable = true;
    newItem.style.position = "absolute";
    newItem.style.left = `${x}px`;
    newItem.style.top = `${y}px`;
    newItem.innerHTML = `
      <div class="top">
        <h3>${modelName}</h3>
      </div>
      <div class="message">
        <ul>
          <li>
            <label>权重：</label>
            <span>1</span>
            <input style="display: none" type="text" value="1" />
          </li>
          <li>
            <label>负责：</label>
            <span>${modelDesc}</span>
            <input style="display: none" type="text" value="${modelDesc}" />
          </li>
          <li>
            <label>备注：</label>
            <span>备注信息</span>
            <input style="display: none" type="text" value="备注信息" />
          </li>
        </ul>
      </div>
      <div class="connect">
        <div class="connector prev-connector" data-dir="prev">←</div>
        <div class="connector next-connector" data-dir="next">→</div>
      </div>
      <div class="edit">
        <ul>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="18" height="18">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            <span>复制</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="18" height="18">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <span>删除</span>
          </li>
        </ul>
      </div>
    `;
    stage.appendChild(newItem);
  }
});

// 添加dragover事件处理
stage.addEventListener("dragover", (e) => {
  e.preventDefault();
});

//展示台放大缩小

//展示台内项目移动
// 为show-box中的item添加拖拽功能
stage.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("show-item")) {
    e.dataTransfer.setData("type", "show-box-item");
    e.dataTransfer.setData("id", e.target.id || Date.now());
    e.dataTransfer.setData("offsetX", e.offsetX);
    e.dataTransfer.setData("offsetY", e.offsetY);
    // 设置拖拽效果为移动
    e.dataTransfer.effectAllowed = "move";
    // 标记为正在拖拽的元素
    e.target.classList.add("dragging");
  }
});

// 处理show-box内item的放置
stage.addEventListener("drop", (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");

  if (type === "show-box-item") {
    const id = e.dataTransfer.getData("id");
    const offsetX = e.dataTransfer.getData("offsetX");
    const offsetY = e.dataTransfer.getData("offsetY");

    // 计算新位置
    const stageRect = stage.getBoundingClientRect();
    const x = e.clientX - stageRect.left - offsetX;
    const y = e.clientY - stageRect.top - offsetY;

    // 找到正在拖拽的元素
    const draggingItem = stage.querySelector(".show-item.dragging");
    if (draggingItem) {
      // 更新位置
      draggingItem.style.left = `${x}px`;
      draggingItem.style.top = `${y}px`;
      draggingItem.classList.remove("dragging");
    }

    // 阻止默认行为
    return false;
  }
});

// 允许放置
stage.addEventListener("dragover", (e) => {
  const type = e.dataTransfer.getData("type");
  if (type === "show-box-item") {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
});

//展示台内项目删除(复制)
const editBox = document.querySelector(".main .right-box .show-box .edit");

if (editBox) {
  // 使用事件委托处理右键菜单
  stage.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".show-item")) {
      e.preventDefault();
      currentTarget = e.target.closest(".show-item");

      editBox.style.display = "block";
      editBox.style.left = `${e.clientX}px`;
      editBox.style.top = `${e.clientY}px`;
    }
  });

  // 点击菜单项后自动隐藏
  editBox.querySelectorAll("li").forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      editBox.style.display = "none";
    });
  });

  // 点击其他地方隐藏editBox
  document.addEventListener("click", (e) => {
    if (editBox && !editBox.contains(e.target)) {
      editBox.style.display = "none";
    }
  });

  // 阻止editBox内部点击冒泡
  editBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

//展示台内项目编辑

//展示台内项目连接

//数据库操作
