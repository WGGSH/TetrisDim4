"use strict";
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.screenWidth = function (scale) {
        return windowWidth * scale;
    };
    Util.screenHeight = function (scale) {
        return windowHeight * scale;
    };
    Util.for = function (min, max, method) {
        for (var i = min; i < max; i++) {
            method(i);
        }
    };
    return Util;
}());
