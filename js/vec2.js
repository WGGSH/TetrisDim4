"use strict";
var Vec2 = /** @class */ (function () {
    function Vec2(_a, _b) {
        if (_a == null) {
            this.x = 0;
            this.y = 0;
            return;
        }
        if (_a instanceof Vec2) {
            this.x = _a.x;
            this.y = _a.y;
            return;
        }
        this.x = _a;
        this.y = _b;
        return;
    }
    Vec2.prototype.set = function (_x, _y) {
        this.x = _x;
        this.y = _y;
    };
    Vec2.prototype.distance = function (vec) {
        return sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y));
    };
    return Vec2;
}());
