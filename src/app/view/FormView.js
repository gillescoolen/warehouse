import View from './View';

export default class ProductView extends View {
  #name;
  #description;
  #buyPrice;
  #sellPrice;
  #minimumStored;
  #currentStored;

  #tabs;
  #shown;
  #region;
  #warning;
  #selectedRegion;

  #regionalInputs;

  #frillsInputs;
  #clothesInputs;
  #decorationInputs;

  #nextButton;
  #previousButton;

  constructor() {
    super();

    this.#loadFormElements();

    this.#bindRegionChange();

    this.show(0);
  }

  #loadFormElements = () => {
    this.#name = this.getElement('#name');
    this.#description = this.getElement('#description');
    this.#buyPrice = this.getElement('#buyPrice');
    this.#sellPrice = this.getElement('#sellPrice');
    this.#minimumStored = this.getElement('#minimumStored');
    this.#currentStored = this.getElement('#currentStored');

    this.#nextButton = this.getElement('#next');
    this.#previousButton = this.getElement('#previous');

    this.#tabs = this.getMultipleElements('.tab');
    this.#warning = this.getElement('.warning');

    this.#region = this.getElement('#region');

    this.#frillsInputs = [this.createElement('input', 'weight', '', 'Gewicht')];

    this.#clothesInputs = [
      this.createElement('input', 'color', '', 'Kleur'),
      this.createElement('input', 'size', '', 'Maat')
    ];

    this.#decorationInputs = [
      this.createElement('input', 'size', '', 'Grootte in centimeters'),
      this.createElement('input', 'color', '', 'Kleur'),
      this.createElement('input', 'amount', '', 'Hoeveelheid per doos')
    ];

    this.#regionalInputs = {
      frills: this.#frillsInputs,
      clothes: this.#clothesInputs,
      decoration: this.#decorationInputs
    };
  };

  #next = handler => {
    this.#clearError();

    const children = [...this.#shown.children];

    const empty = children.find(
      c => c.localName === 'input' && c.value.trim().length === 0
    );

    if (empty) return this.#showError('Niet alle velden zijn ingevuld.');

    const product =
      this.#nextButton.innerText === 'Voeg toe' && this.#collectValues();

    handler(product, this.#selectedRegion);
  };

  #previous = handler => {
    handler();
  };

  #showError = message => (this.#warning.innerText = message);

  #clearError = () => (this.#warning.innerText = '');

  #showRegionalProperties = region => {
    this.#selectedRegion = region;
    const tab = this.#tabs[this.#tabs.length - 1];

    this.clear(tab);

    const inputs = this.#regionalInputs[this.#selectedRegion];

    inputs.forEach(input => {
      tab.append(input);
    });
  };

  #regionalValues = () => {
    const values = {};

    this.#regionalInputs[this.#selectedRegion].forEach(
      input => (values[input.id] = input.value)
    );

    return values;
  };

  #collectValues = () => {
    return {
      name: this.#name.value,
      description: this.#description.value,
      buyPrice: this.#buyPrice.value,
      sellPrice: this.#sellPrice.value,
      minimumStored: this.#minimumStored.value,
      currentStored: this.#currentStored.value,
      customProperties: this.#regionalValues()
    };
  };

  #clearValues = () => {
    this.#name.value = '';
    this.#description.value = '';
    this.#buyPrice.value = '';
    this.#sellPrice.value = '';
    this.#minimumStored.value = '';
    this.#currentStored.value = '';
  };

  show = tab => {
    this.#tabs.forEach(tab => (tab.style.display = 'none'));

    this.#nextButton.innerHTML =
      tab + 1 === this.#tabs.length ? 'Voeg toe' : 'Volgende';

    tab === 0
      ? this.#previousButton.setAttribute('disabled', true)
      : this.#previousButton.removeAttribute('disabled');

    this.#shown = this.#tabs[tab];
    this.#shown.style.display = 'flex';
  };

  updateProductSelect = product => {
    var option = this.createElement('option', product.name);
    option.text = product.name;
    option.value = product.name;
    this.getElement('#products').append(option);
  };

  resetForm = () => {
    this.show(0);
    this.#clearValues();
  };

  bindPagination = (next, previous) => {
    this.#nextButton.addEventListener('click', event => this.#next(next));
    this.#previousButton.addEventListener('click', event =>
      this.#previous(previous)
    );
  };

  #bindRegionChange = () =>
    this.#region.addEventListener('change', event =>
      this.#showRegionalProperties(event.target.value)
    );
}
