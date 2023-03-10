"use strict";
const up = document.querySelector(".up");
const up1 = document.querySelector(".up1");
const up2 = document.querySelector(".up2");
const down = document.querySelector(".bottom");
const down1 = document.querySelector(".bottom1");
const down2 = document.querySelector(".bottom2");
const right = document.querySelector(".right");
const right1 = document.querySelector(".right1");
const right2 = document.querySelector(".right2");
const left = document.querySelector(".left");
const left1 = document.querySelector(".left1");
const left2 = document.querySelector(".left2");
let keys = document.querySelectorAll(".item-container.active span:not(.item");
let itemContainer = document.querySelector(".item-container.active");
let containerRect = itemContainer.getBoundingClientRect();
const spans = document.querySelectorAll(".code span");
let item = document.querySelector(".active .item");
const block = document.querySelector(".block");
const modeContainer = document.querySelectorAll(".item-container");
const switcher = document.querySelector(".switcher");
const fontsize = parseInt(window.getComputedStyle(document.body).fontSize);
// let eventing1;
// let eventing2;
// let eventing3;
// let x, y;
// let active = false;
class Application {
  x;
  y;
  active = false;
  copy = document.querySelector(".copy");
  constructor(eventing1, eventing2, eventing3) {
    this.eventing1 = eventing1;
    this.eventing2 = eventing2;
    this.eventing3 = eventing3;
    document.addEventListener(eventing3, this.eventUp.bind(this));
    document.addEventListener(eventing2, this.eventDown.bind(this));
    document.addEventListener(eventing1, this.eventMove.bind(this));
    this.copy.addEventListener("click", this.copyf.bind(this));
    switcher.addEventListener("click", this.switcherF.bind(this));
  }
  copyf(e) {
    this.copy = document.querySelector(".copy");
    navigator.clipboard.writeText(block.textContent);
  }
  eventDown(e) {
    keys = document.querySelectorAll(".item-container.active span:not(.item");
    if (this.eventing2 === "mousedown") {
      e.preventDefault();
    }
    keys.forEach((key) => {
      if (e.target === key) {
        this.active = true;
        key.classList.add("clicked");
      }
    });
  }
  eventUp(e) {
    keys = document.querySelectorAll(".item-container.active span:not(.item");
    this.active = false;
    keys.forEach((key) => {
      key.classList.remove("clicked");
    });
  }
  eventMove(e) {
    if (this.eventing1 === "mousemove") {
      e.preventDefault();
      this.x = e.clientX;
      this.y = e.clientY;
    } else {
      this.x = e.changedTouches[0].clientX;
      this.y = e.changedTouches[0].clientY;
    }
    if (this.active) {
      if (
        up.classList.contains("clicked") ||
        up1.classList.contains("clicked") ||
        up2.classList.contains("clicked") ||
        down.classList.contains("clicked") ||
        down1.classList.contains("clicked") ||
        down2.classList.contains("clicked")
      ) {
        keys.forEach((key) => {
          let left;
          if (key.classList.contains("clicked")) {
            if (this.x > containerRect.right - 4) {
              key.style.left = `${fontsize * 30}px`;
              left = 30;
            } else if (this.x < containerRect.left) {
              key.style.left = `0px`;
              left = 0;
            } else {
              left = (this.x - containerRect.left) / fontsize;
              key.style.left = `${left}rem`;
            }
            if (key === up) {
              spans[0].textContent = `${Math.trunc((left * 100) / 30)}%`;
              spans[1].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
            } else if (key === down) {
              spans[2].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
              spans[3].textContent = `${Math.trunc((left * 100) / 30)}%`;
            } else if (key === up1) {
              spans[0].textContent = `${Math.trunc((left * 100) / 30)}%`;
            } else if (key === up2) {
              spans[1].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
            } else if (key === down1) {
              spans[2].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
            } else if (key === down2) {
              spans[3].textContent = `${Math.trunc((left * 100) / 30)}%`;
            }
          }
        });
      } else if (
        left.classList.contains("clicked") ||
        left1.classList.contains("clicked") ||
        left2.classList.contains("clicked") ||
        right.classList.contains("clicked") ||
        right1.classList.contains("clicked") ||
        right2.classList.contains("clicked")
      ) {
        keys.forEach((key) => {
          let top;
          if (key.classList.contains("clicked")) {
            if (this.y > containerRect.bottom - 4) {
              key.style.top = `${fontsize * 30}px`;
              top = 30;
            } else if (this.y < containerRect.top) {
              key.style.top = `0px`;
              top = 0;
            } else {
              top = (this.y - containerRect.top) / fontsize;
              key.style.top = `${top}rem`;
            }
            if (key === right) {
              spans[5].textContent = `${Math.trunc((top * 100) / 30)}%`;
              spans[6].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
            } else if (key === right1) {
              spans[5].textContent = `${Math.trunc((top * 100) / 30)}%`;
            } else if (key === right2) {
              spans[6].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
            } else if (key === left) {
              spans[4].textContent = `${Math.trunc((top * 100) / 30)}%`;
              spans[7].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
            } else if (key === left1) {
              spans[4].textContent = `${Math.trunc((top * 100) / 30)}%`;
            } else if (key === left2) {
              spans[7].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
            }
          }
        });
      } else {
        e.preventDefault();
      }
    }
    item.style.cssText = `${block.textContent}`;
  }
  switcherF(e) {
    switcher.classList.toggle("complex");
    modeContainer.forEach((ele) => ele.classList.toggle("active"));
    keys = document.querySelectorAll(".item-container.active span:not(.item");
    itemContainer = document.querySelector(".item-container.active");
    containerRect = itemContainer.getBoundingClientRect();
    item = document.querySelector(".active .item");
    spans.forEach((ele) => (ele.textContent = "50%"));
    document
      .querySelectorAll(".item")
      .forEach((ele) => (ele.style.cssText = `${block.textContent}`));
    keys.forEach((ele) => {
      if (/up|bottom/.test(ele.classList[0])) {
        ele.style.left = "50%";
      } else if (/right|left/.test(ele.classList[0])) {
        ele.style.top = "50%";
      }
    });
  }
}
window.addEventListener("load", function (e) {
  if (
    /Android/i.test(navigator.userAgent) ||
    /iPad|iPhone|iPod/i.test(navigator.userAgent)
  ) {
    const app = new Application("touchmove", "touchstart", "touchend");
    // eventing1 = "touchmove";
    // eventing2 = "touchstart";
    // eventing3 = "touchend";
    // console.log(true, navigator.userAgent);
    // process();
  } else {
    const app = new Application("mousemove", "mousedown", "mouseup");
    // eventing1 = "mousemove";
    // eventing2 = "mousedown";
    // eventing3 = "mouseup";
    // console.log(false, navigator.userAgent);
    // process();
  }
});
// function process() {
//   document.addEventListener(eventing3, closeDragElement);
//   keys = document.querySelectorAll(".item-container.active span:not(.item");
//   function closeDragElement(e) {
//     active = false;
//     keys.forEach((key) => {
//       key.classList.remove("clicked");
//     });
//   }
//   document.addEventListener(eventing2, function (e) {
//     keys = document.querySelectorAll(".item-container.active span:not(.item");
//     if (eventing2 === "mousedown") {
//       e.preventDefault();
//     }
//     keys.forEach((key) => {
//       if (e.target === key) {
//         active = true;
//         key.classList.add("clicked");
//       }
//     });
//   });
//   document.addEventListener(eventing1, function (event) {
//     if (eventing1 === "mousemove") {
//       event.preventDefault();
//       x = event.clientX;
//       y = event.clientY;
//     } else {
//       x = event.changedTouches[0].clientX;
//       y = event.changedTouches[0].clientY;
//     }
//     if (active) {
//       if (
//         up.classList.contains("clicked") ||
//         up1.classList.contains("clicked") ||
//         up2.classList.contains("clicked") ||
//         down.classList.contains("clicked") ||
//         down1.classList.contains("clicked") ||
//         down2.classList.contains("clicked")
//       ) {
//         keys.forEach((key) => {
//           let left;
//           if (key.classList.contains("clicked")) {
//             if (x > containerRect.right - 4) {
//               key.style.left = `${fontsize * 30}px`;
//               left = 30;
//             } else if (x < containerRect.left) {
//               key.style.left = `0px`;
//               left = 0;
//             } else {
//               left = (x - containerRect.left) / fontsize;
//               key.style.left = `${left}rem`;
//             }
//             if (key === up) {
//               spans[0].textContent = `${Math.trunc((left * 100) / 30)}%`;
//               spans[1].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
//             } else if (key === down) {
//               spans[2].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
//               spans[3].textContent = `${Math.trunc((left * 100) / 30)}%`;
//             } else if (key === up1) {
//               spans[0].textContent = `${Math.trunc((left * 100) / 30)}%`;
//             } else if (key === up2) {
//               spans[1].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
//             } else if (key === down1) {
//               spans[2].textContent = `${100 - Math.trunc((left * 100) / 30)}%`;
//             } else if (key === down2) {
//               spans[3].textContent = `${Math.trunc((left * 100) / 30)}%`;
//             }
//           }
//         });
//       } else if (
//         left.classList.contains("clicked") ||
//         left1.classList.contains("clicked") ||
//         left2.classList.contains("clicked") ||
//         right.classList.contains("clicked") ||
//         right1.classList.contains("clicked") ||
//         right2.classList.contains("clicked")
//       ) {
//         keys.forEach((key) => {
//           let top;
//           if (key.classList.contains("clicked")) {
//             if (y > containerRect.bottom - 4) {
//               key.style.top = `${fontsize * 30}px`;
//               top = 30;
//             } else if (y < containerRect.top) {
//               key.style.top = `0px`;
//               top = 0;
//             } else {
//               top = (y - containerRect.top) / fontsize;
//               key.style.top = `${top}rem`;
//             }
//             if (key === right) {
//               spans[5].textContent = `${Math.trunc((top * 100) / 30)}%`;
//               spans[6].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
//             } else if (key === right1) {
//               spans[5].textContent = `${Math.trunc((top * 100) / 30)}%`;
//             } else if (key === right2) {
//               spans[6].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
//             } else if (key === left) {
//               spans[4].textContent = `${Math.trunc((top * 100) / 30)}%`;
//               spans[7].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
//             } else if (key === left1) {
//               spans[4].textContent = `${Math.trunc((top * 100) / 30)}%`;
//             } else if (key === left2) {
//               spans[7].textContent = `${100 - Math.trunc((top * 100) / 30)}%`;
//             }
//           }
//         });
//       } else {
//         event.preventDefault();
//       }
//     }
//     item.style.cssText = `${block.textContent}`;
//   });

//   const copy = document.querySelector(".copy");
//   copy.addEventListener("click", function (e) {
//     navigator.clipboard.writeText(block.textContent);
//   });
// }

// switcher.addEventListener("click", function (e) {
//   switcher.classList.toggle("complex");
//   modeContainer.forEach((ele) => ele.classList.toggle("active"));
//   keys = document.querySelectorAll(".item-container.active span:not(.item");
//   itemContainer = document.querySelector(".item-container.active");
//   containerRect = itemContainer.getBoundingClientRect();
//   item = document.querySelector(".active .item");
//   spans.forEach((ele) => (ele.textContent = "50%"));
//   document
//     .querySelectorAll(".item")
//     .forEach((ele) => (ele.style.cssText = `${block.textContent}`));
//   keys.forEach((ele) => {
//     if (/up|bottom/.test(ele.classList[0])) {
//       ele.style.left = "50%";
//     } else if (/right|left/.test(ele.classList[0])) {
//       ele.style.top = "50%";
//     }
//   });
// });
