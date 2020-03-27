import View from './View';

export default class ProductView extends View {
  #product;

  constructor() {
    super();

    this.#product = this.getElement('#product');

    this.bindOnDragStart();
  }

  /**
   * Sets the product data whenever the user drags our product.
   */
  bindOnDragStart = () => {
    this.#product.addEventListener('dragstart', event => {
      event.dataTransfer.setData(
        'product',
        JSON.stringify({ name: this.#product.innerText })
      );
    });
  };
}
