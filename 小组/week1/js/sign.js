document.querySelectorAll(".head ul li span").forEach((item) => {
  item.addEventListener("click", () => {
    console.log(1);

    let id = item.dataset.id;
    document.querySelectorAll(".head ul li span").forEach((li) => {
      if (li.dataset.id === id) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
    document.querySelectorAll(".sign-item").forEach((x) => {
      if (x.dataset.id === id) {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    });
  });
});

document.querySelectorAll(".password-box button svg").forEach((icon) => {
  icon.addEventListener("click", () => {
    document.querySelectorAll(".password-box button svg").forEach((item) => {
      if (item.dataset.id === icon.dataset.id) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  });
});
