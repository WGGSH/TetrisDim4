"use strict";
/// <reference path="p5.global-mode.d.ts" />
function setup() {
    createCanvas(600, 600);
}
function draw() {
    background(frameCount++ % 255);
}
