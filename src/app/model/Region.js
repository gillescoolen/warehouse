/**
 * A tile which can be occupied by a product or hazard.
 * @typedef {Object} Region
 * @property {string} name The grid (section) name.;
 * @property {Tile[]} tiles Every tile inside of the section.;
 */

import { Tile } from '.';

export default class Region {
  #name = '';
  #tiles = [];

  constructor(name) {
    this.#name = name;

    this._generate();
  }

  set name(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set tiles(tiles) {
    this.#tiles = tiles;
  }

  get tiles() {
    return this.#tiles;
  }

  _generate = () => {
    for (let i = 0; i < 225; i++) {
      this._addTile(new Tile(`tile-${i}`, this._isHazard(i)));
    }
  };

  _addTile = tile => this.tiles.push(tile);

  _isHazard = index =>
    index % this.#name.length === 0 ? { name: 'hazard' } : null;
}
