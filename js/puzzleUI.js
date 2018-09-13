"use strict";
var PuzzleUI = /** @class */ (function () {
    function PuzzleUI(_puzzle) {
        this.puzzle = _puzzle;
    }
    PuzzleUI.prototype.initialize = function () {
    };
    PuzzleUI.prototype.update = function () {
        if (Input.MouseDown) {
            var mosuePos = Input.ClickPos;
            for (var i = 0; i < 4; i++) {
                var targetPos = new Vec2(null);
                fill(255);
                targetPos.set(width / 2 + Puzzle.UI_HEIGHT / 3 * Math.cos(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX), height / 8 * 7 + Puzzle.UI_HEIGHT / 3 * Math.sin(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX));
                ellipse(targetPos.x, targetPos.y, Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT / 3);
                if (mosuePos.distance(targetPos) < Puzzle.UI_HEIGHT / 6) {
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
        // rect(0, height / 4 * 3, width, height / 4, 1, 1);
        // 矢印の描画
        push();
        translate(width / 2, height / 8 * 7);
        for (var i = 0; i < 4; i++) {
            push();
            rotate(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX);
            translate(Puzzle.UI_HEIGHT / 3, 0);
            texture(Resource.getResource(RESOURCE_ID.BUTTON_ARROW));
            plane(Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT / 3);
            noFill();
            stroke(128, 128, 128, 128);
            strokeWeight(1);
            ellipse(0, 0, Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT / 3);
            pop();
        }
        // image(Resource.getResource(RESOURCE_ID.BUTTON_ARROW),0,0);
        pop();
    };
    return PuzzleUI;
}());
