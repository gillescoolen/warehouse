/**
 * The model that stores our editor data.
 * @typedef {Object} Editor
 */

import Model from './Model';

export default class Editor extends Model {
  constructor() {
    super();
  }

  loadProduct = (tileName, regionName) => {
    const tiles = this.load(`${regionName}-tiles`);

    const tile = tiles.find(tile => tile.name === tileName);

    return tile.occupant;
  };

  saveProduct = (product, region, tileName) => {
    const tiles = this.load(`${region}-tiles`);

    tiles.forEach(tile => {
      if (tile.name === tileName) tile.occupant = product;
    });

    this.save(`${region}-tiles`, tiles);
  };
}
