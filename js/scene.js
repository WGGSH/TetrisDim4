"use strict";
var Scene = /** @class */ (function () {
    function Scene(_game) {
        this.game = _game;
    }
    Scene.prototype.initialize = function () {
    };
    Scene.prototype.update = function () {
    };
    Scene.prototype.draw = function () {
    };
    Scene.prototype.draw2D = function () {
    };
    Scene.prototype.draw3D = function () {
    };
    return Scene;
}());
var SCENE;
(function (SCENE) {
    SCENE[SCENE["TITLE"] = 0] = "TITLE";
    SCENE[SCENE["PUZZLE"] = 1] = "PUZZLE";
})(SCENE || (SCENE = {}));
var SCENE_NUM = 2;
