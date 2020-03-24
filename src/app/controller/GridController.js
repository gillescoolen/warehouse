import { Tile } from '../model';
import { TileView } from '../view';
import TileController from './TileController';

export default class GridController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    view.render(model.tiles);
    this.loadTiles(model.tiles);
  }

  loadTiles(tiles) {
    tiles.forEach(tile => new TileController(tile, new TileView()));
  }
}
