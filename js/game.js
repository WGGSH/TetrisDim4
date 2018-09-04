"use strict";
/// <reference path="p5.global-mode.d.ts" />
var Game = /** @class */ (function () {
    function Game() {
        this.sceneList = new Array(1);
        this.sceneList[0] = new Title(this);
        this.currentScene = 0;
        this.sceneList[this.currentScene].initialize();
    }
    Game.prototype.update = function () {
        background(0);
        this.sceneList[this.currentScene].update();
        this.sceneList[this.currentScene].draw();
    };
    return Game;
}());
