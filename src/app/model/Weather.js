import Model from './Model';

export default class Weather extends Model {
  #test;
  #cities = ['Amsterdam', 'Eindhoven', 'Weert', 'Sneek', 'Heerenveen'];

  constructor() {
    super();
  }

  fetchData = async (input = 'amsterdam', handler, error) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=8d8172502a2569a7360a64e94889071f`
      );

      const data = await response.json();

      handler(data);
    } catch (e) {
      error('Er ging iets mis!');
      //TODO: Call view to display error.
    }
  };

  get cities() {
    return this.#cities;
  }
}
