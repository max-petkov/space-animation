"use strict";

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function randomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

canvas.width = innerWidth;
canvas.height = innerHeight;

let stars = [];

class Star {
  constructor(x, y, radius, color, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedY = speedY * 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.y -= this.speedY;

    if (this.y + this.radius <= 0) {
      this.y = canvas.height;
    }
  }
}

function init() {
  for (let i = 0; i < 150; i++) {
    const x = randomNumber(1, innerWidth);
    const y = randomNumber(1, innerHeight);
    const radius = 0.5;
    const color = "#d5d9e6";
    const speedY = randomNumber(0.05, 0.06);

    stars.push(new Star(x, y, radius, color, speedY));
  }
  for (let i = 0; i < 50; i++) {
    const x = randomNumber(1, innerWidth);
    const y = randomNumber(1, innerHeight);
    const radius = 1.5;
    const color = "#2F323F";
    const speedY = 0.2;

    stars.push(new Star(x, y, radius, color, speedY));
  }
}

init();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.update();
  });
}

animate();

window.addEventListener("resize", function () {
  stars = [];

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});
