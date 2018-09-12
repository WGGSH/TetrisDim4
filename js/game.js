"use strict";
/// <reference path="p5.global-mode.d.ts" />
var Game = /** @class */ (function () {
    function Game() {
        this.sceneList = new Array(SCENE_NUM);
        this.sceneList[SCENE.TITLE] = new Title(this);
        this.sceneList[SCENE.PUZZLE] = new Puzzle(this);
        this.currentScene = SCENE.TITLE;
        this.nextScene = this.currentScene;
        this.sceneList[this.currentScene].initialize();
    }
    Game.prototype.update = function () {
        background(0);
        this.sceneList[this.currentScene].update();
        // this.sceneList[this.currentScene].draw();
        push();
        this.sceneList[this.currentScene].draw2D();
        pop();
        push();
        this.sceneList[this.currentScene].draw3D();
        pop();
        // シーンが変更されるなら，次のシーンを初期化する
        if (this.nextScene != this.currentScene) {
            this.currentScene = this.nextScene;
            this.sceneList[this.currentScene].initialize();
        }
    };
    Game.prototype.changeScene = function (_scene) {
        this.nextScene = _scene;
    };
    return Game;
}());
