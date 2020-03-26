import View from './View';

export default class ProductView extends View {
  #product;

  constructor() {
    super();

    this.#product = this.getElement('#product');

    this.bindOnDragStart();
  }

  bindOnDragStart = () => {
    this.#product.addEventListener('dragstart', event => {
      event.dataTransfer.setData(
        'product',
        JSON.stringify({ name: this.#product.innerText })
      );
    });
  };

  #setText = text => {
    this.#product.innerText = text;
  };
}
