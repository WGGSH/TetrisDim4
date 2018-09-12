"use strict";
var Block = /** @class */ (function () {
    function Block() {
    }
    Block.initialize = function () {
        Block.BLOCK_LIST = new Array(Block.BLOCK_TYPE_MAX);
        var _loop_1 = function (i) {
            Block.BLOCK_LIST[i] = new Array(Block.BLOCK_WIDTH);
            for (var y = 0; y < Block.BLOCK_WIDTH; y++) {
                Block.BLOCK_LIST[i][y] = new Array(Block.BLOCK_WIDTH);
                for (var w = 0; w < Block.BLOCK_WIDTH; w++) {
                    Block.BLOCK_LIST[i][y][w] = new Array(Block.BLOCK_WIDTH);
                    for (var z = 0; z < Block.BLOCK_WIDTH; z++) {
                        Block.BLOCK_LIST[i][y][w][z] = new Array(Block.BLOCK_WIDTH);
                    }
                }
            }
            Block.blockMethod(Block.BLOCK_LIST[i], function (y, w, z, x) {
                Block.BLOCK_LIST[i][y][w][z][x] = 0;
            });
        };
        for (var i = 0; i < 7; i++) {
            _loop_1(i);
        }
        // 1種類ずつブロックの情報を設定していく
        // 1つ目: 正方形
        Block.BLOCK_LIST[0][1][1][1][1] = 1;
        Block.BLOCK_LIST[0][1][1][1][2] = 1;
        Block.BLOCK_LIST[0][2][1][1][1] = 1;
        Block.BLOCK_LIST[0][2][1][1][2] = 1;
        // 2つ目: I字(テトリス棒)
        Block.BLOCK_LIST[1][2][1][1][0] = 2;
        Block.BLOCK_LIST[1][2][1][1][1] = 2;
        Block.BLOCK_LIST[1][2][1][1][2] = 2;
        Block.BLOCK_LIST[1][2][1][1][3] = 2;
        // 3つ目: T字
        Block.BLOCK_LIST[2][1][1][1][1] = 3;
        Block.BLOCK_LIST[2][2][1][1][0] = 3;
        Block.BLOCK_LIST[2][2][1][1][1] = 3;
        Block.BLOCK_LIST[2][2][1][1][2] = 3;
        // 4つ目: S(Z)字
        Block.BLOCK_LIST[3][1][1][1][0] = 4;
        Block.BLOCK_LIST[3][1][1][1][1] = 4;
        Block.BLOCK_LIST[3][2][1][1][1] = 4;
        Block.BLOCK_LIST[3][2][1][1][2] = 4;
        // 5つ目: L字
        Block.BLOCK_LIST[4][1][1][1][1] = 5;
        Block.BLOCK_LIST[4][2][1][1][1] = 5;
        Block.BLOCK_LIST[4][2][1][1][2] = 5;
        Block.BLOCK_LIST[4][2][1][1][3] = 5;
        // 6つ目: 3次元的形状その1
        Block.BLOCK_LIST[5][2][1][1][1] = 6;
        Block.BLOCK_LIST[5][2][1][1][2] = 6;
        Block.BLOCK_LIST[5][1][1][1][1] = 6;
        Block.BLOCK_LIST[5][2][1][2][1] = 6;
        // 7つ目: 3次元的形状その2
        Block.BLOCK_LIST[6][2][1][1][1] = 7;
        Block.BLOCK_LIST[6][2][1][1][2] = 7;
        Block.BLOCK_LIST[6][1][1][1][1] = 7;
        Block.BLOCK_LIST[6][2][1][2][2] = 7;
        // ブロックの色情報設定
        Block.BLOCK_COLOR = new Array(Block.BLOCK_TYPE_MAX);
        Block.BLOCK_COLOR[0] = color(255, 0, 0);
        Block.BLOCK_COLOR[1] = color(0, 255, 0);
        Block.BLOCK_COLOR[2] = color(0, 0, 255);
        Block.BLOCK_COLOR[3] = color(255, 255, 0);
        Block.BLOCK_COLOR[4] = color(255, 0, 255);
        Block.BLOCK_COLOR[5] = color(0, 255, 255);
        Block.BLOCK_COLOR[6] = color(255, 255, 255);
    };
    Block.blockMethod = function (_block, method) {
        for (var y = 0; y < Block.BLOCK_WIDTH; y++) {
            for (var w = 0; w < Block.BLOCK_WIDTH; w++) {
                for (var z = 0; z < Block.BLOCK_WIDTH; z++) {
                    for (var x = 0; x < Block.BLOCK_WIDTH; x++) {
                        method(y, w, z, x);
                    }
                }
            }
        }
    };
    Block.BLOCK_WIDTH = 4; // 1組のブロックを格納する幅
    Block.BLOCK_TYPE_MAX = 7; // 降ってくるブロックの種類の総数
    return Block;
}());
