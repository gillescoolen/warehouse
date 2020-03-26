/**
 * A product which we store in our warehouse.
 * @typedef {Object} Product
 * @property {string} name The product name.
 * @property {string} description The product description.
 * @property {Region} region The region the product belongs to.
 * @property {number} buyPrice The price we buy the product for.
 * @property {number} buyPriceWithTax The price we buy the product for with tax.
 * @property {number} sellPrice The price we buy the product for.
 * @property {number} sellPriceWithTax The price we buy the product for with tax.
 * @property {number} minimumAmountStored The minimum amount of the product we are allowed to have.
 * @property {number} currentAmountStored The current amount of the product we have stored right now.
 * @property {Object} customProperties Custom properties like weight, size and color.
 */

export default class Product {
  #name = '';
  #description = '';
  #buyPrice;
  #buyPriceWithTax;
  #sellPrice;
  #sellPriceWithTax;
  #minimumAmountStored;
  #currentAmountStored;
  #customProperties = {};

  constructor(properties) {
    Object.assign(this, properties);
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      buyPrice: this.#buyPrice,
      buyPriceWithTax: this.#buyPriceWithTax,
      sellPrice: this.#sellPrice,
      sellPriceWithTax: this.#sellPriceWithTax,
      minimumAmountStored: this.#minimumAmountStored,
      currentAmountStored: this.#currentAmountStored,
      customProperties: this.#customProperties
    };
  }
}