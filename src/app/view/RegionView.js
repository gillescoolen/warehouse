import View from './View';

export default class RegionView extends View {
  #grid;
  #menu;
  #product;
  #products;

  constructor() {
    super();

    this.#grid = this.getElement('#grid');
    this.#product = this.getElement('#product');
    this.#products = this.getElement('#products');
    this.#menu = this.getMultipleElements('#menu div');
  }

  clear = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
  };

  renderGrid = tiles => {
    this.clear(this.#grid);

    tiles.forEach(tile => {
      this.#grid.append(
        this.createElement('div', tile.name, [
          'tile',
          tile.hasHazard() ? 'hazard' : 'open'
        ])
      );
    });
  };

  renderProducts = products => {
    this.clear(this.#products);
    this.clear(this.#product);

    products.forEach(product => {
      var option = this.createElement('option', product.name);
      option.text = product.name;
      option.value = product.name;
      this.#products.append(option);
    });
  };

  renderProduct = product => {
    console.log(product);
    console.log(product.region);

    this.clear(this.#product);
    this.#product.innerText = product.name;
  };

  bindRegionChange = handler => {
    this.#menu.forEach(child =>
      child.addEventListener('click', event => handler(child.id))
    );
  };

  bindProductChange = handler => {
    this.#products.addEventListener('change', event => {
      console.log(event.target.value);
      handler(event.target.value);
    });
  };
}
