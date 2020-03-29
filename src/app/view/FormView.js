import View from './View';

export default class ProductView extends View {
  #name;
  #description;
  #buyPrice;
  #sellPrice;
  #minimumStored;
  #currentStored;

  #tabs;
  #currentTab;
  #regionSelect;
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

    this.#bindFormValidation();

    this.show(0);
  }

  /**
   * Load our form elements.
   */
  #loadFormElements = () => {
    this.#name = this.getElement('#name');
    this.#description = this.getElement('#description');
    this.#buyPrice = this.getElement('#buyPrice');
    this.#sellPrice = this.getElement('#sellPrice');
    this.#minimumStored = this.getElement('#minimumStored');
    this.#currentStored = this.getElement('#currentStored');

    this.#nextButton = this.getElement('#next');
    this.#previousButton = this.getElement('#previous');

    this.#warning = this.getElement('#warning');
    this.#tabs = this.getMultipleElements('.tab');

    this.#regionSelect = this.getElement('#region');

    this.#frillsInputs = [this.createInput('weight', 'number', 'Gewicht')];

    this.#clothesInputs = [
      this.createInput('color', 'text', 'Kleur'),
      this.createInput('size', 'text', 'Maat')
    ];

    this.#decorationInputs = [
      this.createInput('size', 'number', 'Grootte in centimeters'),
      this.createInput('color', 'text', 'Kleur'),
      this.createInput('amount', 'number', 'Hoeveelheid per doos')
    ];

    this.#regionalInputs = {
      frills: this.#frillsInputs,
      clothes: this.#clothesInputs,
      decoration: this.#decorationInputs
    };
  };

  #bindFormValidation = () => {
    const inputs = this.getMultipleElements('#wizard');

    [...inputs].forEach(input => {
      input.addEventListener('paste', event => event.preventDefault());

      input.addEventListener(
        'keydown',
        event => !/[a-zA-Z0-9 ]/g.test(event.key) && event.preventDefault()
      );
    });
  };

  /**
   * Navigates to the next page.
   * @param {Function} handler Callback to the controller to handle navigation.
   */
  #next = handler => {
    this.#clearError();

    // Spread the children nodelist to an array.
    const children = [...this.#currentTab.children];

    // Validate the inputs.
    const empty = children.find(
      c => c.localName === 'input' && c.value.trim().length === 0
    );

    // Show error when an input is empty.
    if (empty)
      return this.#showError('Niet alle velden zijn correct ingevuld.');

    // Fetch product data when they button is used to add.
    const product =
      this.#nextButton.innerText === 'Voeg toe' && this.#collectValues();

    handler(product, this.#selectedRegion);
  };

  /**
   * Navigates to the previous tab.
   * @param {Function} handler Callback to the controller to handle navigation.
   */
  #previous = handler => handler();

  /**
   * Shows an error.
   * @param {string} message The error message.
   */
  #showError = message => (this.#warning.innerText = message);

  /**
   * Clears the error.
   */
  #clearError = () => (this.#warning.innerText = '');

  /**
   * Shows the regional properties for the selected region.
   * @param {string} region The selected region.
   */
  #showRegionalProperties = region => {
    this.#selectedRegion = region;

    // Get the last tab.
    const tab = this.#tabs[this.#tabs.length - 1];

    // Clear the current tab.
    [...tab.children].forEach(child => {
      child.localName === 'input' && tab.removeChild(child);
    });

    // Enable the next button.
    this.#nextButton.removeAttribute('disabled');

    // Load the regional inputs.
    const inputs = this.#regionalInputs[this.#selectedRegion];
    inputs.forEach(input => tab.append(input));
  };

  /**
   * Collects the values from our regional inputs.
   */
  #collectRegionalValues = () => {
    const values = {};

    this.#regionalInputs[this.#selectedRegion].forEach(
      input => (values[input.id] = input.value)
    );

    return values;
  };

  /**
   * Collects the values from our form.
   */
  #collectValues = () => {
    return {
      name: this.#name.value,
      description: this.#description.value,
      buyPrice: this.#buyPrice.value,
      sellPrice: this.#sellPrice.value,
      minimumStored: this.#minimumStored.value,
      currentStored: this.#currentStored.value,
      customProperties: this.#collectRegionalValues()
    };
  };

  /**
   * Clears all form values.
   */
  #clearValues = () => {
    this.#name.value = '';
    this.#description.value = '';
    this.#buyPrice.value = '';
    this.#sellPrice.value = '';
    this.#minimumStored.value = '';
    this.#currentStored.value = '';
  };

  /**
   * Hides the old page and shows the new page.
   * @param {number} page The current page.
   */
  show = page => {
    this.#tabs.forEach(tab => (tab.style.display = 'none'));

    // Disable the next button on the last page.
    if (page + 1 === this.#tabs.length) {
      this.#nextButton.innerHTML = 'Voeg toe';
      this.#nextButton.setAttribute('disabled', true);
    } else {
      this.#nextButton.innerHTML = 'Volgende';
      this.#nextButton.removeAttribute('disabled');
    }

    // Disable the previous button on the first page.
    page === 0
      ? this.#previousButton.setAttribute('disabled', true)
      : this.#previousButton.removeAttribute('disabled');

    this.#currentTab = this.#tabs[page];
    this.#currentTab.style.display = 'flex';
  };

  /**
   * Updates the product select dropdown with our new product.
   * @param {Product} product The newly created product.
   * @param {string} region The region the product is belongs to.
   */
  updateProductSelect = (product, region) => {
    const select = this.getElement(`#products-${region}`);

    if (!select) return;

    const option = this.createElement('option', product.name);
    option.text = product.name;
    option.value = product.name;
    select.append(option);
  };

  /**
   * Resets the form to the first page and clears all values.
   */
  resetForm = () => {
    this.show(0);
    this.#selectedRegion = null;
    this.#regionSelect.selected = 'default';
    this.#clearValues();
  };

  /**
   * Binds click events to our next and previous buttons.
   */
  bindPagination = (next, previous) => {
    this.#nextButton.addEventListener('click', event => this.#next(next));
    this.#previousButton.addEventListener('click', event =>
      this.#previous(previous)
    );
  };

  /**
   * Binds a 'change' event listener to our region dropdown.
   */
  #bindRegionChange = () =>
    this.#regionSelect.addEventListener('change', event =>
      this.#showRegionalProperties(event.target.value)
    );
}
