"use strict";
var Axis4 = /** @class */ (function () {
    function Axis4(_a, _b, _c, _d, _e, _f) {
        if (_a == null) {
            this.xy = 0;
            this.xz = 0;
            this.xw = 0;
            this.yz = 0;
            this.yw = 0;
            this.zw = 0;
            return;
        }
        if (_a instanceof Axis4) {
            this.xy = _a.xy;
            this.xz = _a.xz;
            this.xw = _a.xw;
            this.yz = _a.yz;
            this.yw = _a.yw;
            this.zw = _a.zw;
            return;
        }
        this.xy = _a;
        this.xz = _b;
        this.xw = _c;
        this.yz = _d;
        this.yw = _e;
        this.zw = _f;
        return;
    }
    Axis4.prototype.set = function (_xy, _xz, _xw, _yz, _yw, _zw) {
        this.xy = _xy;
        this.xz = _xz;
        this.xw = _xw;
        this.yz = _yz;
        this.yw = _yw;
        this.zw = _zw;
    };
    return Axis4;
}());
