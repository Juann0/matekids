const canvas = document.getElementById('binary-canvas');
const ctx = canvas.getContext('2d');
let raf;

// Ajuste del tamaño del canvas al tamaño de la ventana del navegador
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.font = '25px Arial';

const fontSize = 50;
const columns = Math.floor(canvas.width / fontSize);
const rows = Math.floor(canvas.height / fontSize);

// Define colores para cada número
const numberColors = ['#FF0000', '#00FF00', '#04048c', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000'];

const bits = [];
const bitHeight = fontSize;
const bitWidth = fontSize;

// Calcular la posición inicial para centrar el canvas
const startX = (canvas.width - columns * bitWidth) / 2;
const startY = (canvas.height - rows * bitHeight) / 2;

// Populate array of 'bits' con números del 1 al 9
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
        bits.push({
            x: startX + c * bitWidth,
            y: startY + r * bitHeight,
            value: String(Math.floor(Math.random() * 9) + 1), // Escoger un número del 1 al 9 aleatoriamente
            color: numberColors[Math.floor(Math.random() * numberColors.length)], // Escoger un color aleatorio para cada número
            hasDrawn: false
        });
    }
}

// Vars for manually calculating frame rate
const fps = 10;
const interval = 1000 / fps;
let now;
let then = Date.now();
let delta;

// Draw all bits once before starting animation
for (let bit of bits) {
    ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
    ctx.fillStyle = bit.color; // Establecer el color antes de dibujar cada número
    ctx.fillText(bit.value, bit.x, bit.y + bitHeight);
    bit.hasDrawn = true;
}

function draw() {
    raf = window.requestAnimationFrame(draw);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        for (let bit of bits) {
            if (bit.hasDrawn === true && (Math.random() * 100) > 95) { // If passes the randomness check
                let newVal = String((parseInt(bit.value) % 9) + 1); // Incrementar el valor actual del bit (cíclico entre 1 y 9)

                ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
                ctx.fillStyle = bit.color; // Establecer el color antes de dibujar el nuevo número
                ctx.fillText(newVal, bit.x, bit.y + bitHeight);
                bit.value = newVal;
            }
        }
        then = now - (delta % interval);
    }
}

draw();
