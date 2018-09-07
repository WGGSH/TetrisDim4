"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Puzzle = /** @class */ (function (_super) {
    __extends(Puzzle, _super);
    function Puzzle(_game) {
        var _this = _super.call(this, _game) || this;
        // フィールドの初期化
        _this.field = new Array();
        for (var y = 0; y < Puzzle.STAGE_HEIGHT; y++) {
            _this.field[y] = new Array(Puzzle.STAGE_WIDTH);
            for (var w = 0; w < Puzzle.STAGE_WIDTH; w++) {
                _this.field[y][w] = new Array(Puzzle.STAGE_WIDTH);
                for (var z = 0; z < Puzzle.STAGE_WIDTH; z++) {
                    _this.field[y][w][z] = new Array(Puzzle.STAGE_WIDTH);
                    for (var x = 0; x < Puzzle.STAGE_WIDTH; x++) {
                        _this.field[y][w][z][x] = 0;
                    }
                }
            }
        }
        _this.position = new Vec4(null);
        return _this;
    }
    Puzzle.prototype.initialize = function () {
        var _this = this;
        // カーソル位置の初期化
        this.position.set(Math.floor(Puzzle.STAGE_WIDTH / 2), 1, Math.floor(Puzzle.STAGE_WIDTH / 2), Math.floor(Puzzle.STAGE_WIDTH / 2));
        // フィールドの初期化
        Puzzle.stageMethod(this.field, function (y, w, z, x) {
            if (x == 0 || x == Puzzle.STAGE_WIDTH - 1 || y == 0 || y == Puzzle.STAGE_HEIGHT - 1 || z == 0 || z == Puzzle.STAGE_WIDTH - 1 || w == 0 || w == Puzzle.STAGE_WIDTH - 1) {
                _this.field[y][w][z][x] = 9;
            }
        });
    };
    Puzzle.prototype.update = function () {
        if (Input.getKeyDown('A')) {
            this.position.x--;
        }
        if (Input.getKeyDown('D')) {
            this.position.x++;
        }
        if (Input.getKeyDown('W')) {
            this.position.z--;
        }
        if (Input.getKeyDown('S')) {
            this.position.z++;
        }
        if (Input.getKeyDown('Q')) {
            this.position.w--;
        }
        if (Input.getKeyDown('E')) {
            this.position.w++;
        }
        if (Input.getKeyDown('X')) {
            this.position.y++;
        }
        if (Input.getKeyDown('Z')) {
            this.position.y--;
        }
    };
    Puzzle.prototype.draw = function () {
        var _this = this;
        background(255, 255, 255);
        fill(0);
        noStroke();
        Puzzle.stageMethod(this.field, function (y, w, z, x) {
            if (_this.field[y][w][z][x] != 0 && _this.field[y][w][z][x] != 8) {
                rect(w * (Puzzle.STAGE_WIDTH + 2) * Puzzle.BLOCK_SIZE + x * Puzzle.BLOCK_SIZE, z * (Puzzle.STAGE_HEIGHT + 2) * Puzzle.BLOCK_SIZE + y * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);
            }
        });
        fill(255, 0, 0);
        rect(this.position.w * (Puzzle.STAGE_WIDTH + 2) * Puzzle.BLOCK_SIZE + this.position.x * Puzzle.BLOCK_SIZE, this.position.z * (Puzzle.STAGE_HEIGHT + 2) * Puzzle.BLOCK_SIZE + this.position.y * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);
    };
    // フィールド全体に適用する処理
    Puzzle.fieldMethod = function (_field, method) {
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
    // ステージ全体に適用する処理
    Puzzle.stageMethod = function (_field, method) {
        for (var y = 0; y < Puzzle.STAGE_HEIGHT; y++) {
            for (var w = 0; w < Puzzle.STAGE_WIDTH; w++) {
                for (var z = 0; z < Puzzle.STAGE_WIDTH; z++) {
                    for (var x = 0; x < Puzzle.STAGE_WIDTH; x++) {
                        method(y, w, z, x);
                    }
                }
            }
        }
    };
    Puzzle.FIELD_WIDTH = 5; // フィールドの高さ以外の幅
    Puzzle.STAGE_WIDTH = Puzzle.FIELD_WIDTH + 2;
    Puzzle.FIELD_HEIGHT = 10; // フィールドの高さ
    Puzzle.STAGE_HEIGHT = Puzzle.FIELD_HEIGHT + 2;
    // フィールド内部をループするためのインデックス定数
    Puzzle.FIELD_INDEX_MIN = 1;
    Puzzle.FIELD_HEIGHT_INDEX_MAX = Puzzle.FIELD_HEIGHT + 1;
    Puzzle.FIELD_WIDTH_INDEX_MAX = Puzzle.FIELD_WIDTH + 1;
    Puzzle.BLOCK_SIZE = 6;
    return Puzzle;
}(Scene));
