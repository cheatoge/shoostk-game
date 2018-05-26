import PlayerCell from './game-player.js';
import GameGrid from './game-grid.js';


const gridSize = 4;
const animationTime = 200;

let pause = false;

const gameGrid = new GameGrid(gridSize);

const gridContainer = document.getElementById('grid-container');
const gridContainerPadding = parseInt(window.getComputedStyle(gridContainer).padding, 10);

// Get one of cells to measure sizes and calculated necessary variables
const cell = document.getElementById('x1y1');
let cellWidth = cell.offsetWidth;
const cellMargin = parseInt(window.getComputedStyle(cell).marginLeft)*2;

const player = new PlayerCell(cellWidth + cellMargin, gridContainerPadding);

// Adjust lineHeight of all cells to make the them look square
function setLineHeights() {
  cellWidth = cell.offsetWidth;
  player.moveRadius = cellWidth + cellMargin;
  player.updatePosition();
  const allCells = document.getElementsByClassName('grid-cell');
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].style.lineHeight = cellWidth + 'px';
  }
}
setLineHeights();

window.onresize = () => {
  setLineHeights();
};

function handlePlayerAction(player, nextPosition, gameGrid) {
  if (player.isMovePossible(nextPosition, gameGrid)) {
    console.log(gameGrid);
    player.moves++;
    const steppedCell = gameGrid.cells[nextPosition.y][nextPosition.x];

    console.log(nextPosition.y);
    player.position = nextPosition;
    player.updatePosition();
    switch (steppedCell.actionType) {
      case '+':
        player.value = Math.round(player.value += steppedCell.value);
        break;
      case '-':
        player.value = Math.round(player.value -= steppedCell.value);
        break;
      case '*':
        player.value = Math.round(player.value *= steppedCell.value);
        break;
      case '/':
        player.value = Math.round(player.value /= steppedCell.value);
        break;
    }
    steppedCell.updateCellProperties();
    player.updateHtmlValue();
    player.doPopAnimation();
    if (player.value === 6) {
      pause = true;
      $('#moves').html(player.moves);
      $('#game-message').fadeIn("slow");
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
  $('#game-message').fadeOut("fast", () => pause = false);
});
