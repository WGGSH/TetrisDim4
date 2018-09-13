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
        _this.ui = new PuzzleUI(_this);
        Puzzle.UI_HEIGHT = height / 5;
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
        _this.moveVec = new Vec4(null);
        return _this;
    }
    Object.defineProperty(Puzzle.prototype, "Position", {
        get: function () {
            return this.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Puzzle.prototype, "MoveVec", {
        get: function () {
            return this.moveVec;
        },
        enumerable: true,
        configurable: true
    });
    Puzzle.prototype.initialize = function () {
        var _this = this;
        // カーソル位置の初期化
        this.fixPosition();
        // フィールドの初期化
        Puzzle.stageMethod(this.field, function (y, w, z, x) {
            if (x == 0 || x == Puzzle.STAGE_WIDTH - 1 || /*y == 0 ||*/ y == Puzzle.STAGE_HEIGHT - 1 || z == 0 || z == Puzzle.STAGE_WIDTH - 1 || w == 0 || w == Puzzle.STAGE_WIDTH - 1) {
                _this.field[y][w][z][x] = 9;
            }
        });
        // ブロックの初期化
        this.createBlock(Math.floor(random(0, Block.BLOCK_TYPE_MAX)));
        // カメラの初期化
        Camera.initialize();
        // 仮のブロック設置
    };
    Puzzle.prototype.update = function () {
        this.moveVec.set(0, 0, 0, 0);
        this.ui.update();
        if (keyIsPressed) {
            // 移動
            if (Input.getKeyDown('A')) {
                this.moveVec.set(-1, 0, 0, 0);
            }
            if (Input.getKeyDown('D')) {
                this.moveVec.set(1, 0, 0, 0);
            }
            if (Input.getKeyDown('W')) {
                this.moveVec.set(0, 0, -1, 0);
            }
            if (Input.getKeyDown('S')) {
                this.moveVec.set(0, 0, 1, 0);
            }
            if (Input.getKeyDown('Q')) {
                this.moveVec.set(0, 0, 0, 1);
            }
            if (Input.getKeyDown('E')) {
                this.moveVec.set(0, 0, 0, -1);
            }
            if (Input.getKeyDown('X')) {
                this.moveVec.set(0, 1, 0, 0);
            }
            if (Input.getKeyDown('Z')) {
                this.moveVec.set(0, -1, 0, 0);
            }
            // 回転
            // Cキーで，ブロックが接地していれば固定する
            if (Input.getKeyDown('C')) {
                this.fixBlock();
            }
        }
        if (!this.moveVec.equal(new Vec4(null))) {
            // 移動先にブロックがある場合,移動を無効化する
            var targetPos = new Vec4(this.position.x + this.moveVec.x, this.position.y + this.moveVec.y, this.position.z + this.moveVec.z, this.position.w + this.moveVec.w);
            if (this.collisionBlock(this.currentBlock, targetPos) == false) {
                this.position.set(targetPos.x, targetPos.y, targetPos.z, targetPos.w);
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
        this.ui.draw();
        // デバッグ用,クリック情報の描画
        push();
        if (Input.MouseDown) {
            fill(255, 0, 0);
            noStroke();
            ellipse(Input.MousePos.x, Input.MousePos.y, 15, 15);
        }
        else if (Input.MousePress) {
            fill(255);
            noStroke();
            ellipse(Input.MousePos.x, Input.MousePos.y, 15, 15);
            fill(255, 0, 0);
            ellipse(Input.ClickPos.x, Input.ClickPos.y, 10, 10);
            noFill();
            stroke(255);
            line(Input.ClickPos.x, Input.ClickPos.y, Input.MousePos.x, Input.MousePos.y);
        }
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
            if (this.collisionBlock(this.currentBlock, dropVec) == true) {
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
        this.position.set(Math.floor(Puzzle.STAGE_WIDTH / 2 - 1), 1, Math.floor(Puzzle.STAGE_WIDTH / 2 - 1), Math.floor(Puzzle.STAGE_WIDTH / 2 - 1));
    };
    // ブロック設置処理
    Puzzle.prototype.fixBlock = function () {
        var dropVec = new Vec4(this.position.x, this.position.y + 1, this.position.z, this.position.w);
        if (this.collisionBlock(this.currentBlock, dropVec) == true) {
            this.setBlock();
            // ブロックを消す
            this.deleteBlock();
            this.createBlock(Math.floor(random(0, Block.BLOCK_TYPE_MAX)));
            this.fixPosition();
        }
    };
    Puzzle.prototype.deleteBlock = function () {
        var flag = true;
        while (flag == true) {
            flag = false;
            for (var y = Puzzle.FIELD_HEIGHT_INDEX_MAX - 1; y >= Puzzle.FIELD_INDEX_MIN; y--) {
                var count = 0;
                for (var w = Puzzle.FIELD_INDEX_MIN; w < Puzzle.FIELD_WIDTH_INDEX_MAX; w++) {
                    for (var z = Puzzle.FIELD_INDEX_MIN; z < Puzzle.FIELD_WIDTH_INDEX_MAX; z++) {
                        for (var x = Puzzle.FIELD_INDEX_MIN; x < Puzzle.FIELD_WIDTH_INDEX_MAX; x++) {
                            if (this.field[y][w][z][x] != 0) {
                                count++;
                                console.log(y, w, z, x);
                            }
                        }
                    }
                }
                // カウント数が最大値なら，その段を削除する
                console.log(count);
                if (count == Puzzle.FIELD_WIDTH * Puzzle.FIELD_WIDTH * Puzzle.FIELD_WIDTH) {
                    for (var y2 = y; y2 >= Puzzle.FIELD_INDEX_MIN + 1; y2--) {
                        for (var w = Puzzle.FIELD_INDEX_MIN; w < Puzzle.FIELD_WIDTH_INDEX_MAX; w++) {
                            for (var z = Puzzle.FIELD_INDEX_MIN; z < Puzzle.FIELD_WIDTH_INDEX_MAX; z++) {
                                for (var x = Puzzle.FIELD_INDEX_MIN; x < Puzzle.FIELD_WIDTH_INDEX_MAX; x++) {
                                    this.field[y2][w][z][x] = this.field[y2 - 1][w][z][x];
                                }
                            }
                        }
                    }
                    y++;
                }
            }
        }
    };
    // ブロックとフィールドの接触判定
    Puzzle.prototype.collisionBlock = function (block, position) {
        var _this = this;
        var flag = false;
        Block.blockMethod(block, function (y, w, z, x) {
            // ブロックのないマスは無視
            if (block[y][w][z][x] == 0) {
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
    Puzzle.prototype.blockRotate = function (axis) {
        var _this = this;
        var val = -1;
        var rotBlock = new Array(Block.BLOCK_WIDTH);
        for (var y = 0; y < Block.BLOCK_WIDTH; y++) {
            rotBlock[y] = new Array(Block.BLOCK_WIDTH);
            for (var w = 0; w < Block.BLOCK_WIDTH; w++) {
                rotBlock[y][w] = new Array(Block.BLOCK_WIDTH);
                for (var z = 0; z < Block.BLOCK_WIDTH; z++) {
                    rotBlock[y][w][z] = new Array(Block.BLOCK_WIDTH);
                    for (var x = 0; x < Block.BLOCK_WIDTH; x++) {
                        rotBlock[y][w][z][x] = 0;
                    }
                }
            }
        }
        if (axis.xy == -1)
            val = 0;
        if (axis.xy == 1)
            val = 1;
        if (axis.xz == -1)
            val = 2;
        if (axis.xz == 1)
            val = 3;
        if (axis.xw == -1)
            val = 4;
        if (axis.xw == 1)
            val = 5;
        if (axis.yz == -1)
            val = 6;
        if (axis.yz == 1)
            val = 7;
        if (axis.yw == -1)
            val = 8;
        if (axis.yw == 1)
            val = 9;
        if (axis.zw == -1)
            val = 10;
        if (axis.zw == 1)
            val = 11;
        Block.blockMethod(rotBlock, function (y, w, z, x) {
            if (_this.currentBlock[y][w][z][x] == 0) {
                return;
            }
            // rotBlock[y][w][z][x] = this.currentBlock[y][w][z][x];
            switch (val) {
                case 0: // XY-1
                    rotBlock[y][z][Block.BLOCK_WIDTH - 1 - w][x] = _this.currentBlock[y][w][z][x];
                    break;
                case 1: // XY-2
                    rotBlock[y][Block.BLOCK_WIDTH - 1 - z][w][x] = _this.currentBlock[y][w][z][x];
                    break;
                case 2: // XZ-1
                    rotBlock[w][Block.BLOCK_WIDTH - 1 - y][z][x] = _this.currentBlock[y][w][z][x];
                    break;
                case 3: // XZ-2
                    rotBlock[Block.BLOCK_WIDTH - 1 - w][y][z][x] = _this.currentBlock[y][w][z][x];
                    break;
                case 4: // XW-1
                    rotBlock[z][w][Block.BLOCK_WIDTH - 1 - y][x] = _this.currentBlock[y][w][z][x];
                    break;
                case 5: // XW-2
                    rotBlock[Block.BLOCK_WIDTH - 1 - z][w][y][x] = _this.currentBlock[y][w][z][x];
                    break;
                case 6: // YZ-1
                    rotBlock[y][x][z][Block.BLOCK_WIDTH - 1 - w] = _this.currentBlock[y][w][z][x];
                    break;
                case 7: // YZ-2
                    rotBlock[y][Block.BLOCK_WIDTH - 1 - x][z][w] = _this.currentBlock[y][w][z][x];
                    break;
                case 8: // YW-1
                    rotBlock[y][w][x][Block.BLOCK_WIDTH - 1 - z] = _this.currentBlock[y][w][z][x];
                    break;
                case 9: // YW-2
                    rotBlock[y][w][Block.BLOCK_WIDTH - 1 - x][z] = _this.currentBlock[y][w][z][x];
                    break;
                case 10: // ZW-1
                    rotBlock[x][w][z][Block.BLOCK_WIDTH - 1 - y] = _this.currentBlock[y][w][z][x];
                    break;
                case 11: // ZW-2
                    rotBlock[Block.BLOCK_WIDTH - 1 - x][w][z][y] = _this.currentBlock[y][w][z][x];
                    break;
            }
        });
        // 回転後のブロックがフィールドに重なっていないか確認
        if (this.collisionBlock(rotBlock, this.position) == true) {
            return;
        }
        // 回転後のブロックを現在のブロックに反映する
        Block.blockMethod(this.currentBlock, function (y, w, z, x) {
            _this.currentBlock[y][w][z][x] = rotBlock[y][w][z][x];
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
    Puzzle.BLOCK_SIZE = 6;
    Puzzle.BLOCK_DRAW_SIZE = 10; // 描画時のブロックの大きさ
    Puzzle.W_LENGTH = 16 * Puzzle.FIELD_WIDTH; // W用のずらし幅
    return Puzzle;
}(Scene));
