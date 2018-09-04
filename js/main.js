"use strict";
/// <reference path="p5.global-mode.d.ts" />
var game;
var input;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    game = new Game();
    input = new Input();
}
function draw() {
    background(0);
    translate(-width / 2, -height / 2);
    input.update();
    game.update();
}
