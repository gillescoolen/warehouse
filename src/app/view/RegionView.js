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

  renderGrid = tiles => {
    this.clear(this.#grid);

    tiles.forEach(tile => {
      this.#grid.append(
        this.createElement('div', tile.name, ['tile', tile.getClassName()])
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
    this.clear(this.#product);
    this.#product.innerText = product.name;
  };

  bindRegionChange = handler => {
    this.#menu.forEach(child =>
      child.addEventListener('click', event => handler(child.id))
    );
  };

  bindProductChange = handler => {
    this.#products.addEventListener('change', event =>
      handler(event.target.value)
    );
  };
}
