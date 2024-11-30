import { randomNumber, toLinear } from './mathUtils.js';
import { boardWidth } from './config.js';
import { food } from './food.js';


export let snake = [];

export function createSnake() {
  snake = [
    {
      position: { 
        x: randomNumber(boardWidth - 1 - 2, 2), 
        y: randomNumber(boardWidth - 1 - 2, 2) 
      },
  
      direction: 0
    }
  ];
}


export function calculatePosition() {

  const cell = snake[0];
  let {x, y} = cell.position;

  switch (cell.direction) {
    case 0:
      y -= 1;
      break;
    case 1:
      x += 1;
      break;
    case 2:
      y += 1;
      break;
    case 3:
      x -= 1;
      break;
  }

  snake.unshift({
    position: {x, y},
    direction: cell.direction
  });

  snake.pop();
}


export function changeDirection(code) {
  switch (snake[0].direction) {
    case 0:
      if (code === 'ArrowLeft') {
        snake[0].direction = (snake[0].direction + 3) % 4;
      } else if (code === 'ArrowRight') {
        snake[0].direction = (snake[0].direction + 1) % 4;
      }
      break;
    case 1:
      if (code === 'ArrowUp') {
        snake[0].direction = (snake[0].direction + 3) % 4;
      } else if (code === 'ArrowDown') {
        snake[0].direction = (snake[0].direction + 1) % 4;
      }
      break;
    case 2:
      if (code === 'ArrowRight') {
        snake[0].direction = (snake[0].direction + 3) % 4;
      } else if (code === 'ArrowLeft') {
        snake[0].direction = (snake[0].direction + 1) % 4;
      }
      break;
    case 3:
      if (code === 'ArrowDown') {
        snake[0].direction = (snake[0].direction + 3) % 4;
      } else if (code === 'ArrowUp') {
        snake[0].direction = (snake[0].direction + 1) % 4;
      }
      break;
  }
}


export function addCell() {
  const parentCell = snake.at(-1);
  const { x, y } = parentCell.position;

  const newCell = {
    position: { x, y },
    direction: parentCell.direction
  };

  switch (parentCell.direction) {
    case 0:
      newCell.position.y += 1;
      break;
    case 1:
      newCell.position.x -= 1;
      break;
    case 2:
      newCell.position.y -= 1;
      break;
    case 3:
      newCell.position.x += 1;
      break;
  }

  snake.push(newCell);
}


export function isGameOver() {
  const headPosition = toLinear(snake[0].position);

  for (let i = 1; i < snake.length; i++) {
    if (headPosition === toLinear(snake[i].position)) {
      return true;
    }
  }

  const { x, y } = snake[0].position;

  return (x < 0 || x > boardWidth - 1) || (y < 0 || y > boardWidth - 1);
}


export function isFood() {
  return toLinear(snake[0].position) === food.position;
}