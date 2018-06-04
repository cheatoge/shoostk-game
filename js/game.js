import PlayerCell from './game-player.js';
import GameGrid from './game-grid.js';

/* Config */
const gridSize = 4;
const animationTime = 200;
const messageAnimationTime = 1000;
/* End of config */
let pause = false;

const gameGrid = new GameGrid(gridSize);

const gridContainer = document.getElementById('game');
const gridContainerPadding = parseInt(window.getComputedStyle(gridContainer).padding, 10);

// Get one of cells to measure sizes and calculated necessary variables
const cell = document.getElementById('x1y1');
let cellWidth = cell.offsetWidth;
const cellMargin = parseInt(window.getComputedStyle(cell).marginLeft) * 2;

const player = new PlayerCell(cellWidth + cellMargin, gridContainerPadding);

// Adjust lineHeight of all cells to make the them look square
function setLineHeights() {
  cellWidth = cell.offsetWidth;
  player.moveRadius = cellWidth + cellMargin;
  player.updatePosition();
  const allCells = document.getElementsByClassName('game__cell');
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].style.lineHeight = cellWidth + 'px';
  }
}

setLineHeights();

window.onresize = () => {
  setLineHeights();
};

function handlePlayerAction(player, nextPosition, gameGrid) {

  // Check if player can move to destination, if not do nothing
  if (player.isMovePossible(nextPosition, gameGrid)) {
    player.moves++;

    // Move the player
    player.position = nextPosition;

    // The cell player just stepped on
    const destination = gameGrid.cells[player.position.y][player.position.x];

    player.updatePosition();
    switch (destination.actionType) {
      case '+':
        player.value = Math.round(player.value += destination.value);
        break;
      case '-':
        player.value = Math.round(player.value -= destination.value);
        break;
      case '*':
        player.value = Math.round(player.value *= destination.value);
        break;
      case '/':
        player.value = Math.round(player.value /= destination.value);
        break;
    }

    //Set timeout for updating cell properties, so the user won't see numbers changing while animating
    setTimeout(() => {
      destination.updateCellProperties();
    }, 100);
    player.updateHtmlValue();

    // If the player won, freeze the game and show number of moves
    if (player.value === 6) {
      pause = true;
      document.getElementById('moves').innerHTML = player.moves.toString();

      // Show message with fade in transition
      const message = document.getElementById('message');
      message.style.display = '';
      setTimeout(() => {
        message.classList.add('message--visible');
      }, 50);
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (pause) return;
  // There are many cases in switch because Edge and Chrome have different keys' names. I could use keyCodes, but they are harder to read and maintain imo.
  let nextPosition;
  switch (e.key) {
    case 'w':
    case 'W':
    case 'ArrowUp':
    case 'Up':
      e.preventDefault();
      nextPosition = {x: player.position.x, y: player.position.y + 1};
      handlePlayerAction(player, nextPosition, gameGrid);
      break;
    case 's':
    case 'S':
    case 'Down':
    case 'ArrowDown':
      e.preventDefault();
      nextPosition = {x: player.position.x, y: player.position.y - 1};
      handlePlayerAction(player, nextPosition, gameGrid);
      break;
    case 'A':
    case 'a':
    case 'Left':
    case 'ArrowLeft':
      e.preventDefault();
      nextPosition = {x: player.position.x - 1, y: player.position.y};
      handlePlayerAction(player, nextPosition, gameGrid);
      break;
    case 'D':
    case 'd':
    case 'Right':
    case 'ArrowRight':
      e.preventDefault();
      nextPosition = {x: player.position.x + 1, y: player.position.y};
      handlePlayerAction(player, nextPosition, gameGrid);
      break;
  }
});

$('.new-game').on('click', () => {
  gameGrid.resetGameGrid(animationTime);
  player.reset();
  player.fadeOut();
  const message = document.getElementById('message');
  message.classList.remove('message--visible');
  setTimeout(() => {
    message.style.display = 'none';
    pause = false;
  }, messageAnimationTime);
});
