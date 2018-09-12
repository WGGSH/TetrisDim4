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
        // 所持ブロックの初期化
        _this.currentBlock = new Array(Block.BLOCK_WIDTH);
        for (var y = 0; y < Block.BLOCK_WIDTH; y++) {
            _this.currentBlock[y] = new Array(Block.BLOCK_WIDTH);
            for (var w = 0; w < Block.BLOCK_WIDTH; w++) {
                _this.currentBlock[y][w] = new Array(Block.BLOCK_WIDTH);
                for (var z = 0; z < Block.BLOCK_WIDTH; z++) {
                    _this.currentBlock[y][w][z] = new Array(Block.BLOCK_WIDTH);
                }
            }
        }
        Block.blockMethod(_this.currentBlock, function (y, w, z, x) {
            _this.currentBlock[y][w][z][x] = 0;
        });
        _this.position = new Vec4(null);
        return _this;
    }
    Puzzle.prototype.initialize = function () {
        var _this = this;
        // カーソル位置の初期化
        this.fixPosition();
        // フィールドの初期化
        Puzzle.stageMethod(this.field, function (y, w, z, x) {
            if (x == 0 || x == Puzzle.STAGE_WIDTH - 1 || y == 0 || y == Puzzle.STAGE_HEIGHT - 1 || z == 0 || z == Puzzle.STAGE_WIDTH - 1 || w == 0 || w == Puzzle.STAGE_WIDTH - 1) {
                _this.field[y][w][z][x] = 9;
            }
        });
        // ブロックの初期化
        this.createBlock(Math.floor(random(0, Block.BLOCK_TYPE_MAX)));
        // カメラの初期化
        Camera.initialize();
    };
    Puzzle.prototype.update = function () {
        if (keyIsPressed) {
            var prePos = new Vec4(this.position.x, this.position.y, this.position.z, this.position.w);
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
                this.position.w++;
            }
            if (Input.getKeyDown('E')) {
                this.position.w--;
            }
            if (Input.getKeyDown('X')) {
                this.position.y++;
            }
            if (Input.getKeyDown('Z')) {
                this.position.y--;
            }
            if (this.position.equal(prePos) == false) {
                // 移動先にブロックがある場合,移動を無効化する
                if (this.collisionBlock(this.position) == true) {
                    this.position.set(prePos.x, prePos.y, prePos.z, prePos.w);
                }
            }
            // Cキーで，ブロックが接地していれば固定する
            if (Input.getKeyDown('C')) {
                var dropVec = new Vec4(this.position.x, this.position.y + 1, this.position.z, this.position.w);
                if (this.collisionBlock(dropVec) == true) {
                    this.setBlock();
                    this.createBlock(Math.floor(random(0, Block.BLOCK_TYPE_MAX)));
                    this.fixPosition();
                }
            }
        }
    };
    Puzzle.prototype.draw = function () {
        // background(255, 255, 255);
        background(0);
        // this.drawUI();
        // this.draw3D();
    };
    Puzzle.prototype.draw2D = function () {
        ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 2000);
        // fill(255);
        // noFill();
        fill(255);
        noStroke();
        translate(0, 0, 400);
        // 背景色
        rect(0, height / 4 * 3, width, height / 4, 1, 1);
        // 矢印の描画
        push();
        translate(width / 2, height / 8 * 7);
        for (var i = 0; i < 4; i++) {
            push();
            rotate(radians(i * 90 + 36 * this.position.w) - Camera.AngleX);
            console.log(i * 90 + 75 * this.position.w);
            translate(40, 0);
            texture(Resource.getResource(RESOURCE_ID.BUTTON_ARROW));
            plane(50, 50);
            pop();
        }
        // image(Resource.getResource(RESOURCE_ID.BUTTON_ARROW),0,0);
        pop();
        // canvas2D.text("hoge", 0, 0);
    };
    Puzzle.prototype.draw3D = function () {
        var _this = this;
        // カメラの移動
        Camera.update();
        // return;
        push();
        strokeWeight(0.5);
        // fill(0, 128, 255);
        // noStroke();
        // フィールドの枠描画
        for (var w = Puzzle.FIELD_INDEX_MIN; w < Puzzle.FIELD_WIDTH_INDEX_MAX; w++) {
            push();
            rotateY(w * Math.PI * 2 / (Puzzle.FIELD_WIDTH + 1));
            translate(-Puzzle.W_LENGTH, 0);
            translate(0.5 * Puzzle.BLOCK_DRAW_SIZE, Puzzle.BLOCK_DRAW_SIZE * (Puzzle.STAGE_HEIGHT - 1.5), 0.5 * Puzzle.BLOCK_DRAW_SIZE);
            push();
            rotateX(Math.PI / 2);
            // rect(0, 0, Puzzle.BLOCK_DRAW_SIZE * Puzzle.FIELD_WIDTH, Puzzle.BLOCK_DRAW_SIZE * Puzzle.FIELD_WIDTH,);
            for (var z = 0; z < Puzzle.FIELD_WIDTH; z++) {
                for (var x = 0; x < Puzzle.FIELD_WIDTH; x++) {
                    push();
                    translate(x * Puzzle.BLOCK_DRAW_SIZE, z * Puzzle.BLOCK_DRAW_SIZE, 0);
                    fill(0, 128, 255);
                    noStroke();
                    rect(1, 1, Puzzle.BLOCK_DRAW_SIZE - 1, Puzzle.BLOCK_DRAW_SIZE - 1, 1, 1);
                    fill(0, 0, 0);
                    translate(0, 0, 0.005);
                    rect(2, 2, Puzzle.BLOCK_DRAW_SIZE - 3, Puzzle.BLOCK_DRAW_SIZE - 3, 1, 1);
                    pop();
                }
            }
            pop();
            pop();
        }
        // 設置済みのブロックの描画
        fill(0, 0, 0);
        stroke(0, 128, 255);
        Puzzle.fieldMethod(this.field, function (y, w, z, x) {
            if (_this.field[y][w][z][x] == 0) {
                return;
            }
            push();
            stroke(Block.BLOCK_COLOR[_this.field[y][w][z][x] - 1]);
            rotateY(w * Math.PI * 2 / (Puzzle.FIELD_WIDTH + 1));
            translate(-Puzzle.W_LENGTH, 0);
            translate(x * Puzzle.BLOCK_DRAW_SIZE, y * Puzzle.BLOCK_DRAW_SIZE, z * Puzzle.BLOCK_DRAW_SIZE);
            box(Puzzle.BLOCK_DRAW_SIZE);
            pop();
        });
        // 移動中ブロックの描画
        Block.blockMethod(this.currentBlock, function (y, w, z, x) {
            if (_this.currentBlock[y][w][z][x] == 0) {
                return;
            }
            push();
            stroke(Block.BLOCK_COLOR[_this.currentBlock[y][w][z][x] - 1]);
            rotateY((w + _this.position.w) * Math.PI * 2 / (Puzzle.FIELD_WIDTH + 1));
            translate(-Puzzle.W_LENGTH, 0);
            translate((x + _this.position.x) * Puzzle.BLOCK_DRAW_SIZE, (y + _this.position.y) * Puzzle.BLOCK_DRAW_SIZE, (z + _this.position.z) * Puzzle.BLOCK_DRAW_SIZE);
            box(Puzzle.BLOCK_DRAW_SIZE);
            pop();
        });
        // ゴーストブロックの描画
        // 落下可能距離を導出する
        var dropVec = new Vec4(null);
        var dropDist = 0;
        for (var y = this.position.y; y < Puzzle.STAGE_HEIGHT; y++) {
            dropVec.set(this.position.x, y, this.position.z, this.position.w);
            if (this.collisionBlock(dropVec) == true) {
                dropDist = y - 1;
                break;
            }
        }
        // ゴーストを描画
        fill(0, 0, 0, 64);
        Block.blockMethod(this.currentBlock, function (y, w, z, x) {
            if (_this.currentBlock[y][w][z][x] == 0) {
                return;
            }
            // TODO: ゴーストが移動中のブロックと重なっている場合,描画しない
            push();
            stroke(Block.BLOCK_COLOR[_this.currentBlock[y][w][z][x] - 1]);
            rotateY((w + _this.position.w) * Math.PI * 2 / (Puzzle.FIELD_WIDTH + 1));
            translate(-Puzzle.W_LENGTH, 0);
            translate((x + _this.position.x) * Puzzle.BLOCK_DRAW_SIZE, (y + dropDist) * Puzzle.BLOCK_DRAW_SIZE, (z + _this.position.z) * Puzzle.BLOCK_DRAW_SIZE);
            box(Puzzle.BLOCK_DRAW_SIZE);
            pop();
        });
        pop();
    };
    Puzzle.prototype.draw2DField = function () {
        var _this = this;
        fill(0);
        noStroke();
        // ステージの描画
        Puzzle.stageMethod(this.field, function (y, w, z, x) {
            if (_this.field[y][w][z][x] != 0 && _this.field[y][w][z][x] != 8) {
                rect(w * (Puzzle.STAGE_WIDTH + 2) * Puzzle.BLOCK_SIZE + x * Puzzle.BLOCK_SIZE, z * (Puzzle.STAGE_HEIGHT + 2) * Puzzle.BLOCK_SIZE + y * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);
            }
        });
        // 移動中のブロックの描画
        Block.blockMethod(this.currentBlock, function (y, w, z, x) {
            if (_this.currentBlock[y][w][z][x] != 0) {
                rect((w + _this.position.w) * (Puzzle.STAGE_WIDTH + 2) * Puzzle.BLOCK_SIZE + (x + _this.position.x) * Puzzle.BLOCK_SIZE, (z + _this.position.z) * (Puzzle.STAGE_HEIGHT + 2) * Puzzle.BLOCK_SIZE + (y + _this.position.y) * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);
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
    // 新しいブロックを生成
    Puzzle.prototype.createBlock = function (index) {
        var _this = this;
        Block.blockMethod(this.currentBlock, function (y, w, z, x) {
            _this.currentBlock[y][w][z][x] = Block.BLOCK_LIST[index][y][w][z][x];
        });
    };
    // ブロックの位置を固定する
    Puzzle.prototype.setBlock = function () {
        var _this = this;
        Block.blockMethod(this.currentBlock, function (y, w, z, x) {
            if (_this.currentBlock[y][w][z][x] != 0) {
                _this.field[y + _this.position.y][w + _this.position.w][z + _this.position.z][x + _this.position.x] = _this.currentBlock[y][w][z][x];
            }
        });
    };
    // カーソル位置を初期化
    Puzzle.prototype.fixPosition = function () {
        this.position.set(Math.floor(Puzzle.STAGE_WIDTH / 2 - 1), 0, Math.floor(Puzzle.STAGE_WIDTH / 2 - 1), Math.floor(Puzzle.STAGE_WIDTH / 2 - 1));
    };
    // ブロックとフィールドの接触判定
    Puzzle.prototype.collisionBlock = function (position) {
        var _this = this;
        var flag = false;
        Block.blockMethod(this.currentBlock, function (y, w, z, x) {
            // ブロックのないマスは無視
            if (_this.currentBlock[y][w][z][x] == 0) {
                return;
            }
            // 移動先がフィールド外の場合も無視
            if (y + position.y < 0 || y + position.y >= Puzzle.STAGE_HEIGHT ||
                w + position.w < 0 || w + position.w >= Puzzle.STAGE_WIDTH ||
                z + position.z < 0 || z + position.z >= Puzzle.STAGE_WIDTH ||
                x + position.x < 0 || x + position.x >= Puzzle.STAGE_WIDTH) {
                return;
            }
            if (_this.field[y + position.y][w + position.w][z + position.z][x + position.x] != 0) {
                flag = true;
            }
        });
        return flag;
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
    Puzzle.BLOCK_DRAW_SIZE = 10; // 描画時のブロックの大きさ
    Puzzle.W_LENGTH = 16 * Puzzle.FIELD_WIDTH; // W用のずらし幅
    return Puzzle;
}(Scene));
