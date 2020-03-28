import View from './View';

export default class EditorView extends View {
  #modal;
  #editor;
  #custom;
  #warning;
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
  #saveButton;
  #closeButton;

  #observer;

  #inputs;

  constructor() {
    super();

    this.#loadForm();
    this.#bindSave();
    this.#bindClose();
    this.#setupCanvas();
    this.#bindImageUpload();
  }

  #loadForm = () => {
    this.#modal = this.getElement('.modal');
    this.#editor = this.getElement('#editor');
    this.#custom = this.getElement('#custom');
    this.#regionTitle = this.getElement('#regionTitle');
    this.#productTitle = this.getElement('#productTitle');

    this.#name = this.getElement('#editName');
    this.#description = this.getElement('#editDescription');
    this.#buyPrice = this.getElement('#editBuyPrice');
    this.#sellPrice = this.getElement('#editSellPrice');
    this.#minimumStored = this.getElement('#editMinimumStored');
    this.#currentStored = this.getElement('#editCurrentStored');

    this.#image = this.getElement('#editImage');
    this.#canvas = this.getElement('#editCanvas');

    this.#context = this.#canvas.getContext('2d');

    this.#saveButton = this.getElement('#save');
    this.#closeButton = this.getElement('#close');

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
    this.#image.addEventListener('change', event => this.#setImage(event));

  #bindSave = () =>
    this.#saveButton.addEventListener('click', event => this.#save());

  #bindClose = () =>
    this.#closeButton.addEventListener('click', event => this.#close());

  #save = () => {
    console.log(`Saving the formdata...`);

    this.#close();
  };

  #close = () => {
    this.container.classList.remove('blurred');
    this.#modal.style.display = 'none';
    this.#productTitle.innerText = '';
    this.#clearInputs();
    this.#clearCanvas();
  };

  #clearInputs = () => {
    for (const key in this.#inputs) {
      this.#inputs[key].value = '';
    }

    this.#image.value = null;

    this.clear(this.#custom);
  };

  #setImage = event => {
    const files = event.target.files;

    if (files && files[0]) {
      var background = new Image();
      background.src = URL.createObjectURL(files[0]);
      background.onload = () =>
        this.#context.drawImage(background, 0, 0, 200, 200);
    }
  };

  #setupCanvas = () => {
    let pressed = false;
    let lastX, lastY;

    const draw = (x, y, draw) => {
      if (draw) {
        this.#context.beginPath();
        this.#context.strokeStyle = 'black';
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

  #clearCanvas = () =>
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

  setupObserver = handler => {
    const config = { attributes: true, childList: true, characterData: true };

    this.#observer = new MutationObserver(mutations =>
      handler(this.#productTitle.innerText, this.#regionTitle.innerText)
    );

    this.#observer.observe(this.#productTitle, config);
  };

  fillForm = product => {
    // Fill default keys.
    for (const key in product) {
      if (this.#inputs.hasOwnProperty(key)) {
        this.#inputs[key].value = product[key];
      }
    }

    // Fill custom properties
    for (const key in product.customProperties) {
      const placeholder = key.charAt(0).toUpperCase() + key.slice(1);
      const input = this.createInput(key, 'text', placeholder);
      input.value = product.customProperties[key];
      this.#custom.append(input);
    }
  };
}
