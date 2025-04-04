// 添加模型

//蒙版
const overlay = document.querySelector(".overlay");
const addBox = document.querySelector(".add-box");
document
  .querySelector(".main .left-box .head .add")
  .addEventListener("click", (item) => {
    overlay.style.display = "block";
    addBox.style.display = "flex";
  });
//关闭蒙版
document
  .querySelector(".add-box .btn-box .cancel-btn")
  .addEventListener("click", (item) => {
    console.log(1);

    overlay.style.display = "none";
    addBox.style.display = "none";
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
const modelItem = document.querySelectorAll(
  ".main .left-box .list ul li .dropdown .item"
);
let scale = 1;
let selectedNode = null;
let startX,
  stratY,
  selectedLine = null;
const showBox = document.querySelector(".main .right-box .show-box");
//从模型列表脱拽过来
modelItem.forEach((item) => [
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "node");
  }),
]);

showBox.addEventListener("dragover", (e) => {
  e.preventDefault(); // 允许放置
});

showBox.addEventListener("drop", async (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("text/plain");
  if (type === "node") {
    const showBoxRect = showBox.getBoundingClientRect();
    const outShowBox = document.querySelector(".out-show-box");
    const outRect = outShowBox.getBoundingClientRect();

    // 计算相对于show-box的位置，考虑缩放和偏移
    const x = (e.clientX - showBoxRect.left) / scale;
    const y = (e.clientY - showBoxRect.top) / scale;

    // 检查是否在out-show-box范围内
    if (
      x >= 0 &&
      x <= outRect.width / scale &&
      y >= 0 &&
      y <= outRect.height / scale
    ) {
      add(x, y);
    }
  }
});
//添加节点
async function add(x, y) {
  const node = document.createElement("div");
  node.classList.add("node");
  node.classList.add("item");
  node.classList.add("show-item");
  node.style.left = x + "px";
  node.style.top = y + "px";
  node.innerHTML = `
    <div class="top">
                <div class="drag-handle"></div>
                <h3>ChatGPT 4.o</h3>
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
                    <span>这是关于gpt4.0的介绍</span>
                    <input
                      style="display: none"
                      type="text"
                      value="这是关于gpt4.0的介绍"
                    />
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
              <div class="edit" style="display: none">
                <ul>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                      width="18"
                      height="18"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                      ></path>
                    </svg>
                    <span>复制</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                      width="18"
                      height="18"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      ></path>
                    </svg>
                    <span>删除</span>
                  </li>
                </ul>
              </div>
  `;

  //向层级表中添加数据
  const data = {
    modulId: 1,
    name: "ChatGPT 4.o",
    layer: 0,
    work: "不知道",
    weight: 1,
    remark: "这是关于gpt4.0的介绍",
    ins_outs: {
      ins: [],
      outs: [],
    },
    position: {
      first: [1, 1],
      second: [2, 2],
    },
  };
  fetch("http://localhost:3000/layer/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("layer添加成功", result);
      // 在这里可以使用 result.id 来获取新添加的记录的 ID
      node.dataset.id = result.id; // 将 ID 存储在节点上
    })
    .catch((error) => {
      console.error("layer添加失败", error);
    });

  showBox.appendChild(node);
  makeDraggable(node); // 让节点可拖动
}
//让节点可以拖动
let draggingConnector = null;
let tempLine = null;
function makeDraggable(node) {
  const header = node.querySelector(".drag-handle");
  const connectors = node.querySelectorAll(".connector");
  const editDiv = node.querySelector(".edit");

  let offsetX, offsetY;

  header.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    let rect = node.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    function moveNode(e) {
      const showBoxRect = showBox.getBoundingClientRect();
      const outShowBox = document.querySelector(".out-show-box");
      const outRect = outShowBox.getBoundingClientRect();

      // 计算新位置
      let newX = (e.clientX - showBoxRect.left - offsetX) / scale;
      let newY = (e.clientY - showBoxRect.top - offsetY) / scale;

      // 确保节点不会移出out-show-box范围
      newX = Math.max(0, Math.min(newX, outRect.width / scale - rect.width));
      newY = Math.max(0, Math.min(newY, outRect.height / scale - rect.height));

      node.style.left = `${newX}px`;
      node.style.top = `${newY}px`;

      updateLines(); // 移动时更新连线
    }

    function stopMoving() {
      document.removeEventListener("mousemove", moveNode);
      document.removeEventListener("mouseup", stopMoving);
    }

    document.addEventListener("mousemove", moveNode);
    document.addEventListener("mouseup", stopMoving);
  });

  // 为连接器添加事件监听
  connectors.forEach((connector) => {
    connector.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      draggingConnector = connector;
      const rect = connector.getBoundingClientRect();
      tempLine = createLine(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    });
  });
}
// 全局点击事件 - 点击其他地方隐藏所有edit div
document.addEventListener("click", () => {
  document.querySelectorAll(".edit").forEach((edit) => {
    edit.style.display = "none";
  });
});

// 全局鼠标移动和抬起事件监听
document.addEventListener("mousemove", (e) => {
  if (!draggingConnector || !tempLine) return;
  updateLines(tempLine, e.clientX, e.clientY);
});

document.addEventListener("mouseup", (e) => {
  if (!draggingConnector || !tempLine) return;
  let target = document.elementFromPoint(e.clientX, e.clientY);
  if (
    target &&
    target.classList.contains("connector") &&
    target != draggingConnector
  ) {
    finalizeConnection(draggingConnector, target, tempLine);
  } else {
    tempLine.remove(); // 删除临时连线
  }

  draggingConnector = null;
  tempLine = null;
});
//创建svg连线
function createLine(x, y) {
  const svg = document.getElementById("lines-container");
  const showBoxRect = showBox.getBoundingClientRect();
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", (x - showBoxRect.left) / scale);
  line.setAttribute("y1", (y - showBoxRect.top) / scale);
  line.setAttribute("x2", (x - showBoxRect.left) / scale);
  line.setAttribute("y2", (y - showBoxRect.top) / scale);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);
  return line;
}
function updateLines(line, x, y) {
  console.log("更新线条位置", x, y); // 检查是否触发

  const showBoxRect = showBox.getBoundingClientRect();
  line.setAttribute("x2", (x - showBoxRect.left) / scale);
  line.setAttribute("y2", (y - showBoxRect.top) / scale);
}
function finalizeConnection(connector1, connector2, line) {
  const showBoxRect = showBox.getBoundingClientRect();
  const rect1 = connector1.getBoundingClientRect();
  const rect2 = connector2.getBoundingClientRect();

  const x1 = (rect1.left + rect1.width / 2 - showBoxRect.left) / scale;
  const y1 = (rect1.top + rect1.height / 2 - showBoxRect.top) / scale;
  const x2 = (rect2.left + rect2.width / 2 - showBoxRect.left) / scale;
  const y2 = (rect2.top + rect2.height / 2 - showBoxRect.top) / scale;
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);

  // 记录连接信息
  connector1.dataset.connectedTo = connector2.dataset.dir;
  connector2.dataset.connectedTo = connector1.dataset.dir;
}
//更新连接线的起始点和终点
function updateLinePosition(line) {
  if (!line.startNode || !line.endNode) return;

  // 获取起点和终点的位置
  const rect1 = line.startNode.getBoundingClientRect();
  const rect2 = line.endNode.getBoundingClientRect();

  line.setAttribute("x1", rect1.x + rect1.width / 2);
  line.setAttribute("y1", rect1.y + rect1.height / 2);
  line.setAttribute("x2", rect2.x + rect2.width / 2);
  line.setAttribute("y2", rect2.y + rect2.height / 2);
}

// 存储所有连接的数组
const connections = [];

// 更新finalizeConnection函数以存储连接信息
function finalizeConnection(connector1, connector2, line) {
  const showBoxRect = showBox.getBoundingClientRect();
  const rect1 = connector1.getBoundingClientRect();
  const rect2 = connector2.getBoundingClientRect();

  const x1 = (rect1.left + rect1.width / 2 - showBoxRect.left) / scale;
  const y1 = (rect1.top + rect1.height / 2 - showBoxRect.top) / scale;
  const x2 = (rect2.left + rect2.width / 2 - showBoxRect.left) / scale;
  const y2 = (rect2.top + rect2.height / 2 - showBoxRect.top) / scale;
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);

  // 存储连接信息
  connections.push({
    line,
    startConnector: connector1,
    endConnector: connector2,
  });
}

//更新所有连线
function updateLines() {
  connections.forEach((conn) => {
    const rect1 = conn.startConnector.getBoundingClientRect();
    const rect2 = conn.endConnector.getBoundingClientRect();
    const showBoxRect = showBox.getBoundingClientRect();

    conn.line.setAttribute(
      "x1",
      (rect1.left + rect1.width / 2 - showBoxRect.left) / scale
    );
    conn.line.setAttribute(
      "y1",
      (rect1.top + rect1.height / 2 - showBoxRect.top) / scale
    );
    conn.line.setAttribute(
      "x2",
      (rect2.left + rect2.width / 2 - showBoxRect.left) / scale
    );
    conn.line.setAttribute(
      "y2",
      (rect2.top + rect2.height / 2 - showBoxRect.top) / scale
    );
  });
}

//将连接线数据存储到数据库中
function saveConnection(id, x, y) {
  const data = { id, x, y };
  fetch("/layer/ins_outs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("连接线数据保存成功", result);
    })
    .catch((error) => {
      console.error("连接线数据保存失败", error);
    });
}

//展示框的放缩,滑动
let isDragging = false;
let lastX, lastY;

showBox.addEventListener("wheel", (e) => {
  e.preventDefault();
  const scaleBy = 1.1;
  const minScale = 0.5;
  const maxScale = 2.0;

  if (e.deltaY > 0) {
    scale = Math.max(minScale, scale / scaleBy);
  } else {
    scale = Math.min(maxScale, scale * scaleBy);
  }

  showBox.style.transform = `scale(${scale})`;
  showBox.style.width = `${100 / scale}%`;
  showBox.style.height = `${100 / scale}%`;
});

showBox.addEventListener("mousedown", (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

showBox.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;

  const currentTransform = canvas.style.transform.match(
    /translate\(([^,]+),([^)]+)\)/
  ) || [0, 0];
  const currentX = parseFloat(currentTransform[1]) || 0;
  const currentY = parseFloat(currentTransform[2]) || 0;

  canvas.style.transform = `translate(${currentX + dx}px, ${
    currentY + dy
  }px) scale(${scale})`;
});

showBox.addEventListener("mouseup", () => {
  isDragging = false;
});

showBox.addEventListener("mouseleave", () => {
  isDragging = false;
});

//展示部分中小项目的删除,复制
// 右键点击显示edit菜单
document
  .querySelectorAll(".main .right-box .show-box .item")
  .forEach((item) => {
    const editDiv = item.querySelector(".edit");

    item.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const rect = item.getBoundingClientRect();
      editDiv.style.display = "block";
      editDiv.style.left = `${e.clientX - rect.left}px`;
      editDiv.style.top = `${e.clientY - rect.top}px`;
    });

    // 点击edit菜单时不隐藏
    editDiv.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

// 全局点击事件 - 点击其他地方隐藏所有edit菜单
document.addEventListener("click", (e) => {
  // 检查点击的是否是edit菜单或其子元素
  if (!e.target.closest(".edit")) {
    document.querySelectorAll(".edit").forEach((edit) => {
      edit.style.display = "none";
    });
  }
});

//--------------------------------------------------------------
//更新层级

//-------------------------------------------------------------
//输入部分
//保存模型

//上传文件

//发送信息

//--------------------------------------------------------------
//获取每一个小节点的id
