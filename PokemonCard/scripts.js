document.addEventListener("DOMContentLoaded", function () {
  var containers = document.querySelectorAll(".container");
  var overlays = document.querySelectorAll(".overlay");
  var circleOverflows = document.querySelectorAll(".circle-overflow");
  const cursorCircle = document.querySelector(".cursor-circle");
  const aTag = document.querySelectorAll("a");
  const spanTag = document.querySelectorAll(
    "span:not(.footer-bottommost-logo)"
  );
  const buttonTag = document.querySelectorAll("button");
  const h5Tag = document.querySelectorAll("h5");

  let mouseX = 0;
  let mouseY = 0;

  let cursorCircleX = 0;
  let cursorCircleY = 0;

  let scrolled = 0;

  let cursorCirclespeed = 0.1;

  let isFirstMouseMove = true;

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

  function cursorCircleATagHover() {
    cursorCircle.style.width = "3.5vmax";
    cursorCircle.style.height = "3.5vmax";
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

  function cursorCircleNotATagHover() {
    cursorCircle.style.width = "6vmax";
    cursorCircle.style.height = "6vmax";
    cursorCircle.style.background = "#fbf9f3";
    cursorCircle.style.opacity = "1";
  }

  spanTag.forEach((span) => {
    span.addEventListener("mouseover", cursorCircleNotATagHover);
    span.addEventListener("mouseleave", cursorCircleNotHover);
  });

  h5Tag.forEach((h5) => {
    h5.addEventListener("mouseover", cursorCircleNotATagHover);
    h5.addEventListener("mouseleave", cursorCircleNotHover);
  });

  aTag.forEach((a) => {
    a.addEventListener("mouseover", cursorCircleATagHover);
    a.addEventListener("mouseleave", cursorCircleNotHover);
  });

  buttonTag.forEach((b) => {
    b.addEventListener("mouseover", cursorCircleATagHover);
    b.addEventListener("mouseleave", cursorCircleNotHover);
  });

  containers.forEach((e) => {
    e.addEventListener("mouseover", function () {
      cursorCircle.style.opacity = "0";
    });
    e.addEventListener("mouseleave", function () {
      cursorCircle.style.opacity = "0.1";
    });
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

  containers.forEach(function (container, index) {
    var overlay = overlays[index];
    var circleOverflow = circleOverflows[index];

    var whiteCircle = document.createElement("div");
    whiteCircle.classList.add("white-circle");

    circleOverflow.appendChild(whiteCircle);

    container.addEventListener("mousemove", function (e) {
      var x = e.offsetX;
      var y = e.offsetY;
      var rotateY = (-1 / 5) * x + 20;
      var rotateX = (4 / 30) * y - 20;

      overlay.style.backgroundPosition = `-${x / 5 + y / 5}px`;

      whiteCircle.style.left = x + "px";
      whiteCircle.style.top = y + "px";
      whiteCircle.style.filter = "opacity(0.1)";

      container.style.transform = `perspective(550px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      overlay.style.filter = "brightness(110%) opacity(0.5)";
    });

    container.addEventListener("mouseout", function () {
      whiteCircle.style.filter = "opacity(0)";
      overlay.style.filter = "brightness(100%) opacity(0)";
      container.style.transform =
        "perspective(550px) rotateY(0deg) rotateX(0deg)";
    });
  });
});
