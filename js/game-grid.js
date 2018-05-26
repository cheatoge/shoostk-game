import GameCell from './game-cell.js';

export default class GameGrid {
    constructor (size = 4){
      this.size = size;
      this.cells = GameGrid.createGameGrid(size);
    }
    static createGameGrid (size) {
      let cells = new Array(size);

      // Loop for every row in grid.
      // The loop looks weird, but this way we're generating cells with logical in-game ids
      for (let y = size-1; y >= 0; y--) {
        cells[y] = new Array(size);

        // Loop for every column in grid
        for (let x = 0; x < size; x++) {
          cells[y][x] = new GameCell(x, y);
          cells[y][x].appendToHtml();
          cells[y][x].doPopInAnimation();
        }
      }
      return cells;
    }

    resetGameGrid(animationTime = 200) {
      for (let row = 0; row < this.cells.length; row++) {
        for (let cell = 0; cell < this.cells.length; cell++){

          // Animate the tiles out of the screen, change their values, then pop them back
          this.cells[row][cell].doPopOutAnimation(animationTime);
          setTimeout(() => {
            this.cells[row][cell].updateCellProperties();
            this.cells[row][cell].doPopInAnimation();
          }, animationTime);
        }
      }
    };
}