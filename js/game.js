$(document).ready(() => {

  const gridSize = 4;
  const cellSize = 110;
  const cellSpacing = 10;   // Space between tiles
  const gridContainerPadding = 10;   // Grid container's padding

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

    appendToHtml() {
      $('.grid-container').append(`<div class="grid-cell" id="${this.postitionAsText}">${this.actionType}${this.value}</div>`);
    }

    updateCellProperties() {
      const cellProperties = GridCell.generateCellProperties();
      this.actionType = cellProperties.type;
      this.value = cellProperties.value;
      $(`#${this.postitionAsText}`).html(`${this.actionType}${this.value}`);
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
      }
    }
  }

  const gameGrid = create2DGrid(gridSize);

  class Player {
    constructor() {
      this.position = {x: 0, y: 0};
      this.playerID = 'player';
      this.moveRadius = cellSize + cellSpacing;
      this.value = 66;
      this.create();
    }

    create() {
      $('.grid-container').append(`<div id="${this.playerID}" class="player">${this.value}</div>`);
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
        if (this.value === 6) {
          alert('You won m8!');
        }
      }
    }

    moveUp() {
      const nextPosition = {x: player1.position.x, y: player1.position.y + 1};
      this._handlePlayerAction(nextPosition);
    }

    moveDown() {
      const nextPosition = {x: player1.position.x, y: player1.position.y - 1};
      this._handlePlayerAction(nextPosition);
    }

    moveRight() {
      const nextPosition = {x: player1.position.x + 1, y: player1.position.y};
      this._handlePlayerAction(nextPosition);
    }

    moveLeft() {
      const nextPosition = {x: player1.position.x - 1, y: player1.position.y};
      this._handlePlayerAction(nextPosition);
    }
  }

  document.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        e.preventDefault();
        player1.moveUp();
        break;
      case 'KeyS':
      case 'ArrowDown':
        e.preventDefault();
        player1.moveDown();
        break;
      case 'KeyA':
      case 'ArrowLeft':
        e.preventDefault();
        player1.moveLeft();
        break;
      case 'KeyD':
      case 'ArrowRight':
        e.preventDefault();
        player1.moveRight();
        break;
    }
  });
  createHtmlCells(gameGrid);
  const player1 = new Player();

  console.log(gameGrid);

});
