import { TileView } from '../view';
import { Region } from '../model';
import TileController from './TileController';

export default class RegionController {
  #view;
  #model;
  #regions = [];

  #clothes;
  #frills;
  #decoration;

  constructor(view) {
    this.#view = view;
    this.#clothes = new Region('clothes');
    this.#frills = new Region('frills');
    this.#decoration = new Region('decoration');

    this.#regions = [this.#clothes, this.#frills, this.#decoration];

    this.#model = this.#clothes;

    this.#view.renderGrid(this.#model.tiles);
    this.#view.bindRegionChange(this.changeRegion);

    this.loadTiles();
  }

  changeRegion = name => {
    this.#model = this.#regions.find(region => region.name === name);

    this.loadTiles();
    this.#view.renderGrid(this.#model.tiles);
  };

  loadTiles = () =>
    this.#model.tiles.forEach(
      tile => new TileController(tile, new TileView(tile.name))
    );
}
