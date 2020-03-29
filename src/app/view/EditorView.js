import View from './View';

export default class EditorView extends View {
  #modal;
  #custom;
  #warning;
  #tileTitle;
  #regionTitle;
  #productTitle;

  #name;
  #description;
  #buyPrice;
  #sellPrice;
  #minimumStored;
  #currentStored;

  #image;
  #canvas;
  #context;
  #addButton;
  #saveButton;
  #closeButton;
  #removeButton;
  #customProperty;

  #observer;

  #inputs;

  constructor() {
    super();

    this.#loadForm();

    this.#bindAdd();
    this.#bindClose();
    this.#setupCanvas();
    this.#bindImageUpload();
    this.#bindInputValidation();
  }

  /**
   * Maps all our elements.
   */
  #loadForm = () => {
    this.#modal = this.getElement('.modal');
    this.#custom = this.getElement('#custom');
    this.#tileTitle = this.getElement('#tileTitle');
    this.#regionTitle = this.getElement('#regionTitle');
    this.#productTitle = this.getElement('#productTitle');

    this.#name = this.getElement('#editName');
    this.#description = this.getElement('#editDescription');
    this.#buyPrice = this.getElement('#editBuyPrice');
    this.#sellPrice = this.getElement('#editSellPrice');
    this.#minimumStored = this.getElement('#editMinimumStored');
    this.#currentStored = this.getElement('#editCurrentStored');

    this.#customProperty = this.getElement('#customProperty');

    this.#image = this.getElement('#editImage');
    this.#canvas = this.getElement('#editCanvas');
    this.#warning = this.getElement('#editWarning');

    this.#context = this.#canvas.getContext('2d');

    this.#saveButton = this.getElement('#save');
    this.#closeButton = this.getElement('#close');
    this.#removeButton = this.getElement('#remove');
    this.#addButton = this.getElement('#addCustomProperty');

    this.#inputs = {
      name: this.#name,
      description: this.#description,
      buyPrice: this.#buyPrice,
      sellPrice: this.#sellPrice,
      minimumStored: this.#minimumStored,
      currentStored: this.#currentStored
    };
  };

  #bindImageUpload = () =>
    this.#image.addEventListener('change', event =>
      this.#setImageFromFile(event.target.files)
    );

  #bindInputValidation = () => {
    this.#customProperty.addEventListener('paste', event =>
      event.preventDefault()
    );

    this.#customProperty.addEventListener(
      'keydown',
      event => !/[a-zA-Z]/g.test(event.key) && event.preventDefault()
    );
  };

  #bindAdd = () =>
    this.#addButton.addEventListener('click', event => this.#addProperty());

  #bindClose = () =>
    this.#closeButton.addEventListener('click', event => this.#close());

  /**
   * Calls the controller to save the product.
   */
  #save = handler => {
    this.#saveForm(handler);
  };

  /**
   * Closes the editor and clears all values.
   */
  #close = () => {
    this.container.classList.remove('blurred');
    this.#modal.style.display = 'none';
    this.#productTitle.innerText = '';
    this.#regionTitle.innerText = '';
    this.#tileTitle.innerText = '';

    this.#clearInputs();
    this.#clearCanvas();
  };

  #remove = handler => {
    console.log(this.#tileTitle);

    const square = this.getElement(`#${this.#tileTitle.innerText}`);
    this.removeClass(square, 'product');
    this.addClass(square, 'open');
    handler(this.#regionTitle.innerText, this.#tileTitle.innerText);
    this.#close();
  };

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
   * Adds a property to the product's customProperties
   */
  #addProperty = () => {
    const value = this.#customProperty.value;
    if (!value) return this.#showError('Voer een geldige naam in.');

    this.#clearError();

    const input = this.createInput(value, 'text', value);

    this.#custom.append(input);
    this.#customProperty.value = '';
  };

  /**
   * Saves the values to the product.
   * @param {Function} handler The callback handler.
   */
  #saveForm = handler => {
    const product = {};
    const customProperties = {};

    // Map the default input values.
    for (const key in this.#inputs) {
      product[key] = this.#inputs[key].value;
    }

    // Get the customProperties values.
    [...this.#custom.children].forEach(c => (customProperties[c.id] = c.value));

    // Assign the customProperties to the product.
    product.customProperties = customProperties;

    // Save the canvas.
    product.image = this.#canvas.toDataURL();

    handler(product, this.#regionTitle.innerText, this.#tileTitle.innerText);
  };

  /**
   * Clears all form inputs.
   */
  #clearInputs = () => {
    for (const key in this.#inputs) {
      this.#inputs[key].value = '';
    }

    this.#image.value = null;

    this.clear(this.#custom);
  };

  /**
   * Loads image the file input and sets it as the canvas image.
   * @param {File[]} files The files selected with the file input field.
   */
  #setImageFromFile = files => {
    if (!files && !files[0]) return;

    if (files[0].size > 300000) return this.#removeImage();

    this.#clearError();

    this.#setImage(URL.createObjectURL(files[0]));
  };

  /**
   * Sets the canvas image.
   * @param {string} url The image url.
   */
  #setImage = url => {
    const background = new Image();
    background.src = url;
    background.onload = () =>
      this.#context.drawImage(background, 0, 0, 200, 200);
  };

  /**
   * Removes the image from the file input.
   */
  #removeImage = () => {
    this.#showError('Het bestand is te groot.');
    this.#image.value = null;
  };

  /**
   * Allows the user to draw on the canvas.
   */
  #setupCanvas = () => {
    let pressed = false;
    let lastX, lastY;

    const draw = (x, y, draw) => {
      if (draw) {
        this.#context.beginPath();
        this.#context.strokeStyle = 'red';
        this.#context.lineWidth = 2;
        this.#context.lineJoin = 'round';
        this.#context.moveTo(lastX, lastY);
        this.#context.lineTo(x, y);
        this.#context.closePath();
        this.#context.stroke();
      }

      lastX = x;
      lastY = y;
    };

    this.#canvas.onmousedown = event => {
      pressed = true;
      const rect = this.#canvas.getBoundingClientRect();
      draw(event.clientX - rect.left, event.clientY - rect.top, false);
    };

    this.#canvas.onmousemove = event => {
      if (!pressed) return;
      const rect = this.#canvas.getBoundingClientRect();
      draw(event.clientX - rect.left, event.clientY - rect.top, true);
    };

    this.#canvas.onmouseup = () => (pressed = false);
    this.#canvas.mouseleave = () => (pressed = false);
  };

  /**
   * Clears the canvas.
   */
  #clearCanvas = () =>
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

  /**
   * Configures our observer to observe the product and region titles.
   * @param {Function} handler Callback to the controller.
   */
  setupObserver = handler => {
    const config = { attributes: true, childList: true, characterData: true };

    this.#observer = new MutationObserver(mutations =>
      handler(this.#tileTitle.innerText, this.#regionTitle.innerText)
    );

    this.#observer.observe(this.#productTitle, config);
  };

  bindSave = handler =>
    this.#saveButton.addEventListener('click', event => this.#save(handler));

  bindRemove = handler =>
    this.#removeButton.addEventListener('click', event =>
      this.#remove(handler)
    );

  /**
   * Fills the product values in our form.
   * @param {Product} product The product bound to the current tile.
   */
  fillForm = product => {
    // Fill default keys.
    for (const key in product) {
      if (this.#inputs.hasOwnProperty(key))
        this.#inputs[key].value = product[key];
    }

    // Fill custom properties
    for (const key in product.customProperties) {
      const placeholder = key.charAt(0).toUpperCase() + key.slice(1);
      const input = this.createInput(key, 'text', placeholder);
      input.value = product.customProperties[key];
      this.#custom.append(input);
    }

    this.#setImage(product.image);
  };
}
