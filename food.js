import { randomNumber } from './mathUtils.js';


export const food = {
  position: null
}


export function placeFood(cells) {
  const freePositions = [];

  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList.contains('busy')) {
      freePositions.push(i);
    }
  }

  food.position = freePositions[randomNumber(freePositions.length)];
}