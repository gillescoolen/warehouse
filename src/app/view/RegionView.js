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
    this.#products = this.getElement('#products-clothes');
    this.#menu = this.getMultipleElements('#menu div');
  }

  /**
   * Renders the tile grid.
   * @param {Tile[]} tiles The tile data.
   */
  renderGrid = tiles => {
    this.clear(this.#grid);

    tiles.forEach(tile => {
      this.#grid.append(
        this.createElement('div', tile.name, ['tile', tile.getClassName()])
      );
    });
  };

  /**
   * Clear our product dropdown and current product and set the new products and product.
   * @param {Product[]} products The new products.
   * @param {string} name The region name.
   */
  renderProducts = (products, name) => {
    this.clear(this.#products);
    this.clear(this.#product);

    this.#products.id = `products-${name}`;

    products.forEach(product => {
      const option = this.createElement('option', product.name);
      option.text = product.name;
      option.value = product.name;
      this.#products.append(option);
    });
  };

  /**
   * Clear the current product and render our selected product.
   */
  renderProduct = product => {
    this.clear(this.#product);

    this.#product.innerText = this.#products.value;
  };

  /**
   * Binds a 'click' event listener to our region menu items.
   * @param {Function} handler The callback handler in our controller.
   */
  bindRegionChange = handler => {
    this.#menu.forEach(child =>
      child.addEventListener('click', event => {
        this.sound.play();
        handler(child.id);
      })
    );
  };

  /**
   * Binds a 'change' event listener to our product dropdown.
   * @param {Function} handler The callback handler in our controller.
   */
  bindProductChange = handler => {
    this.#products.addEventListener('change', event => {
      this.sound.play();
      handler(event.target.value);
    });
  };
}
