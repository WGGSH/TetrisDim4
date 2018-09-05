/// <reference path="p5.global-mode.d.ts" />

var game: Game;
var input: Input;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  game = new Game();
  input = new Input();
}

function draw(): void{
  background(0);
  translate(-width / 2, -height / 2);
  Input.update();
  game.update();
}
