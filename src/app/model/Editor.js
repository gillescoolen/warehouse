/**
 * The model that stores our editor data.
 * @typedef {Object} Editor
 */

import Model from './Model';

export default class Editor extends Model {
  constructor() {
    super();
  }

  loadProduct = (productName, regionName) => {
    const products = this.load(`${regionName}-products`);

    return products.find(product => product.name === productName);
  };
}
