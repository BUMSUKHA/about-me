document.addEventListener("DOMContentLoaded", function () {
  const headerNavLinks = Array.from(
    document.querySelectorAll(".header-nav-list-item a")
  );

  const headerInner = document.querySelector(".header-inner");
  const footerLogoSVG = document.getElementById("footer-logo-svg");
  const cursorCircle = document.querySelector(".cursor-circle");
  const vw = window.innerWidth;
  const aTag = document.querySelectorAll("a");
  const spanTag = document.querySelectorAll(
    "span:not(.footer-bottommost-logo)"
  );
  const pTag = document.querySelectorAll("p");
  const h5Tag = document.querySelectorAll("h5");
  const buttonTag = document.querySelectorAll("button");

  const audioTag = document.querySelector("audio");
  const musicBtn = document.querySelector(".header-music-icon");

  const body = document.querySelector("body");

  let mouseX = 0;
  let mouseY = 0;

  let cursorCircleX = 0;
  let cursorCircleY = 0;

  let scrolled = 0;

  let cursorCirclespeed = 0.1;

  let isFirstMouseMove = true;

  audioTag.muted = true;
  audioTag.volume = 0.08;

  const animate = () => {
    let distX = mouseX - cursorCircleX;
    let distY = mouseY - cursorCircleY;
    let translatedValue = `translate3d(${cursorCircleX}px, ${cursorCircleY}px, 0 )`;

    cursorCircleX = cursorCircleX + distX * cursorCirclespeed;
    cursorCircleY = cursorCircleY + distY * cursorCirclespeed;

    cursorCircle.style.transform = translatedValue;

    requestAnimationFrame(animate);
  };

  animate();

  musicBtn.addEventListener("click", function () {
    const musicSVGMuted = document.querySelector(
      ".header-music-icon svg:nth-of-type(1)"
    );
    const musicSVGPlay = document.querySelector(
      ".header-music-icon svg:nth-of-type(2)"
    );

    if (window.getComputedStyle(musicSVGPlay).display === "none") {
      musicSVGMuted.style.display = "none";
      musicSVGPlay.style.display = "inline";
      audioTag.play().then(function () {
        audioTag.muted = false;
      });
    } else if (window.getComputedStyle(musicSVGMuted).display === "none") {
      musicSVGMuted.style.display = "inline";
      musicSVGPlay.style.display = "none";
      audioTag.pause();
      audioTag.muted = true;
    }
  });

  function cursorCircleATagHover() {
    cursorCircle.style.width = "3.5vmax";
    cursorCircle.style.height = "3.5vmax";
    cursorCircle.style.background = "#fbf9f3";
    cursorCircle.style.opacity = "1";
  }

  function cursorCircleNotATagHover() {
    cursorCircle.style.width = "6vmax";
    cursorCircle.style.height = "6vmax";
    cursorCircle.style.background = "#fbf9f3";
    cursorCircle.style.opacity = "1";
  }

  function cursorCircleNotHover() {
    cursorCircle.style.width = "";
    cursorCircle.style.height = "";
    cursorCircle.style.background = "";
    cursorCircle.style.opacity = ".1";
    cursorCircle.style.mixBlendMode = "";
  }

  aTag.forEach((a) => {
    if (a.classList.contains("main-bottom-img")) {
      a.addEventListener("mouseover", function () {
        cursorCircle.style.width = "10vmax";
        cursorCircle.style.height = "10vmax";
        cursorCircle.style.background = "#fbf9f3";
        cursorCircle.style.opacity = "1";
        cursorCircle.style.mixBlendMode = "overlay";
      });
      a.addEventListener("mouseleave", cursorCircleNotHover);
    } else {
      a.addEventListener("mouseover", cursorCircleATagHover);
      a.addEventListener("mouseleave", cursorCircleNotHover);
    }
  });

  buttonTag.forEach((b) => {
    b.addEventListener("mouseover", cursorCircleATagHover);
    b.addEventListener("mouseleave", cursorCircleNotHover);
  });

  pTag.forEach((p) => {
    p.addEventListener("mouseover", cursorCircleNotATagHover);
    p.addEventListener("mouseleave", cursorCircleNotHover);
  });

  spanTag.forEach((span) => {
    span.addEventListener("mouseover", cursorCircleNotATagHover);
    span.addEventListener("mouseleave", cursorCircleNotHover);
  });

  h5Tag.forEach((h5) => {
    h5.addEventListener("mouseover", cursorCircleNotATagHover);
    h5.addEventListener("mouseleave", cursorCircleNotHover);
  });

  document.addEventListener("mousemove", (e) => {
    if (isFirstMouseMove) {
      setTimeout(function () {
        cursorCircle.style.opacity = "0.1";
        isFirstMouseMove = false;
      }, 100);
    }

    scrolled = window.scrollY;
    mouseX = e.clientX - cursorCircle.offsetWidth / 2.5;
    mouseY = e.clientY - cursorCircle.offsetHeight / 2.5 + scrolled;
  });

  window.addEventListener("resize", function () {
    const vw = window.innerWidth;
    const footerLogoSVGWidth = `${(vw - 389.948) / 2}`;
    const footerLogoSVGHeight = `${(((vw - 389.948) / 2) * 350) / 1000}`;

    footerLogoSVG.setAttribute("width", footerLogoSVGWidth);
    footerLogoSVG.setAttribute("height", footerLogoSVGHeight);
  });

  footerLogoSVG.setAttribute("width", `${(vw - 389.948) / 2}`); // 초기에 한 번 호출하여 초기 화면 크기에 맞게 SVG의 너비를 설정
  footerLogoSVG.setAttribute(
    "height",
    `${(((vw - 389.948) / 2) * 350) / 1000}`
  );

  window.addEventListener("scroll", function () {
    // 특정 위치 계산 (예: 500px 스크롤했을 때 배경색 변경)
    const scrollPosition = window.scrollY;
    const targetPosition = 160; // 변경하고 싶은 특정 위치 값

    // 특정 위치에 도달하면 배경색 변경
    if (scrollPosition >= targetPosition) {
      headerInner.style.backgroundColor = "#18181c"; // 원하는 배경색으로 변경
    } else {
      headerInner.style.backgroundColor = ""; // 특정 위치에 도달하지 않으면 기본 배경색으로 변경
    }
  });

  headerNavLinks.forEach((link, index) => {
    link.addEventListener("mouseover", function () {
      setOpacityOther(index, 0.5);
    });

    link.addEventListener("mouseout", function () {
      setOpacityOther(index, "");
    });
  });

  function setOpacityOther(activeIndex, value) {
    headerNavLinks.forEach((link, index) => {
      if (index !== activeIndex) {
        link.style.opacity = value;
      }
    });
  }
});
