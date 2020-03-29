import { WeatherView } from '../view';
import { Weather } from '../model';

export default class WeatherController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#changeCity();
    this.#view.renderCities(this.#model.cities);
    this.#view.bindCitiesChange(this.#changeCity);
  }

  #renderData = data => {
    this.#view.display(data);
  };

  #changeCity = (name = 'amsterdam') => {
    this.#model.fetchData(name, this.#renderData, this.#showError);
  };

  #showError = error => {
    this.#view.showError(error);
  };
}
