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
    };
    Puzzle.prototype.update = function () {
        if (Input.getKeyDown('A')) {
            this.position.x++;
        }
        if (Input.getKeyDown('D')) {
            this.position.x--;
        }
        if (Input.getKeyDown('W')) {
            this.position.z++;
        }
        if (Input.getKeyDown('S')) {
            this.position.z--;
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
    };
    Puzzle.prototype.draw = function () {
        background(255, 255, 255);
        fill(0);
        Util.fieldMethod(this.field, function (_y, _w, _z, _x) {
            rect(_w * Puzzle.STAGE_WIDTH * Puzzle.BLOCK_SIZE + _x * Puzzle.BLOCK_SIZE, _z * Puzzle.STAGE_HEIGHT * Puzzle.BLOCK_SIZE + _y * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);
        });
    };
    Puzzle.FIELD_WIDTH = 5; // フィールドの高さ以外の幅
    Puzzle.STAGE_WIDTH = Puzzle.FIELD_WIDTH + 2;
    Puzzle.FIELD_HEIGHT = 10; // フィールドの高さ
    Puzzle.STAGE_HEIGHT = Puzzle.FIELD_HEIGHT + 2;
    // フィールド内部をループするためのインデックス定数
    Puzzle.FIELD_INDEX_MIN = 1;
    Puzzle.FIELD_HEIGHT_INDEX_MAX = Puzzle.FIELD_HEIGHT + 1;
    Puzzle.FIELD_WIDTH_INDEX_MAX = Puzzle.FIELD_WIDTH + 1;
    Puzzle.BLOCK_SIZE = 10;
    return Puzzle;
}(Scene));
