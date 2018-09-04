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
var Title = /** @class */ (function (_super) {
    __extends(Title, _super);
    function Title(_game) {
        return _super.call(this, _game) || this;
    }
    Title.prototype.initialize = function () {
    };
    Title.prototype.update = function () {
    };
    Title.prototype.draw = function () {
        fill(255);
        if (input.MousePress) {
            triangle(input.MousePos.x, input.MousePos.y, Util.screenWidth(0.5), Util.screenHeight(0.5), Util.screenWidth(0.75), Util.screenHeight(0.75));
        }
    };
    return Title;
}(Scene));
