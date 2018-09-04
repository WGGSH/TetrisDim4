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
    return Util;
}());
