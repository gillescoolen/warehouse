import { TileView } from '../view';
import { Region } from '../model';
import TileController from './TileController';

export default class RegionController {
  #view;
  #model;
  #regions = [];

  constructor(view) {
    this.#view = view;
    this.#regions = [
      new Region('clothes'),
      new Region('frills'),
      new Region('decoration')
    ];

    this.#model = this.#regions[0];

    this.#view.renderGrid(this.#model.tiles);
    this.#view.renderProducts(this.#model.products);

    this.#view.bindRegionChange(this._changeRegion);
    this.#view.bindProductChange(this._changeProduct);

    this.#view.renderProduct(this.#model.products[0]);

    this._bindTiles();
  }

  _changeRegion = name => {
    this.#model = this.#regions.find(region => region.name === name);

    this.#view.renderGrid(this.#model.tiles);
    this.#view.renderProducts(this.#model.products);

    this.#view.renderProduct(this.#model.products[0]);

    this._bindTiles();
  };

  _changeProduct = name => {
    const product = this.#model.products.find(product => product.name === name);

    this.#view.renderProduct(product);
  };

  _bindTiles = () =>
    this.#model.tiles.forEach(
      tile => new TileController(tile, new TileView(tile.name))
    );
}
