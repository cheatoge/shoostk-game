function randomizeInt(min, max) {
  max++;
  return Math.floor(Math.random() * (max - min) + min);
}

export default class GameCell {
  constructor(positionX, positionY) {
    this.position = {x: positionX, y: positionY};
    this.postitionAsText = `x${positionX}y${positionY}`; // This is also id!
    const cellValue = GameCell.generateCellValue();
    this.actionType = cellValue.type;
    this.value = cellValue.value;
    this.fontSizeBeforeAnimation = null;
  }

  static generateCellValue() {
    const random = randomizeInt(1, 6);
    switch (random) {
      case 1:
      case 2:
        return {type: '+', value: randomizeInt(1, 10)};
      case 3:
      case 4:
        return {type: '-', value: randomizeInt(1, 10)};
      case 5:
        return {type: '*', value: 2};
      case 6:
      case 7:
        return {type: '/', value: randomizeInt(2, 3)};
    }
  }

  doPopInAnimation(howFast) {
    const cellHtml = $(`#${this.postitionAsText}`);
    $(cellHtml).stop().animate({ fontSize : '100%' }, howFast);
  }

  doPopOutAnimation(howFast) {
    const cellHtml = $(`#${this.postitionAsText}`);
    $(cellHtml).stop().animate({ fontSize : '0' }, howFast);
  }

  appendToHtml() {
    let div = document.createElement('div');
    div.innerHTML = `${this.actionType}${this.value}`;
    div.className = 'grid-cell';
    div.id = this.postitionAsText;
    document.getElementById('grid-container').appendChild(div);
  }

  updateCellProperties() {
    const cellProperties = GameCell.generateCellValue();
    this.actionType = cellProperties.type;
    this.value = cellProperties.value;
    $(`#${this.postitionAsText}`).html(`${this.actionType}${this.value}`);
  }
}