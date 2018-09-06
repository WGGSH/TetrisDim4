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
    return Vec2;
}());
