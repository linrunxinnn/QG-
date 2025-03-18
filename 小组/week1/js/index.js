// 头部导航下拉
// 头部导航栏数据

//顶部导航栏悬浮效果
document.querySelectorAll(".header-nav ul li").forEach((li) => {
  const dropContain = li.querySelector(".header-drop-contain");
  if (!dropContain) {
    console.error("找不到 .header-drop-contain 元素");
    return;
  }

  li.addEventListener("mouseenter", () => {
    console.log("鼠标进入 li 元素");
    document
      .querySelectorAll(".header-nav ul li .header-drop-contain")
      .forEach((item) => {
        console.log("none");

        item.style.display = "none";
      });
    dropContain.style.display = "block";
  });

  dropContain.addEventListener("mouseleave", () => {
    console.log("鼠标离开 li 元素");
    dropContain.style.display = "none";
  });
});

//home-nav
const homeNav = document.querySelector(".home-nav");
const homeDrop = document.querySelector(".home-nav-drop");
homeNav.addEventListener("mouseenter", () => {
  console.log(1);

  homeDrop.style.display = "flex";
});
homeDrop.addEventListener("mouseleave", () => {
  console.log(2);

  homeDrop.style.display = "none";
});

// 添加home-nav li hover效果
document.querySelectorAll(".home-nav ul li").forEach((li) => {
  const homeDrop = li.querySelector(".home-nav-drop");

  li.addEventListener("mouseenter", () => {
    if (homeDrop) {
      homeDrop.style.display = "flex";
    }
  });

  li.addEventListener("mouseleave", () => {
    if (homeDrop) {
      homeDrop.style.display = "none";
    }
  });
});

//轮播图
const homeNavData = [
  "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47bc402508c005ec3c0f4c13bb8b705.jpg?thumb=1&amp;w=2452&amp;h=920&amp;f=webp&amp;q=90",
  "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/2e389157059c44d9352b42e04407cbb7.jpg?w=2452&amp;h=920",
  "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c71581f232c12eb988a565c368364930.jpg?thumb=1&amp;w=2452&amp;h=920&amp;f=webp&amp;q=90",
  "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5d2e4ce0cc22c7d87981bac22d64e44d.jpg?thumb=1&amp;w=2452&amp;h=920&amp;f=webp&amp;q=90",
  "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/adb7c8e38426ca84f283f77b48c0f49a.jpg?thumb=1&amp;w=2452&amp;h=920&amp;f=webp&amp;q=90",
];
const dotContain = document.querySelector(".home-dot");
(function () {
  for (let i = 0; i < homeNavData.length; i++) {
    dotContain.innerHTML += `<span data-id=${i}></span>`;
  }
})();
const adImg = document.querySelector(".hero .home .img-box ul");
const lastIcon = document.querySelector(".hero .home .icon-last");
const nextIcon = document.querySelector(".hero .home .icon-next");
let curImgIndex = 0;
let autoPlay;
(function () {
  for (let i = 0; i < homeNavData.length; i++) {
    adImg.innerHTML += `<li data-id="${i}" style="display: none;">
                  <a href="#">
                    <img
                      src="${homeNavData[i]}"
                    />
                  </a>
                </li>`;
  }
})();
function showSlide(index) {
  if (index >= homeNavData.length) {
    curImgIndex = 0;
  } else if (index < 0) {
    curImgIndex = homeNavData.length - 1;
  } else {
    curImgIndex = index;
  }
  document.querySelectorAll(".hero .home .img-box ul li").forEach((li) => {
    li.classList.remove("active");
    li.style.display = "none";
  });
  document.querySelector(
    `.hero .home .img-box ul li[data-id="${curImgIndex}"]`
  ).style.display = "block";
  document.querySelectorAll(".home-dot span").forEach((span) => {
    span.classList.remove("active");
  });
  document
    .querySelector(`.home-dot span[data-id="${index}"]`)
    .classList.add("active");
}
function nextSlide() {
  showSlide(curImgIndex + 1);
}
function lastSlide() {
  showSlide(curImgIndex - 1);
}
autoPlay = setInterval(nextSlide, 3000);
nextIcon.addEventListener("mouseleave", () => {
  autoPlay = setInterval(nextSlide, 3000);
});

// 为小点添加点击和hover事件
document.querySelectorAll(".home-dot span").forEach((span) => {
  span.addEventListener("click", () => {
    showSlide(span.dataset.id);
  });
  span.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
  });
  span.addEventListener("mouseleave", () => {
    autoPlay = setInterval(nextSlide, 3000);
  });
});
nextIcon.addEventListener("click", () => {
  nextSlide();
});
lastIcon.addEventListener("mouseenter", () => {
  clearInterval(autoPlay);
});
nextIcon.addEventListener("mouseenter", () => {
  clearInterval(autoPlay);
});
lastIcon.addEventListener("mouseleave", () => {
  autoPlay = setInterval(nextSlide, 3000);
});
nextIcon.addEventListener("mouseleave", () => {
  autoPlay = setInterval(nextSlide, 3000);
});
