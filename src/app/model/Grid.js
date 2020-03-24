import Tile from './Tile';
import { TileController } from '../controller';
import { TileView } from '../view';

/**
 * A tile which can be occupied by a product or hazard.
 * @typedef {Object} Grid
 * @property {Tile[]} tiles Every tile inside of the section.;
 */

export default class Grid {
  #tiles = [];

  constructor() {
    // Mock grid data for now.
    for (let i = 0; i < 225; i++) {
      this.addTile(i);
    }
  }

  set tiles(tiles) {
    this.#tiles = tiles;
  }

  get tiles() {
    return this.#tiles;
  }

  addTile(tile) {
    this.tiles.push(tile);
  }
}
