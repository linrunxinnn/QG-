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
