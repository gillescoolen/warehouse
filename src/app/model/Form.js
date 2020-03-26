/**
 *
 * @typedef {Object} Form
 */

export default class Form {
  #page = 0;

  constructor() {}

  next = () => this.#page++;
  previous = () => this.#page--;

  set page(page) {
    this.#page = page;
  }

  get page() {
    return this.#page;
  }
}
