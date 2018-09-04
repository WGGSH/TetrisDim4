"use strict";
/// <reference path="p5.global-mode.d.ts" />
var Input = /** @class */ (function () {
    function Input() {
        this.mousePressCount = 0;
        this.mosueReleaseCount = 0;
        this.mousePos = new Vec2(null);
        this.preMousePos = new Vec2(null);
        this.clickedPos = new Vec2(null);
    }
    Input.prototype.update = function () {
        if (mouseIsPressed) {
            this.mousePressCount++;
            this.mosueReleaseCount = 0;
            if (this.MouseDown) {
                // クリック時のマウス座標を記録
                this.clickedPos.x = mouseX;
                this.clickedPos.y = mouseY;
            }
        }
        else {
            this.mousePressCount = 0;
            this.mosueReleaseCount++;
        }
        this.preMousePos.x = this.mousePos.x;
        this.preMousePos.y = this.mousePos.y;
        this.mousePos.x = mouseX;
        this.mousePos.y = mouseY;
    };
    Object.defineProperty(Input.prototype, "MouseDown", {
        get: function () {
            return this.mousePressCount == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "MousePress", {
        get: function () {
            return this.mousePressCount >= 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "MouseUp", {
        get: function () {
            return this.mosueReleaseCount == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "MousePos", {
        get: function () {
            return this.mousePos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "PreMousePos", {
        get: function () {
            return this.preMousePos;
        },
        enumerable: true,
        configurable: true
    });
    return Input;
}());
