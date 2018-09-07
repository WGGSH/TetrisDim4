"use strict";
/// <reference path="p5.global-mode.d.ts" />
var game;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    Block.initialize();
    game = new Game();
}
function draw() {
    background(0);
    translate(-width / 2, -height / 2);
    Input.update();
    game.update();
}
