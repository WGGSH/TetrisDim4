"use strict";
var Vec3 = /** @class */ (function () {
    function Vec3(_a, _b, _c) {
        if (_a == null) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            return;
        }
        if (_a instanceof Vec3) {
            this.x = _a.x;
            this.y = _a.y;
            this.z = _a.z;
            return;
        }
        this.x = _a;
        this.y = _b;
        this.z = _c;
        return;
    }
    Vec3.prototype.set = function (_x, _y, _z) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    };
    Vec3.prototype.equal = function (vec) {
        return (this.x == vec.x && this.y == vec.y && this.z == vec.z);
    };
    return Vec3;
}());
