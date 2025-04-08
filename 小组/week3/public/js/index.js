const userId = 1;
//蒙版
const overlay = document.querySelector(".overlay");
const addBox = document.querySelector(".add-box");
document
  .querySelector(".main .nav button")
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

//提交模型
const submitBtn = document.querySelector(".add-box .btn-box .add-btn");
const input = document.querySelectorAll(".add-box input");
submitBtn.addEventListener("click", (item) => {
  let data = { user_id: 1 };
  input.forEach((e) => {
    if (e.value === "") {
      alert("请填写完整");
      return;
    }
    data[e.dataset.type] = e.value;
  });
  input.forEach((e) => {
    e.value = "";
  });
  overlay.style.display = "none";
  addBox.style.display = "none";

  let html = "";
  html += `
        <div class="module-item">
          <img src="../img/春物壁纸.jpg" alt="模型图片" />
          <div class="message">
            <div>
              <h3>${data.model_head}</h3>
              <p>${data.model_data}</p>
            </div>
            <div class="button-group">
              <button class="delete">
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button class="edit">
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
  `;

  fetch("http://localhost:3000/modul/addModul", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // 在这里处理成功的响应
      window.location.href =
        "create.html?userId=" + userId + "&moduleId=" + data.module_id;
    })
    .catch((error) => {
      console.error("Error:", error);
      // 在这里处理错误的响应
    });
});
