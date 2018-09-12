"use strict";
/// <reference path="p5.global-mode.d.ts" />
var game;
var canvas3D;
var canvas2D;
function setup() {
    // canvas2D = createCanvas(windowWidth, windowHeight);
    canvas3D = createCanvas(windowWidth, windowHeight, WEBGL);
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    Block.initialize();
    Resource.initialize();
    game = new Game();
}
function draw() {
    background(0);
    translate(-width / 2, -height / 2);
    Input.update();
    game.update();
}
