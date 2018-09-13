"use strict";
/// <reference path="p5.global-mode.d.ts" />
var Input = /** @class */ (function () {
    function Input() {
    }
    Input.update = function () {
        Input.mouseUpdate();
        Input.keyboardUpdate();
    };
    // マウス(タップ)の入力状態更新
    Input.mouseUpdate = function () {
        if (mouseIsPressed) {
            Input.mousePressCount++;
            Input.mosueReleaseCount = 0;
            if (Input.MouseDown) {
                // クリック時のマウス座標を記録
                Input.clickedPos.x = mouseX;
                Input.clickedPos.y = mouseY;
            }
        }
        else {
            Input.mousePressCount = 0;
            Input.mosueReleaseCount++;
        }
        Input.preMousePos.x = Input.mousePos.x;
        Input.preMousePos.y = Input.mousePos.y;
        Input.mousePos.x = mouseX;
        Input.mousePos.y = mouseY;
    };
    // キーボードの入力状態更新
    Input.keyboardUpdate = function () {
        // if (keyIsPressed) {
        //   console.log(key);
        // }
        for (var i = 0; i < 256; i++) {
            if (Input.keyPressCount[i] >= 1) {
                Input.keyPressCount[i]++;
            }
            if (Input.keyReleaseCount[i] >= 1) {
                Input.keyReleaseCount[i]++;
            }
        }
    };
    Input.keyPress = function (_key) {
        Input.keyPressCount[_key.charCodeAt(0)] = 1;
        Input.keyReleaseCount[_key.charCodeAt(0)] = 0;
    };
    Input.keyRelease = function (_key) {
        Input.keyPressCount[_key.charCodeAt(0)] = 0;
        Input.keyReleaseCount[_key.charCodeAt(0)] = 1;
    };
    Object.defineProperty(Input, "MouseDown", {
        get: function () {
            return Input.mousePressCount == 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "MousePress", {
        get: function () {
            return Input.mousePressCount >= 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "MouseUp", {
        get: function () {
            return Input.mosueReleaseCount == 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "MousePos", {
        get: function () {
            return Input.mousePos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "PreMousePos", {
        get: function () {
            return Input.preMousePos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "ClickPos", {
        get: function () {
            return Input.clickedPos;
        },
        enumerable: true,
        configurable: true
    });
    Input.getKey = function (_key) {
        return Input.keyPressCount[_key.charCodeAt(0)] >= 2;
    };
    Input.getKeyDown = function (_key) {
        return Input.keyPressCount[_key.charCodeAt(0)] == 2;
    };
    Input.getKeyUp = function (_key) {
        return Input.keyReleaseCount[_key.charCodeAt(0)] == 2;
    };
    Input.mousePressCount = 0; // マウスボタンが押され続けたフレーム数
    Input.mosueReleaseCount = 0; // マウスボタンが離され続けたフレーム数
    Input.mousePos = new Vec2(null); // 現在のマウス座標
    Input.preMousePos = new Vec2(null); // 直前フレームのマウス座標
    Input.clickedPos = new Vec2(null); // 最後にクリックした時のマウス座標
    Input.keyPressCount = new Array(256); // 各キーが押され続けたフレーム数
    Input.keyReleaseCount = new Array(256); // 各キーが離され続けたフレーム数
    return Input;
}());
function keyPressed() {
    Input.keyPress(key);
}
function keyReleased() {
    Input.keyRelease(key);
}
