import { TileView } from '../view';
import { Region } from '../model';
import TileController from './TileController';

export default class RegionController {
  #view;
  #model;
  #regions;

  constructor(view) {
    this.#view = view;

    this.#regions = [
      new Region('clothes'),
      new Region('frills'),
      new Region('decoration')
    ];

    this.#model = this.#regions[0];

    this.#view.bindRegionChange(this.#changeRegion);
    this.#view.bindProductChange(this.#changeProduct);

    this.#changeRegion(this.#model.name);
  }

  /**
   * Change the region and rerender the grid, products and current product.
   * @param {string} name The region name.
   */
  #changeRegion = name => {
    this.#model = this.#regions.find(region => region.name === name);
    this.#model.refreshProducts();
    this.#view.renderGrid(this.#model.tiles);
    this.#view.renderProducts(this.#model.products, this.#model.name);
    this.#view.renderProduct(this.#model.products[0]);

    this.#bindTiles();
  };

  /**
   * Change the selected product and let the view render it.
   * @param {string} name The product name.
   */
  #changeProduct = name => {
    const product = this.#model.products.find(product => product.name === name);

    this.#view.renderProduct(product);
  };

  /**
   * Bind a TileController and TileView to our tiles.
   */
  #bindTiles = () =>
    this.#model.tiles.forEach(
      tile => new TileController(tile, new TileView(tile))
    );
}
