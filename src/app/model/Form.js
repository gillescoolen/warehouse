/**
 * The model that stores our form data.
 * @typedef {Object} Form
 */

import Model from './Model';

export default class Form extends Model {
  #page = 0;

  constructor() {
    super();
  }

  next = () => this.#page++;
  previous = () => this.#page--;

  addProduct = (product, region) => {
    const products = this.load(`${region}-products`);

    products.push(product);

    this.save(`${region}-products`, products);
  };

  set page(page) {
    this.#page = page;
  }

  get page() {
    return this.#page;
  }
}
