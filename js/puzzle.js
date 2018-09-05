"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Puzzle = /** @class */ (function (_super) {
    __extends(Puzzle, _super);
    function Puzzle(_game) {
        return _super.call(this, _game) || this;
    }
    Puzzle.prototype.initialize = function () {
    };
    Puzzle.prototype.update = function () {
    };
    Puzzle.prototype.draw = function () {
        background(255, 255, 255);
    };
    return Puzzle;
}(Scene));
