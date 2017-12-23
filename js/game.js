$(document).ready(() => {

  const gridSize = 4;
  const cellSize = 110;
  const cellSpacing = 10;   // Space between tiles
  const gridContainerPadding = 10;   // Grid container's padding
  const startValue = 66;
  let pause = false;

  function randomizeInt(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) + min);
  }

  class GridCell {
    constructor(positionX, positionY) {
      this.position = {x: positionX, y: positionY};
      this.postitionAsText = `x${positionX}y${positionY}`;
      const cellProperties = GridCell.generateCellProperties();
      this.actionType = cellProperties.type;
      this.value = cellProperties.value;
    }

    static generateCellProperties() {
      const val = randomizeInt(1, 4);
      switch (val) {
        case 1:
          return {type: '+', value: randomizeInt(1, 10)};
        case 2:
          return {type: '-', value: randomizeInt(1, 10)};
        case 3:
          return {type: '*', value: 2};
        case 4:
          return {type: '/', value: randomizeInt(2, 5)};
      }
    }

    doPopInAnimation() {
      const cellHtml = $(`#${this.postitionAsText}`);
        $(cellHtml).stop().animate({ fontSize : '100%' }, 'fast');
    }

    doPopOutAnimation(then) {
      const cellHtml = $(`#${this.postitionAsText}`);
      $(cellHtml).stop().animate({ fontSize : '0' }, 'fast', then);
    }

    appendToHtml() {
      $('.grid-container').append(`<div class="grid-cell" id="${this.postitionAsText}">${this.actionType}${this.value}</div>`);
    }

    updateCellProperties() {
      const cellProperties = GridCell.generateCellProperties();
      this.actionType = cellProperties.type;
      this.value = cellProperties.value;
      $(`#${this.postitionAsText}`).html(`${this.actionType}${this.value}`);
    }
  }

  function create2DGrid(size) {
    let gameGrid = new Array(size);
    for (let x = 0; x < size; x++) {
      gameGrid[x] = new Array(size);
      for (let y = 0; y < size; y++) {
        gameGrid[x][y] = new GridCell(y, x);
      }
    }
    return gameGrid;
  }

  function createHtmlCells(grid) {
    for (let x = 0; x < gridSize; x++) {
      for (const cell of grid[x]) {
        cell.appendToHtml();
        cell.doPopInAnimation();
      }
    }
  }

  const gameGrid = create2DGrid(gridSize);
  gameGrid.resetGameGrid = function () {
    for (const row of gameGrid) {
      for (const cell of row) {
        cell.doPopOutAnimation(function(){
          cell.updateCellProperties();
          cell.doPopInAnimation();
        });
      }
    }
  };

  class Player {
    constructor() {
      this.position = {x: 0, y: 0};
      this.playerID = 'player';
      this.moveRadius = cellSize + cellSpacing;
      this.value = startValue;
      this.moves = 0;
      this.create();
    }

    create() {
      $('.grid-container').append(`<div id="${this.playerID}" class="player">${this.value}</div>`);
    }

    reset() {
      this.position.x = 0;
      this.position.y = 0;
      this.value = startValue;
      this._updatePosition();
      this._updateHtmlValue();
      this.moves = 0;
    }

    doPopAnimation() {
      const cellHtml = $(`#${this.playerID}`);
      $(cellHtml).stop().animate({ fontSize : '110%' }, 'fast', function () {
        $(cellHtml).stop().animate({ fontSize : '100%' }, 'fast');
      });
    }

    _updatePosition() {
      const posX = `${String(this.position.x * this.moveRadius + gridContainerPadding)}px`; // calculate position and add margin
      const posY = `${String(this.position.y * this.moveRadius + gridContainerPadding)}px`;
      $(`#${this.playerID}`).css({left: posX, bottom: posY});
    };

    _isMovePossible(nextPosition) {
      const x = nextPosition.x;
      const y = nextPosition.y;
      const gridContains = (position) => position <= gridSize - 1 && position >= 0;
      return (gridContains(x) && gridContains(y));
    }

    _updateHtmlValue() {
      $(`#${this.playerID}`).html(`${this.value}`);
    }

    _handlePlayerAction(nextPosition) {
      if (this._isMovePossible(nextPosition)) {
        this.moves++;
        const steppedCell = gameGrid[gridSize - 1 - nextPosition.y][nextPosition.x];
        this.position = nextPosition;
        this._updatePosition();
        switch (steppedCell.actionType) {
          case '+':
            this.value = Math.round(this.value += steppedCell.value);
            break;
          case '-':
            this.value = Math.round(this.value -= steppedCell.value);
            break;
          case '*':
            this.value = Math.round(this.value *= steppedCell.value);
            break;
          case '/':
            this.value = Math.round(this.value /= steppedCell.value);
            break;
        }
        steppedCell.updateCellProperties();
        this._updateHtmlValue();
        this.doPopAnimation();
        if (this.value === 6) {
          pause = true;
          $('#moves').html(this.moves);
          $('#game-message').fadeIn("slow");
        }
      }
    }

    moveUp() {
      const nextPosition = {x: player.position.x, y: player.position.y + 1};
      this._handlePlayerAction(nextPosition);
    }

    moveDown() {
      const nextPosition = {x: player.position.x, y: player.position.y - 1};
      this._handlePlayerAction(nextPosition);
    }

    moveRight() {
      const nextPosition = {x: player.position.x + 1, y: player.position.y};
      this._handlePlayerAction(nextPosition);
    }

    moveLeft() {
      const nextPosition = {x: player.position.x - 1, y: player.position.y};
      this._handlePlayerAction(nextPosition);
    }
  }

  document.addEventListener('keydown', (e) => {
    if(pause) return;
    // There are many cases in switch because Edge and Chrome have different keys' names. I could use keyCodes, but they are harder to read and maintain imo.
    switch (e.key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
      case 'Up':
        e.preventDefault();
        player.moveUp();
        break;
      case 's':
      case 'S':
      case 'Down':
      case 'ArrowDown':
        e.preventDefault();
        player.moveDown();
        break;
      case 'A':
      case 'a':
      case 'Left':
      case 'ArrowLeft':
        e.preventDefault();
        player.moveLeft();
        break;
      case 'D':
      case 'd':
      case 'Right':
      case 'ArrowRight':
        e.preventDefault();
        player.moveRight();
        break;
    }
  });

  createHtmlCells(gameGrid);
  const player = new Player();

  $('.new-game').on('click', () => {
    gameGrid.resetGameGrid();
    player.reset();
    $('#game-message').fadeOut("fast", () => pause = false);
  })
});
