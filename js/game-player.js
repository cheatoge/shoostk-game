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

  // Append player's cell to the html
  create() {
    $('#grid-container').append(`<div id="${this.playerID}" class="grid-cell" class="player">${this.value}</div>`);
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

  doPopAnimation() {
    const cellHtml = $(`#${this.playerID}`);
    $(cellHtml).stop().animate({ fontSize : '110%' }, 'fast', function () {
      $(cellHtml).stop().animate({ fontSize : '100%' }, 'fast');
    });
  }

  updatePosition() {
    const posX = `${String(this.position.x * this.moveRadius + this.containerPadding)}px`;
    const posY = `${String(this.position.y * this.moveRadius + this.containerPadding)}px`;
    $(`#${this.playerID}`).css({left: posX, bottom: posY});
  };

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
