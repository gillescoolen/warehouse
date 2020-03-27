/**
 * A product which we store in our warehouse.
 * @typedef {Object} Product
 * @property {string} name The product name.
 * @property {string} description The product description.
 * @property {Region} region The region the product belongs to.
 * @property {number} buyPrice The price we buy the product for.
 * @property {number} sellPrice The price we buy the product for.
 * @property {number} minimumStored The minimum amount of the product we are allowed to have.
 * @property {number} currentStored The current amount of the product we have stored right now.
 * @property {Object} customProperties Custom properties like weight, size and color.
 */

export default class Product {
  #name = '';
  #description = '';
  #buyPrice = 0;
  #sellPrice = 0;
  #minimumStored = 0;
  #currentStored = 0;
  #customProperties;

  constructor(properties) {
    Object.assign(this, properties);
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    this.#description = description;
  }

  get buyPrice() {
    return this.#buyPrice;
  }

  set buyPrice(buyPrice) {
    this.#buyPrice = buyPrice;
  }

  get buyPriceWithTax() {
    return this.#buyPrice * 1.21;
  }

  get sellPrice() {
    return this.#name;
  }

  set sellPrice(sellPrice) {
    this.#sellPrice = sellPrice;
  }

  get sellPriceWithTax() {
    return this.#sellPrice * 1.21;
  }

  get minimumStored() {
    return this.#minimumStored;
  }

  set minimumStored(minimumStored) {
    this.#minimumStored = minimumStored;
  }

  get currentStored() {
    return this.#currentStored;
  }

  set currentStored(currentStored) {
    this.#currentStored = currentStored;
  }

  get customProperties() {
    return this.#customProperties;
  }

  set customProperties(customProperties) {
    this.#customProperties = customProperties;
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      buyPrice: this.#buyPrice,
      sellPrice: this.#sellPrice,
      minimumStored: this.#minimumStored,
      currentStored: this.#currentStored,
      customProperties: this.#customProperties
    };
  }
}
