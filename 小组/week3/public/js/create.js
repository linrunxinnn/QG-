// 添加模型
const addModel = document.querySelector(".add-box  .btn-box .add-btn");
addModel.addEventListener("click", (item) => {
  const data = [];
  document.querySelectorAll(".add-box ul li input").forEach((item) => {
    if (item.value === "") {
      alert("请填写完整信息");
      return;
    }
    data.push(item.value);
    item.value = "";
  });

  // 发送数据到数据库
  fetch("http://localhost:3000/modul/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: 1,
      model_head: data[0],
      model_data: JSON.stringify({ content: data[1] || "默认内容" }),
      model_svg: data[2],
      model_url: data[3],
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("模型添加成功", result);
      // 在这里可以使用 result.id 来获取新添加的记录的 ID
      const html = `
        <li>
              <div class="item">
                <div class="left">
                  <svg
                    t="1743336869398"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3556"
                    width="24"
                    height="24"
                    fill="#dee2e6"
                  >
                    <path
                      d="M552.77 960c-58.84-1.12-114.3-24.21-159.26-70.86-4.22-4.38-8.05-3.69-12.76-2.93-113.3 18.34-219.67-43.88-257.22-150.97-15.68-44.72-16.31-90.08-2.45-135.46 1.46-4.79 0.85-8-2.52-11.92-110.11-128.08-45.23-325.85 120-365.79 5.58-1.35 8.24-3.8 10.18-9.12 33.89-92.71 125.98-153.32 225.68-148.71 61.34 2.84 113.42 26.1 155.99 69.81 3.7 3.8 7.18 4.39 11.99 3.59 109.43-18.18 212.22 38.06 253.83 139.27 19.6 47.69 21.6 96.53 7.04 145.92-1.66 5.63-1.03 9.39 2.9 14 109.09 127.73 44.07 324.86-120.37 364.91-5.93 1.45-8.66 4.11-10.68 9.61C742.2 900.66 654.86 960.63 552.77 960z m177.1-317.31h0.04c0-33.52-0.18-67.04 0.16-100.56 0.06-6.12-2.1-9.28-7.29-12.15-20.62-11.38-41-23.18-61.47-34.82-9.2-5.23-9.22-5.22-9.22 5.01-0.03 74.74-0.36 149.48 0.14 224.22 0.11 16.9-6.2 27.77-21.06 36.06-57.97 32.35-115.53 65.43-173.25 98.23-7.05 4.01-7.11 4.09-0.32 9.04 29.15 21.28 61.79 32.41 98.11 33.51 94.25 2.85 173.38-72.13 174.12-165.43 0.25-31.04 0.04-62.07 0.04-93.11zM562.89 380.9c4.12 2.44 6.87 4.14 9.67 5.74 65.31 37.23 130.48 74.69 196.04 111.48 14.6 8.2 20.95 18.87 20.83 35.46-0.5 65.32-0.21 130.64-0.2 195.97 0 10.09 0.06 10.17 9.06 6.22 37.72-16.54 66.15-42.66 84.36-79.48 14.26-28.83 20.59-59.17 16.95-91.04-6.77-59.33-37.54-102.98-89.92-132.4-52-29.21-103.95-58.51-155.41-88.62-10.29-6.02-17.54-6.29-27.56-0.02-20.32 12.72-41.56 24.01-63.82 36.69z m10.55-219.72c-42.3-32.68-88.9-45.43-140.36-35.84-82.31 15.34-138.09 82.91-138.71 166.77-0.47 63.57-0.05 127.15-0.2 190.73-0.01 5.07 1.51 8.06 6.11 10.61 21.26 11.78 42.3 23.95 63.42 35.96 8.41 4.78 8.44 4.77 8.44-4.79 0.01-76.24 0.08-152.48-0.06-228.72-0.03-13.76 5.55-23.56 17.76-30.4 33.67-18.86 67.12-38.08 100.66-57.15 27.2-15.46 54.39-30.93 82.94-47.17zM423.16 403.1c3.83-2.12 6.66-3.66 9.46-5.25 64.65-36.83 129.51-73.32 193.79-110.76 16.62-9.68 30.57-9.21 46.95 0.36 56.65 33.13 113.93 65.21 170.82 97.94 5.82 3.35 7.02 1.65 7.6-3.82 1.91-17.89 1.68-35.7-2.07-53.36-24.13-113.69-148.73-170.17-251.3-113.36-57.2 31.68-113.64 64.72-170.52 96.96-4.15 2.35-5.36 5.08-5.34 9.51 0.16 25.08 0.07 50.16 0.09 75.24 0 1.7 0.26 3.4 0.52 6.54z m37.99 239.22c-3.22-1.95-5.1-3.15-7.04-4.25-66.2-37.68-132.3-75.53-198.69-112.88-14.2-7.99-20.8-18.6-20.69-34.88 0.42-65.57 0.18-131.14 0.17-196.7 0-9.49-0.15-9.75-8.75-5.77-62.65 29.01-98.34 77.66-101.97 145.77-3.45 64.64 24.05 116.47 79.95 150.53 57.3 34.92 116.43 66.9 174.75 100.19 2.47 1.41 4.61 2.41 7.61 0.68 24.49-14.13 49.08-28.1 74.66-42.69z m140.28 23.44V630c0-9.54-0.03-9.58-8.29-4.88-65.73 37.48-131.58 74.76-197.08 112.61-14.62 8.45-27.56 8.77-42.28 0.24-57.65-33.42-115.7-66.17-173.52-99.31-5.03-2.88-6.87-3.23-7.69 3.53-5.01 41.13 3.75 79.21 26.74 113.61 49.29 73.73 146.58 96.84 225.82 53.21 57.51-31.66 114.2-64.77 171.33-97.1 3.82-2.16 5.13-4.69 5.05-8.9-0.24-12.41-0.08-24.83-0.08-37.25z m-0.21-154.58c0-14.65-0.15-29.31 0.09-43.95 0.07-4.49-1.3-7.21-5.38-9.51-26.42-14.86-52.75-29.9-78.97-45.11-3.82-2.22-6.67-1.99-10.33 0.12-26.04 15.03-52.12 29.99-78.34 44.71-4.3 2.41-5.88 5.17-5.85 10 0.2 29.3 0.2 58.61 0 87.91-0.04 5.06 1.51 8.02 6.12 10.59 26.25 14.67 52.34 29.61 78.34 44.7 3.82 2.21 6.55 1.96 10.19-0.15 26.25-15.16 52.57-30.21 79.01-45.05 4.15-2.33 5.27-5.15 5.21-9.57-0.23-14.89-0.09-29.79-0.09-44.69z"
                      p-id="3557"
                    ></path>
                  </svg>
                  <h4>${data[0]}</h4>
                </div>
                <div class="right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                    width="24"
                    height="24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 hide"
                    width="24"
                    height="24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
              <div class="dropdown hide">
                <div class="item" draggable="true" data-type="node" data-url="${data[3]}" data-id="${result.id}">
                  <div class="top">
                    <div class="left">
                      <svg
                        t="1743336869398"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3556"
                        width="24"
                        height="24"
                        fill="#dee2e6"
                      >
                        <path
                          d="M552.77 960c-58.84-1.12-114.3-24.21-159.26-70.86-4.22-4.38-8.05-3.69-12.76-2.93-113.3 18.34-219.67-43.88-257.22-150.97-15.68-44.72-16.31-90.08-2.45-135.46 1.46-4.79 0.85-8-2.52-11.92-110.11-128.08-45.23-325.85 120-365.79 5.58-1.35 8.24-3.8 10.18-9.12 33.89-92.71 125.98-153.32 225.68-148.71 61.34 2.84 113.42 26.1 155.99 69.81 3.7 3.8 7.18 4.39 11.99 3.59 109.43-18.18 212.22 38.06 253.83 139.27 19.6 47.69 21.6 96.53 7.04 145.92-1.66 5.63-1.03 9.39 2.9 14 109.09 127.73 44.07 324.86-120.37 364.91-5.93 1.45-8.66 4.11-10.68 9.61C742.2 900.66 654.86 960.63 552.77 960z m177.1-317.31h0.04c0-33.52-0.18-67.04 0.16-100.56 0.06-6.12-2.1-9.28-7.29-12.15-20.62-11.38-41-23.18-61.47-34.82-9.2-5.23-9.22-5.22-9.22 5.01-0.03 74.74-0.36 149.48 0.14 224.22 0.11 16.9-6.2 27.77-21.06 36.06-57.97 32.35-115.53 65.43-173.25 98.23-7.05 4.01-7.11 4.09-0.32 9.04 29.15 21.28 61.79 32.41 98.11 33.51 94.25 2.85 173.38-72.13 174.12-165.43 0.25-31.04 0.04-62.07 0.04-93.11zM562.89 380.9c4.12 2.44 6.87 4.14 9.67 5.74 65.31 37.23 130.48 74.69 196.04 111.48 14.6 8.2 20.95 18.87 20.83 35.46-0.5 65.32-0.21 130.64-0.2 195.97 0 10.09 0.06 10.17 9.06 6.22 37.72-16.54 66.15-42.66 84.36-79.48 14.26-28.83 20.59-59.17 16.95-91.04-6.77-59.33-37.54-102.98-89.92-132.4-52-29.21-103.95-58.51-155.41-88.62-10.29-6.02-17.54-6.29-27.56-0.02-20.32 12.72-41.56 24.01-63.82 36.69z m10.55-219.72c-42.3-32.68-88.9-45.43-140.36-35.84-82.31 15.34-138.09 82.91-138.71 166.77-0.47 63.57-0.05 127.15-0.2 190.73-0.01 5.07 1.51 8.06 6.11 10.61 21.26 11.78 42.3 23.95 63.42 35.96 8.41 4.78 8.44 4.77 8.44-4.79 0.01-76.24 0.08-152.48-0.06-228.72-0.03-13.76 5.55-23.56 17.76-30.4 33.67-18.86 67.12-38.08 100.66-57.15 27.2-15.46 54.39-30.93 82.94-47.17zM423.16 403.1c3.83-2.12 6.66-3.66 9.46-5.25 64.65-36.83 129.51-73.32 193.79-110.76 16.62-9.68 30.57-9.21 46.95 0.36 56.65 33.13 113.93 65.21 170.82 97.94 5.82 3.35 7.02 1.65 7.6-3.82 1.91-17.89 1.68-35.7-2.07-53.36-24.13-113.69-148.73-170.17-251.3-113.36-57.2 31.68-113.64 64.72-170.52 96.96-4.15 2.35-5.36 5.08-5.34 9.51 0.16 25.08 0.07 50.16 0.09 75.24 0 1.7 0.26 3.4 0.52 6.54z m37.99 239.22c-3.22-1.95-5.1-3.15-7.04-4.25-66.2-37.68-132.3-75.53-198.69-112.88-14.2-7.99-20.8-18.6-20.69-34.88 0.42-65.57 0.18-131.14 0.17-196.7 0-9.49-0.15-9.75-8.75-5.77-62.65 29.01-98.34 77.66-101.97 145.77-3.45 64.64 24.05 116.47 79.95 150.53 57.3 34.92 116.43 66.9 174.75 100.19 2.47 1.41 4.61 2.41 7.61 0.68 24.49-14.13 49.08-28.1 74.66-42.69z m140.28 23.44V630c0-9.54-0.03-9.58-8.29-4.88-65.73 37.48-131.58 74.76-197.08 112.61-14.62 8.45-27.56 8.77-42.28 0.24-57.65-33.42-115.7-66.17-173.52-99.31-5.03-2.88-6.87-3.23-7.69 3.53-5.01 41.13 3.75 79.21 26.74 113.61 49.29 73.73 146.58 96.84 225.82 53.21 57.51-31.66 114.2-64.77 171.33-97.1 3.82-2.16 5.13-4.69 5.05-8.9-0.24-12.41-0.08-24.83-0.08-37.25z m-0.21-154.58c0-14.65-0.15-29.31 0.09-43.95 0.07-4.49-1.3-7.21-5.38-9.51-26.42-14.86-52.75-29.9-78.97-45.11-3.82-2.22-6.67-1.99-10.33 0.12-26.04 15.03-52.12 29.99-78.34 44.71-4.3 2.41-5.88 5.17-5.85 10 0.2 29.3 0.2 58.61 0 87.91-0.04 5.06 1.51 8.02 6.12 10.59 26.25 14.67 52.34 29.61 78.34 44.7 3.82 2.21 6.55 1.96 10.19-0.15 26.25-15.16 52.57-30.21 79.01-45.05 4.15-2.33 5.27-5.15 5.21-9.57-0.23-14.89-0.09-29.79-0.09-44.69z"
                          p-id="3557"
                        ></path>
                      </svg>
                      <h4>${data[0]}</h4>
                    </div>
                    <div class="right">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                        width="24"
                        height="24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="message">
                    <p>${data[1]}</p>
                  </div>
                </div>
                
              </div>
            </li>
      `;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const newElement = tempDiv.firstElementChild;
      document
        .querySelector(".main .left-box .list ul")
        .insertAdjacentElement("afterbegin", newElement);
      overlay.style.display = "none";
      addBox.style.display = "none";
    })
    .catch((error) => {
      console.error("模型添加失败", error);
    });
});

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
  .querySelector(".main .left-box .list ul")
  .addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (item) {
      item
        .querySelectorAll(".right svg")
        .forEach((x) => x.classList.toggle("hide"));

      const dropdown = item.parentElement.querySelector(".dropdown");
      if (dropdown) {
        dropdown.classList.toggle("hide");
      }
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
// 使用事件委托处理拖拽开始事件
document
  .querySelector(".main .left-box .list ul")
  .addEventListener("dragstart", (e) => {
    const item = e.target.closest(".dropdown .item");
    if (item) {
      e.dataTransfer.setData("text/plain", "node");
      const title = item.querySelector("h4")?.textContent;
      if (title) {
        e.dataTransfer.setData("title", title);
      }
      item.setAttribute("dragging", "true");
    }
  });

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
      // 获取拖拽源元素
      const draggedItem = document.querySelector(".dropdown .item[dragging]");
      if (draggedItem) {
        const title = draggedItem.querySelector("h4")?.textContent || "新节点";
        add(x, y, title);
        draggedItem.removeAttribute("dragging");
      } else {
        // 尝试从dataTransfer获取标题
        const title = e.dataTransfer.getData("title") || "新节点";
        add(x, y, title);
      }
    }
  }
});
//添加节点
async function add(x, y, head) {
  const node = document.createElement("div");
  node.classList.add("node");
  node.classList.add("item");
  node.classList.add("show-item");
  node.style.left = x + "px";
  node.style.top = y + "px";
  node.innerHTML = `
    <div class="top">
                <div class="drag-handle"></div>
                <h3>${head}</h3>
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
      crad: [x, y],
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

      // 获取连接器位置
      const prevConnector = node.querySelector(".prev-connector");
      const nextConnector = node.querySelector(".next-connector");
      const prevRect = prevConnector.getBoundingClientRect();
      const nextRect = nextConnector.getBoundingClientRect();

      // 更新位置到服务器
      updatePosition(node.dataset.id, {
        card: [newX, newY],
        first: [
          (prevRect.left + prevRect.width / 2 - showBoxRect.left) / scale,
          (prevRect.top + prevRect.height / 2 - showBoxRect.top) / scale,
        ],
        second: [
          (nextRect.left + nextRect.width / 2 - showBoxRect.left) / scale,
          (nextRect.top + nextRect.height / 2 - showBoxRect.top) / scale,
        ],
      });

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

  // 获取节点ID
  const startNode = connector1.closest(".node");
  const endNode = connector2.closest(".node");
  const startId = startNode.dataset.id;
  const endId = endNode.dataset.id;

  // 保存连接线数据
  saveConnection(startId, x1, y1, endId, x2, y2).then(() => {
    // 连接保存成功后自动更新层级
    updateLayer();
  });

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
function saveConnection() {
  return new Promise((resolve, reject) => {
    let data;
    if (arguments.length === 6) {
      // 两点保存模式
      const [startId, startX, startY, endId, endX, endY] = arguments;
      data = {
        start: { id: startId, x: startX, y: startY },
        end: { id: endId, x: endX, y: endY },
      };
    } else if (arguments.length === 3) {
      // 单点保存模式(保持兼容)
      const [id, x, y] = arguments;
      data = { id, x, y };
    } else {
      console.error("无效的参数数量");
      reject("无效的参数数量");
      return;
    }

    fetch("http://localhost:3000/layer/ins_outs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("连接线数据保存成功", result);
        resolve(result);
      })
      .catch((error) => {
        console.error("连接线数据保存失败", error);
        reject(error);
      });
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
//更新层级(使用拓扑排序算法)
function updateLayer() {
  const indegree = {};
  const levelMap = {};
  const queue = [];
  const adj = {}; // 邻接表

  fetch("http://localhost:3000/layer/getins_outs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((nodes) => {
      // 初始化入度、层级和邻接表
      nodes.forEach((node) => {
        const id = node.id;
        indegree[id] = 0;
        levelMap[id] = 1; // 初始层级为 0
        adj[id] = [];
      });

      // 构建邻接表和入度表
      nodes.forEach((node) => {
        const id = node.id;
        const outs = node.ins_outs.outs || [];
        outs.forEach((out) => {
          const targetId = out.id;
          adj[id].push(targetId);
          indegree[targetId]++; // 目标节点入度增加
        });
      });

      // 将入度为 0 的节点加入队列
      for (const id in indegree) {
        if (indegree[id] === 0) {
          queue.push(id);
        }
      }

      // BFS 遍历并更新层级
      while (queue.length > 0) {
        const current = queue.shift();
        const currentLevel = levelMap[current];

        // 遍历当前节点的所有邻接节点
        adj[current].forEach((neighbor) => {
          // 将邻接节点的层级更新为当前节点层级+1（如果更高的话）
          levelMap[neighbor] = Math.max(levelMap[neighbor], currentLevel + 1);
          // 减少邻接节点的入度
          indegree[neighbor]--;
          // 当入度为0时，说明所有前驱节点均已处理
          if (indegree[neighbor] === 0) {
            queue.push(neighbor);
          }
        });
      }

      // 更新数据库中的层级信息
      for (const id in levelMap) {
        fetch("http://localhost:3000/layer/updateLayer", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            layer: levelMap[id], // 使用 BFS 计算出的层级
          }),
        })
          .then((response) => {
            if (!response.ok) {
              console.error(`更新节点 ${id} 层级失败`);
            }
          })
          .catch((error) => {
            console.error(`更新节点 ${id} 层级错误:`, error);
          });
      }

      console.log("层级更新完成，BFS 层级信息:", levelMap);
    })
    .catch((error) => {
      console.error("获取节点连接数据失败:", error);
    });
}

//更新卡片的位置&&起始点的位置
function updatePosition(
  id,
  { card: [x1, y1], first: [x2, y2], second: [x3, y3] }
) {
  console.log("更新位置请求:", {
    id,
    position: {
      card: [x1, y1],
      first: [x2, y2],
      second: [x3, y3],
    },
  });

  fetch("http://localhost:3000/layer/updatePosition", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      position: {
        card: [x1, y1],
        first: [x2, y2],
        second: [x3, y3],
      },
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      console.log("位置更新成功", result);
    })
    .catch((error) => {
      console.error("位置更新失败:", error);
    });
}

//底部输入部分
const runInput = document.querySelector(
  ".bottom-bar .input-box .input textarea"
);
const hiddenInput = document.getElementById("hiddenInput");
const fileIcon = document.querySelector(".bottom-bar .input-box .file-icon");
const runIcon = document.querySelector(".bottom-bar .input-box .run-icon");
const fileBox = document.querySelector(".bottom-bar .run-box .file-show-box");

//发送信息

//上传文件
const fileArry = [];
fileIcon.addEventListener("click", () => hiddenInput.click());
hiddenInput.addEventListener("change", () => {
  const file = hiddenInput.files[0];
  if (!file) {
    console.log("未选择文件");
    return;
  }

  console.log("选择了文件:", file.name);

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64String = e.target.result;
    console.log("文件Base64内容:", base64String);
    fileArry.push(base64String);

    // 创建文件显示元素并添加到fileBox首位
    if (fileBox) {
      const fileItem = document.createElement("div");
      fileItem.className = "file";
      fileItem.innerHTML = `
        <div class="del-icon">
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
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div class="left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                    width="32"
                    height="32"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <div class="right">
                  <h5>${file.name}</h5>
                  <p style="font-size: 12px">${file.type} 文件大小</p>
                </div>
      `;
      fileBox.insertAdjacentElement("afterbegin", fileItem);

      // 添加删除功能
      fileItem.querySelector("svg").addEventListener("click", () => {
        fileItem.remove();
        const index = fileArry.indexOf(base64String);
        if (index > -1) {
          fileArry.splice(index, 1);
        }
      });
    }
  };

  reader.onerror = function (e) {
    console.error("文件读取错误:", e.target.error);
  };
  reader.readAsDataURL(file); // 实际触发读取操作
});

runIcon.addEventListener("click", () => {
  if (runInput.value.trim() === "") {
    alert("请输入运行信息");
    return;
  }
  run();
  runInput.value = "";
  fileBox.innerHTML = "";
});
runInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (runInput.value.trim() === "") {
      alert("请输入运行信息");
      return;
    }
    run();
    runInput.value = "";
    fileBox.innerHTML = "";
  }
});

//运行函数(在按回车键的时候和点击运行键的时候运行)
function run() {
  // 先从数据库获取layerlist的数据
  fetch("http://localhost:3000/layer/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("获取layer数据失败");
      }
      return response.json();
    })
    .then((layerData) => {
      console.log("获取layerlist数据成功", layerData);

      const formattedData = layerData.data.map((item) => ({
        id: item.id,
        name: item.name,
        layer: item.layer,
        work: item.work,
        weight: item.weight,
        remark: item.remark,
        ins_outs: JSON.parse(item.ins_outs),
        position: JSON.parse(item.position),
      }));

      return fetch("http://localhost:3000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: fileArry,
          text: runInput.value.trim(),
          moduleList: formattedData,
        }),
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("运行请求失败");
      }
      return response.json();
    })
    .then((result) => {
      console.log("运行成功", result);
      alert("运行成功");
      runInput.value = ""; // 清空输入框
    })
    .catch((error) => {
      console.error("运行过程中出错:", error);
      alert("运行失败: " + error.message);
    });
}
