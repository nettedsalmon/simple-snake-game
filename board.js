import { snake } from './snake.js';
import { food } from './food.js';
import { toLinear } from './mathUtils.js';
import { boardWidth } from './config.js';


const board = document.querySelector('.board');

for (let i = 0; i < boardWidth ** 2; i++) {
  board.innerHTML += '<div class="cell"></div>'
}


export function renderBoard(cells) {
  cells.forEach((cell) => {
    cell.classList.remove('busy', 'food');
  });

  snake.forEach((cell) => {
    cells[toLinear(cell.position)].classList.add('busy');
  });

  cells[food.position].classList.add('food');
}

export const buttons = {
  play: document.querySelector('.play-button'),
  playAgain: document.querySelector('.play-again-button'),
  resume: document.querySelector('.resume-button'),
  pause: document.querySelector('.pause-button')
}

const gameOverLabel = document.querySelector('.game-over');

export function toggletBoardState(state) {
  if (state === 'reset') {
    board.classList.remove('overlay');

    buttons.play.classList.add('hidden');
    buttons.playAgain.classList.add('hidden');
    buttons.resume.classList.add('hidden');
    gameOverLabel.classList.add('hidden');

    return;
  } 
  
  board.classList.add('overlay');
  
  if (state === 'start') {
    buttons.play.classList.remove('hidden');
  } else if (state === 'gameOver') {
    buttons.playAgain.classList.remove('hidden');
    gameOverLabel.classList.remove('hidden');
  } else if (state === 'pause') {
    buttons.resume.classList.remove('hidden');
  }
}