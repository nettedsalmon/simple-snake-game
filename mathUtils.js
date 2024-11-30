import { boardWidth } from './config.js';


export function randomNumber(rightBound, leftBound = 0) {
  return Math.floor( Math.random() * (rightBound - leftBound) + leftBound );
}

export function toLinear(position) {
  const { x, y } = position;
  return y * boardWidth + x;
}