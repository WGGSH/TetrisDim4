"use strict";
var Vec4 = /** @class */ (function () {
    function Vec4(_a, _b, _c, _d) {
        if (_a == null) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
            return;
        }
        if (_a instanceof Vec4) {
            this.x = _a.x;
            this.y = _a.y;
            this.z = _a.z;
            this.w = _a.w;
            return;
        }
        this.x = _a;
        this.y = _b;
        this.z = _c;
        this.w = _d;
        return;
    }
    Vec4.prototype.set = function (_x, _y, _z, _w) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.w = _w;
    };
    return Vec4;
}());
