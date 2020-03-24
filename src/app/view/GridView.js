import View from './View';

export default class GridView extends View {
  #grid;

  constructor() {
    super();
    this.#grid = this.getElement('#grid');
    console.log(this.#grid);
    console.log('I am grid view hello');
  }

  render(tiles) {
    tiles.forEach(tile => {
      this.#grid.append(this.createElement('div', tile.name, ['tile']));
    });
  }
}
