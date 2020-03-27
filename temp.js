let mousePressed = false;
let lastX, lastY;

const canvas = $canvasWrapper.lastChild;
const context = canvas.getContext('2d');

const draw = (x, y, isDown) => {
  if (isDown) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
  }

  lastX = x;
  lastY = y;
};

canvas.onmousedown = e => {
  mousePressed = true;
  const rect = canvas.getBoundingClientRect();
  draw(e.clientX - rect.left, e.clientY - rect.top, false);
};

canvas.onmousemove = e => {
  if (mousePressed) {
    const rect = canvas.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top, true);
  }
};

canvas.onmouseup = () => {
  mousePressed = false;
};

canvas.mouseleave = () => {
  mousePressed = false;
};
