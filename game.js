/* jshint strict: global, esversion: 6, browser: true */
'use strict';

const board = document.getElementById('board').querySelectorAll('td');

function get10randomNumbers(max) {
  let counter = 10;
  let numbers = [];
  while (counter) {
    let number = Math.floor(Math.random() * max);
    if (!numbers.includes(number)) {
      numbers.push(number);
      counter--;
    }
  }
  return numbers;
}

let numbers = get10randomNumbers(board.length);
numbers.forEach((cellNo) => {
  board[cellNo].innerText = '💩';
});

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

function Grid(board, width, height) {
  this.space = board;
  this.width = width;
  this.height = height;
}

Grid.prototype.isInside = function (vector) {
  return (
    vector.x >= 0 &&
    vector.x < this.width &&
    vector.y >= 0 &&
    vector.y < this.height
  );
};

Grid.prototype.get = function (vector) {
  return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function (vector, value) {
  this.space[vector.x + this.width * vector.y].innerText = value;
};

const grid = new Grid(board, 10, 10);
for (let y = 0; y < 10; y++) {
  for (let x = 0; x < 10; x++) {
    let howMany = 0;
    [
      { x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y },
      { x: x + 1, y: y + 1 },
      { x, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y },
      { x: x - 1, y: y - 1 },
    ].forEach((cell) => {
      if (grid.isInside(cell)) {
        if (grid.get(cell).innerText === '💩') howMany++;
      }
    });
    if (grid.get({ x, y }).innerText === '') {
      grid.set({ x, y }, howMany);
    }
  }
}

board.forEach((el) => {
  el.seen = false;
  el.classList.add('hide');
  el.addEventListener('click', (event) => {
    console.log(event.target.innerText);
    el.classList.remove('hide');
  });
});
