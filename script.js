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
let active = false;
document.addEventListener("mouseup", closeDragElement);
function closeDragElement(e) {
  console.log("triggered");
  active = false;
  keys.forEach((key) => {
    key.classList.remove("clicked");
  });
}
document.addEventListener("mousedown", function (e) {
  e.preventDefault();
  keys.forEach((key) => {
    if (e.target === key) {
      console.log("Active");
      active = true;
      key.classList.add("clicked");
    }
  });
});
document.addEventListener("mousemove", function (event) {
  event.preventDefault();
  if (active) {
    if (
      up.classList.contains("clicked") ||
      down.classList.contains("clicked")
    ) {
      keys.forEach((key) => {
        let left;
        if (key.classList.contains("clicked")) {
          if (event.clientX > containerRect.right - 4) {
            key.style.left = `${fontsize * 30}px`;
            left = 30;
          } else if (event.clientX < containerRect.left) {
            key.style.left = `0px`;
            left = 0;
          } else {
            left = (event.clientX - containerRect.left) / fontsize;
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
          if (event.clientY > containerRect.bottom - 4) {
            key.style.top = `${fontsize * 30}px`;
            top = 30;
          } else if (event.clientY < containerRect.top) {
            key.style.top = `0px`;
            top = 0;
          } else {
            top = (event.clientY - containerRect.top) / fontsize;
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
