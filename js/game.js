$(document).ready( () => {

  const gridSize = 4;
  const gridCell =  $('.grid-cell');
  const moveRadius = parseInt(gridCell.css('height')) + parseInt(gridCell.css('margin-right'));

  class Tile {
    constructor(value = 10){
      this.value = value;
      this.position = { x: 0, y: 0};
    }

    _updatePosition() {
      const posX = `${String(this.position.x * moveRadius)}px`;
      const posY = `${String(this.position.y * moveRadius)}px`;
      $('#player').css({left: posX, bottom: posY});
    };

    _isMovePossible(nextPosition) {
      return (nextPosition <= gridSize-1 && nextPosition >= 0);
    };

    create(){
      $('.tile-container').append(`<div id="player">${this.value}</div>`);
    }

    moveUp(){
      if(this._isMovePossible(this.position.y+1)){
        this.position.y++;
        this._updatePosition();
      }
    }

    moveDown(){
      if(this._isMovePossible(this.position.y-1)){
        this.position.y--;
        this._updatePosition();
      }
    }

    moveLeft(){
      if(this._isMovePossible(this.position.x-1)){
        this.position.x--;
        this._updatePosition();
      }
    }

    moveRight(){
      if(this._isMovePossible(this.position.x+1)){
        this.position.x++;
        this._updatePosition();
      }
    }
  }


  document.addEventListener('keydown', (e) => {
    switch (e.code){
      case 'KeyW':
      case 'ArrowUp':
        e.preventDefault();
        playerTile.moveUp();
        break;
      case 'KeyS':
      case 'ArrowDown':
        e.preventDefault();
        playerTile.moveDown();
        break;
      case 'KeyA':
      case 'ArrowLeft':
        e.preventDefault();
        playerTile.moveLeft();
        break;
      case 'KeyD':
      case 'ArrowRight':
        e.preventDefault();
        playerTile.moveRight();
        break;
    }
  });
  
  const playerTile = new Tile(66);
  playerTile.create();

});
