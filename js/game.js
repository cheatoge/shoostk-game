$(document).ready( () => {

  const gridSize = 4;
  const cellSize = 110;
  const cellSpacing = 10;   // Space between tiles
  const gridContainerPadding = 10;   // Grid container's padding

  function randomizeInt(min, max){
    max++;
    return Math.floor(Math.random() * (max - min) + min);
  }

  class GridCell {
    constructor(positionX, positionY){
      this.position = { x: positionX, y: positionY};
      this.htmlId = `x${positionX}y${positionY}`;
      const cellProperties = GridCell._generateCellProperties();
      this.actionType = cellProperties.type;
      this.value = cellProperties.value;
    }

    static _updateCellProperties() {
      const cellProperties = GridCell._generateCellProperties();
      this.actionType = cellProperties.type;
      this.value = cellProperties.value;
    }

    static _generateCellProperties() {
      const val = randomizeInt(1, 4);
      switch (val){
        case 1:
          return { type:'+', value: randomizeInt(1, 10)};
        case 2:
          return { type:'-', value: randomizeInt(1,10)};
        case 3:
          return { type:'*', value: 2};
        case 4:
          return { type:'/', value: randomizeInt(2,5)};

      }
    }
  }

  function create2DGrid(size) {
    let gameGrid = new Array(size);
    for (let x = 0; x < size; x++) {
      gameGrid[size-1-x] = new Array(size);
      for(let y = 0; y < size; y++) {
        gameGrid[size-1-x][y] = new GridCell(y, x);
      }
    }
    return gameGrid;
  }

  function createHtmlCells(grid) {
    for (let x = 0; x < gridSize; x++) {
      for(const cell of grid[x]){
        $('.grid-container').append(`<div class="grid-cell" id="${cell.htmlId}">${cell.actionType}${cell.value}</div>`);
      }
    }
  }

  class Player {
    constructor(){
      this.position = { x: 0, y: 0};
      this.htmlId = 'player';
      this.moveRadius = cellSize + cellSpacing;
      this.value = 66;
      this.create();
    }

    create() {
      $('.grid-container').append(`<div id="${this.htmlId}" class="player">${this.value}</div>`);
    }

    _updatePosition() {
      const posX = `${String( this.position.x * this.moveRadius + gridContainerPadding )}px`; // calculate position and add margin
      const posY = `${String( this.position.y * this.moveRadius + gridContainerPadding )}px`;
      $(`#${this.htmlId}`).css({left: posX, bottom: posY});
    };

    _isMovePossible(nextPosition) {
      const x = nextPosition.x;
      const y = nextPosition.y;
      const gridContains = (position) => position <= gridSize-1 && position >= 0;
      return ( gridContains(x) && gridContains(y) );
    }

    _handlePlayerAction(nextPosition) {
      if(this._isMovePossible(nextPosition)){
        this.position = nextPosition;
        this._updatePosition();
      }
    }

    moveUp() {
      let newPosition = { x: player1.position.x, y: player1.position.y+1 };
      this._handlePlayerAction(newPosition);
    }

    moveDown() {
      let newPosition = { x: player1.position.x, y: player1.position.y-1 };
      this._handlePlayerAction(newPosition);
    }

    moveRight() {
      let newPosition = { x: player1.position.x+1, y: player1.position.y };
      this._handlePlayerAction(newPosition);
    }

    moveLeft() {
      let newPosition = { x: player1.position.x-1, y: player1.position.y };
      this._handlePlayerAction(newPosition);
    }
  }

  document.addEventListener('keydown', (e) => {
    switch (e.code){
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

  const gameGrid = create2DGrid(gridSize);
  createHtmlCells(gameGrid);
  const player1 = new Player();

  console.log(gameGrid);

});
