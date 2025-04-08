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
