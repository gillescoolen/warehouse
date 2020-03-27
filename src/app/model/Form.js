/**
 * The model that stores our form data.
 * @typedef {Class} Form
 * @property {number} page The form step page.
 */

import Model from './Model';

export default class Form extends Model {
  #page = 0;

  constructor() {
    super();
  }

  next = () => this.#page++;
  previous = () => this.#page--;

  /**
   * Saves the product to localStorage.
   * @param {Product} product The product we need to save.
   * @param {string} region The region name.
   */
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
