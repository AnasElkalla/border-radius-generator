"use strict";
const up = document.querySelector(".up");
const down = document.querySelector(".bottom");
const right = document.querySelector(".right");
const left = document.querySelector(".left");
const keys = document.querySelectorAll(".item-container span:not(.item");
const spans = document.querySelectorAll(".code span");
const item = document.querySelector(".item");
const block = document.querySelector(".block");
const itemContainer = document.querySelector(".item-container");
const containerRect = itemContainer.getBoundingClientRect();
const fontsize = parseInt(window.getComputedStyle(document.body).fontSize);
console.log(fontsize);
let eventing1;
let eventing2;
let eventing3;
let x, y;
let active = false;
window.addEventListener("load", function (e) {
  if (
    /Android/i.test(navigator.userAgent) ||
    /iPad|iPhone|iPod/i.test(navigator.userAgent)
  ) {
    // go to Google Play Store
    eventing1 = "touchmove";
    eventing2 = "touchstart";
    eventing3 = "touchend";
    console.log(true, navigator.userAgent);
    process();
  } else {
    // go to another website
    eventing1 = "mousemove";
    eventing2 = "mousedown";
    eventing3 = "mouseup";
    console.log(false, navigator.userAgent);
    process();
  }
});
function process() {
  document.addEventListener(eventing3, closeDragElement);
  function closeDragElement(e) {
    console.log("triggered");
    active = false;
    keys.forEach((key) => {
      key.classList.remove("clicked");
    });
  }
  document.addEventListener(eventing2, function (e) {
    console.log(e);
    if (eventing2 === "mousedown") {
      e.preventDefault();
    }
    keys.forEach((key) => {
      if (e.target === key) {
        console.log("Active");
        active = true;
        key.classList.add("clicked");
      }
    });
  });
  document.addEventListener(eventing1, function (event) {
    if (eventing1 === "mousemove") {
      event.preventDefault();
      x = event.clientX;
      y = event.clientY;
    } else {
      x = event.changedTouches[0].clientX;
      y = event.changedTouches[0].clientY;
    }
    if (active) {
      if (
        up.classList.contains("clicked") ||
        down.classList.contains("clicked")
      ) {
        keys.forEach((key) => {
          let left;
          if (key.classList.contains("clicked")) {
            if (x > containerRect.right - 4) {
              key.style.left = `${fontsize * 30}px`;
              left = 30;
            } else if (x < containerRect.left) {
              key.style.left = `0px`;
              left = 0;
            } else {
              left = (x - containerRect.left) / fontsize;
              key.style.left = `${left}rem`;
            }
            if (key === up) {
              spans[0].textContent = `${Math.trunc((left * 100) / 30)}%`;
              spans[1].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
            } else if (key === down) {
              spans[2].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
              spans[3].textContent = `${Math.trunc((left * 100) / 30)}%`;
            }
          }
        });
      } else if (
        left.classList.contains("clicked") ||
        right.classList.contains("clicked")
      ) {
        keys.forEach((key) => {
          let top;
          if (key.classList.contains("clicked")) {
            if (y > containerRect.bottom - 4) {
              key.style.top = `${fontsize * 30}px`;
              top = 30;
            } else if (y < containerRect.top) {
              key.style.top = `0px`;
              top = 0;
            } else {
              top = (y - containerRect.top) / fontsize;
              key.style.top = `${top}rem`;
            }
            if (key === right) {
              spans[5].textContent = `${Math.trunc((top * 100) / 30)}%`;
              spans[6].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
            } else if (key === left) {
              spans[4].textContent = `${Math.trunc((top * 100) / 30)}%`;
              spans[7].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
            }
          }
        });
      } else {
        event.preventDefault();
      }
    }
    item.style.cssText = `${block.textContent}`;
  });

  const copy = document.querySelector(".copy");
  copy.addEventListener("click", function (e) {
    navigator.clipboard.writeText(block.textContent);
  });
}
