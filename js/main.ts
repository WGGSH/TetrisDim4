/// <reference path="p5.global-mode.d.ts" />

var game: Game;
var canvas3D: p5;
var canvas2D: p5;
function setup() {
  // canvas2D = createCanvas(windowWidth, windowHeight);
  canvas3D = createCanvas(windowWidth, windowHeight, WEBGL);

  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  Block.initialize();

  game = new Game();
}

function draw(): void{
  background(0);
  translate(-width / 2, -height / 2);
  Input.update();
  game.update();
}
