$(document).ready( () => {

  const gridSize = 4;
  const tileSize = 110;
  const tileSpacing = 10;   // Space between tiles
  const gridContainerPadding = 10;   // Grid container's padding

  class Player {
    constructor(value = 10){
      this.value = value;
      this.position = { x: 0, y: 0};
      this.htmlId = 'player';
      this.moveRadius = tileSize + tileSpacing;
    }

    create(){
      $('.grid-container').append(`<div id="${this.htmlId}" class="player">${this.value}</div>`);
      console.log('blin');
    }

    _updatePosition() {
      const posX = `${String( this.position.x * this.moveRadius + gridContainerPadding )}px`; // calculate position and add margin
      const posY = `${String( this.position.y * this.moveRadius + gridContainerPadding )}px`;
      $(`#${this.htmlId}`).css({left: posX, bottom: posY});
    };

    _isMovePossible(nextPosition) {
      const x = nextPosition.x;
      const y = nextPosition.y;
      function gridContains(position) {
        return (position <= gridSize-1 && position >= 0);
      }

      return ( gridContains(x) && gridContains(y) );
    }

    _handleMovement(nextPosition){
      if(this._isMovePossible(nextPosition)){
        this.position = nextPosition;
        this._updatePosition();
      }
    }

    moveUp(){
      let newPosition = { x: player1.position.x, y: player1.position.y+1 };
      this._handleMovement(newPosition);
    }

    moveDown(){
      let newPosition = { x: player1.position.x, y: player1.position.y-1 };
      this._handleMovement(newPosition);
    }

    moveRight(){
      let newPosition = { x: player1.position.x+1, y: player1.position.y };
      this._handleMovement(newPosition);
    }

    moveLeft(){
      let newPosition = { x: player1.position.x-1, y: player1.position.y };
      this._handleMovement(newPosition);
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
  
  const player1 = new Player(66);
  player1.create();

});
