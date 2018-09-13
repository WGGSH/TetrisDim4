"use strict";
var PuzzleUI = /** @class */ (function () {
    function PuzzleUI(_puzzle) {
        this.puzzle = _puzzle;
        this.rotateFlag = false;
    }
    PuzzleUI.prototype.initialize = function () {
    };
    PuzzleUI.prototype.update = function () {
        // クリック(タップ)した時にその位置によってボタンが押されたか判定する
        if (Input.MouseDown) {
            var mosuePos = Input.ClickPos;
            var targetPos = new Vec2(null);
            // 回転ボタン
            for (var i = 0; i < 4; i++) {
                fill(255);
                targetPos.set(width / 2 + Puzzle.UI_HEIGHT / 4 * Math.cos(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX), height / 8 * 7 + Puzzle.UI_HEIGHT / 4 * Math.sin(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX));
                // ellipse(targetPos.x, targetPos.y, Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT / 3);
                if (mosuePos.distance(targetPos) < Puzzle.UI_HEIGHT / 6) {
                    if (this.rotateFlag == false) {
                        // 移動時
                        switch (i) {
                            case 0:
                                this.puzzle.MoveVec.set(0, 0, -1, 0);
                                break;
                            case 1:
                                this.puzzle.MoveVec.set(1, 0, 0, 0);
                                break;
                            case 2:
                                this.puzzle.MoveVec.set(0, 0, 1, 0);
                                break;
                            case 3:
                                this.puzzle.MoveVec.set(-1, 0, 0, 0);
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        // 回転時
                        switch (i) {
                            case 0:
                                this.puzzle.blockRotate(new Axis4(0, 0, -1, 0, 0, 0));
                                break;
                            case 1:
                                this.puzzle.blockRotate(new Axis4(0, 0, 0, 0, 0, -1));
                                break;
                            case 2:
                                this.puzzle.blockRotate(new Axis4(0, 0, 1, 0, 0, 0));
                                break;
                            case 3:
                                this.puzzle.blockRotate(new Axis4(0, 0, 0, 0, 0, 1));
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            // W軸回転ボタン
            var buttonTurnWidth = Puzzle.UI_HEIGHT / 3;
            var buttonTurnHeight = Puzzle.UI_HEIGHT;
            var topPos = new Vec2(null);
            var bottomPos = new Vec2(null);
            for (var i = 0; i < 2; i++) {
                targetPos.set(width / 2 + (i * 2 - 1) * Puzzle.UI_HEIGHT / 2, height - Puzzle.UI_HEIGHT);
                // rect(targetPos.x, targetPos.y, buttonTurnWidth * (i * 2 - 1), buttonTurnHeight);
                topPos.set(i == 0 ? targetPos.x - buttonTurnWidth : targetPos.x, targetPos.y);
                bottomPos.set((i == 0 ? targetPos.x : targetPos.x + buttonTurnWidth), targetPos.y + buttonTurnHeight);
                // line(topPos.x, topPos.y, buttonPos.x, buttonPos.y);
                if (mosuePos.x >= topPos.x && mosuePos.x <= bottomPos.x && mosuePos.y >= topPos.y && mosuePos.y <= bottomPos.y) {
                    if (this.rotateFlag == false) {
                        // 移動
                        this.puzzle.MoveVec.set(0, 0, 0, -(i * 2 - 1));
                    }
                    else {
                        // 回転
                        this.puzzle.blockRotate(new Axis4(0, 0, 0, 0, -(i * 2 - 1), 0));
                    }
                }
            }
            // 上下移動ボタン
            for (var i = 0; i < 2; i++) {
                targetPos.set(width / 2 + Puzzle.UI_HEIGHT / 6 * 5, height - Puzzle.UI_HEIGHT / 2);
                topPos.set(targetPos.x, i == 0 ? height - Puzzle.UI_HEIGHT : height - Puzzle.UI_HEIGHT / 2);
                bottomPos.set(targetPos.x + Puzzle.UI_HEIGHT / 3, i == 0 ? height - Puzzle.UI_HEIGHT / 2 : height);
                // line(topPos.x, topPos.y, bottomPos.x, bottomPos.y);
                if (mosuePos.x >= topPos.x && mosuePos.x <= bottomPos.x && mosuePos.y >= topPos.y && mosuePos.y <= bottomPos.y) {
                    if (this.rotateFlag == false) {
                        // 移動
                        this.puzzle.MoveVec.set(0, (i * 2 - 1), 0, 0);
                    }
                    else {
                        // 回転
                        if (i == 0) {
                            this.puzzle.blockRotate(new Axis4(1, 0, 0, 0, 0, 0));
                        }
                        else {
                            this.puzzle.blockRotate(new Axis4(0, 1, 0, 0, 0, 0));
                        }
                    }
                }
            }
            // 固定ボタン
            topPos.set(width / 2 - Puzzle.UI_HEIGHT / 3 * 4, height - Puzzle.UI_HEIGHT);
            bottomPos.set(width / 2 - Puzzle.UI_HEIGHT / 6 * 5, height - Puzzle.UI_HEIGHT / 2);
            // line(topPos.x, topPos.y, bottomPos.x, bottomPos.y);
            // rect(topPos.x, topPos.y, bottomPos.x - topPos.x, bottomPos.y - topPos.y);
            if (mosuePos.x >= topPos.x && mosuePos.x <= bottomPos.x && mosuePos.y >= topPos.y && mosuePos.y <= bottomPos.y) {
                this.puzzle.fixBlock();
            }
            // 回転ボタン
            topPos.set(width / 2 - Puzzle.UI_HEIGHT / 3 * 4, height - Puzzle.UI_HEIGHT / 2);
            bottomPos.set(width / 2 - Puzzle.UI_HEIGHT / 6 * 5, height);
            rect(topPos.x, topPos.y, bottomPos.x - topPos.x, bottomPos.y - topPos.y);
            if (mosuePos.x >= topPos.x && mosuePos.x <= bottomPos.x && mosuePos.y >= topPos.y && mosuePos.y <= bottomPos.y) {
                this.rotateFlag = !this.rotateFlag;
            }
        }
    };
    PuzzleUI.prototype.draw = function () {
        // fill(255);
        // noFill();
        fill(255);
        noStroke();
        translate(0, 0, 400);
        // 背景色
        fill(64, 64, 64);
        rect(0, height - Puzzle.UI_HEIGHT, width, Puzzle.UI_HEIGHT, 1, 1);
        // 4方向矢印の描画
        push();
        translate(width / 2, height - Puzzle.UI_HEIGHT / 2);
        for (var i = 0; i < 4; i++) {
            push();
            rotate(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX);
            translate(Puzzle.UI_HEIGHT / 4, 0);
            texture(Resource.getResource(RESOURCE_ID.BUTTON_ARROW));
            plane(Puzzle.UI_HEIGHT / 2, Puzzle.UI_HEIGHT / 2);
            noFill();
            stroke(128, 128, 128, 128);
            strokeWeight(1);
            pop();
        }
        pop();
        // 回転ボタンの描画
        push();
        translate(width / 2, height - Puzzle.UI_HEIGHT / 2);
        for (var i = 0; i < 2; i++) {
            push();
            rotate(radians(i * 180));
            translate(Puzzle.UI_HEIGHT / 2 + Puzzle.UI_HEIGHT / 6, 0);
            texture(Resource.getResource(RESOURCE_ID.BUTTON_TURN));
            plane(Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT * -(i * 2 - 1));
            pop();
        }
        pop();
        // 上下移動ボタンの描画
        push();
        translate(width / 2 + Puzzle.UI_HEIGHT, height - Puzzle.UI_HEIGHT / 2);
        for (var i = 0; i < 2; i++) {
            push();
            rotate(radians(i * 180));
            translate(0, Puzzle.UI_HEIGHT / 4);
            texture(Resource.getResource(RESOURCE_ID.BUTTON_STRAIGHT));
            plane(Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT / 2.5);
            pop();
        }
        pop();
        // 固定ボタン
        push();
        translate(width / 2 - Puzzle.UI_HEIGHT / 12 * 12, height - Puzzle.UI_HEIGHT / 4 * 3);
        texture(Resource.getResource(RESOURCE_ID.BUTTON_FIX));
        plane(Puzzle.UI_HEIGHT / 4, Puzzle.UI_HEIGHT / 4);
        pop();
        // 回転ボタン
        push();
        translate(width / 2 - Puzzle.UI_HEIGHT / 12 * 12, height - Puzzle.UI_HEIGHT / 4 * 1);
        texture(Resource.getResource(this.rotateFlag == false ? RESOURCE_ID.BUTTON_ROTATE : RESOURCE_ID.BUTTON_ROTATE2));
        plane(Puzzle.UI_HEIGHT / 4, Puzzle.UI_HEIGHT / 4);
        pop();
    };
    return PuzzleUI;
}());
