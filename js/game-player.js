export default class Player {
  constructor(moveRadius, containerPadding, startValue = 66) {
    this.position = {x: 0, y: 0};
    this.playerID = 'player';
    this.moveRadius = moveRadius;
    this.containerPadding = containerPadding;
    this.startValue = startValue;
    this.value = startValue;
    this.moves = 0;
    this.create();
    this.updatePosition();
  }

  // Returns div that represents player
  getPlayer() {
    return document.getElementById('player');
  }
  // Append player's cell to the html
  create() {
    $('#game').append(`<div id="${this.playerID}" class="game__cell" class="player">${this.value}</div>`);
  }

  // Reset player's position etc.
  reset() {
    this.position.x = 0;
    this.position.y = 0;
    this.value = this.startValue;
    this.updatePosition();
    this.updateHtmlValue();
    this.moves = 0;
  }

  updatePosition() {
    const posX = `${String(this.position.x * this.moveRadius + this.containerPadding)}px`;
    const posY = `${String(this.position.y * this.moveRadius + this.containerPadding)}px`;
    let player = this.getPlayer();
    player.style.left = posX;
    player.style.bottom = posY;
  };

  fadeIn() {
    this.getPlayer().classList.remove('.game__cell--hidden');
  }

  fadeOut() {
    this.getPlayer().classList.add('.game__cell--hidden');
  }

  isMovePossible(nextPosition, gameGrid) {
    const x = nextPosition.x;
    const y = nextPosition.y;
    const gridContains = (position) => position <= gameGrid.size - 1 && position >= 0;
    return (gridContains(x) && gridContains(y));
  }

  updateHtmlValue() {
    $(`#${this.playerID}`).html(`${this.value}`);
  }
}
