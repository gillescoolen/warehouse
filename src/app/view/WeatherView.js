import View from './View';

export default class WeatherView extends View {
  #city;
  #temp;
  #cities;
  #warning;

  constructor() {
    super();

    this.#city = this.getElement('#city');
    this.#temp = this.getElement('#temp');
    this.#cities = this.getElement('#cities');
    this.#warning = this.getElement('#weatherWarning');
  }

  display = data => {
    this.#clearError();
    this.#city.innerText = data.name;
    this.#temp.innerText = data.main.temp + ' graden';
  };

  showError = message => (this.#warning.innerText = message);

  #clearError = () => (this.#warning.innerText = '');

  renderCities = cities => {
    this.clear(this.#cities);

    cities.forEach(city => {
      const option = this.createElement('option', city);
      option.text = city;
      option.value = city;
      this.#cities.append(option);
    });
  };

  bindCitiesChange = handler => {
    this.#cities.addEventListener('click', event => {
      handler(this.#cities.value);
    });
  };
}
