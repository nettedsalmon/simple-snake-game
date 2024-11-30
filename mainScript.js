import { renderBoard, toggletBoardState, buttons } from './board.js';
import { createSnake, calculatePosition, changeDirection, addCell, isGameOver, isFood } from './snake.js';
import { placeFood } from './food.js';
import { deltaInterval } from './config.js';


const cells = document.querySelectorAll('.cell');
const score = document.querySelector('.score');

let isInputAvailable = false;
let isLooped = false;
let loopId = null;

let targetInterval = 350;
let scoreCount = -1;


function startLoop() {
  if (!isLooped) {
    loopId = requestAnimationFrame(loopGame);
    isLooped = true;
    toggletBoardState('reset');
  }
}

function stopLoop() {
  if (isLooped) {
    cancelAnimationFrame(loopId);
    isLooped = false;
  }
}

function updateScore() {
  scoreCount += 1;
  score.innerHTML = `Счёт: ${scoreCount}`;
}

buttons.play.addEventListener('click', startLoop);
buttons.resume.addEventListener('click', startLoop);
buttons.playAgain.addEventListener('click', () => {
  scoreCount = -1;
  start = null;
  startLoop();
});
buttons.pause.addEventListener('click', () => {
  if (isLooped) {
    stopLoop();
    toggletBoardState('pause');
  }
});


document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    if (isLooped) {
      stopLoop();
      toggletBoardState('pause');
    }
  }
});

document.addEventListener('keydown', (event) => {

  if (event.code === 'KeyP') {
    if (isLooped) {
      stopLoop();
      toggletBoardState('pause');
    }
  }

  if (event.code === 'Enter') {
    startLoop();
    return;
  }

  if (isInputAvailable) {
    isInputAvailable = false;
    changeDirection(event.code);
  }
});


let start = null;
function loopGame(timestamp) {
  if (!start) {
    createSnake();
    placeFood(cells);
    updateScore();

    start = timestamp;
  }

  if (timestamp - start > targetInterval) {
    calculatePosition();

    if (isGameOver()) {
      stopLoop();
      toggletBoardState('gameOver');
      return;
    }

    if (isFood()) {
      placeFood(cells);
      updateScore();
      addCell();

      targetInterval -= deltaInterval;
    }

    renderBoard(cells);

    start = timestamp;
    isInputAvailable = true;
  }

  loopId = requestAnimationFrame(loopGame);
}