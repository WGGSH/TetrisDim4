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
    Util.fieldMethod = function (_field, method) {
        for (var y = Puzzle.FIELD_INDEX_MIN; y < Puzzle.FIELD_HEIGHT_INDEX_MAX; y++) {
            for (var w = Puzzle.FIELD_INDEX_MIN; w < Puzzle.FIELD_WIDTH_INDEX_MAX; w++) {
                for (var z = Puzzle.FIELD_INDEX_MIN; z < Puzzle.FIELD_WIDTH_INDEX_MAX; z++) {
                    for (var x = Puzzle.FIELD_INDEX_MIN; x < Puzzle.FIELD_WIDTH_INDEX_MAX; x++) {
                        method(y, w, z, x);
                    }
                }
            }
        }
    };
    return Util;
}());
