class Puzzle extends Scene {
  static readonly FIELD_WIDTH: number = 5; // フィールドの高さ以外の幅
  static readonly STAGE_WIDTH: number = Puzzle.FIELD_WIDTH + 2;
  static readonly FIELD_HEIGHT: number = 10; // フィールドの高さ
  static readonly STAGE_HEIGHT: number = Puzzle.FIELD_HEIGHT + 2;

  // フィールド内部をループするためのインデックス定数
  static readonly FIELD_INDEX_MIN: number = 1;
  static readonly FIELD_HEIGHT_INDEX_MAX: number = Puzzle.FIELD_HEIGHT + 1;
  static readonly FIELD_WIDTH_INDEX_MAX: number = Puzzle.FIELD_WIDTH + 1;

  static readonly BLOCK_SIZE: number = 6;

  private field: number[][][][]; // プレイフィールド [Y][W][Z][X]
  private currentBlock: number[][][][]; // 現在操作中のブロック
  private position: Vec4; // 移動中のブロックの位置

  constructor(_game: Game) {
    super(_game);

    // フィールドの初期化
    this.field = new Array();
    for (let y: number = 0; y < Puzzle.STAGE_HEIGHT; y++) {
      this.field[y] = new Array(Puzzle.STAGE_WIDTH);
      for (let w: number = 0; w < Puzzle.STAGE_WIDTH; w++){
        this.field[y][w] = new Array(Puzzle.STAGE_WIDTH);
        for (let z: number = 0; z < Puzzle.STAGE_WIDTH; z++){
          this.field[y][w][z] = new Array(Puzzle.STAGE_WIDTH);
          for (let x: number = 0; x < Puzzle.STAGE_WIDTH; x++){
            this.field[y][w][z][x] = 0;
          }
        }
      }
    }

    // 所持ブロックの初期化
    this.currentBlock = new Array(Block.BLOCK_WIDTH);
    for (let y: number = 0; y < Block.BLOCK_WIDTH; y++) {
      this.currentBlock[y] = new Array(Block.BLOCK_WIDTH);
      for (let w: number = 0; w < Block.BLOCK_WIDTH; w++){
        this.currentBlock[y][w] = new Array(Block.BLOCK_WIDTH);
        for (let z: number = 0; z < Block.BLOCK_WIDTH; z++){
          this.currentBlock[y][w][z] = new Array(Block.BLOCK_WIDTH);
        }
      }
    }
    Block.blockMethod(this.currentBlock, (y: number, w: number, z: number, x: number) => {
      this.currentBlock[y][w][z][x] = 0;
    });

    this.position = new Vec4(null);
  }

  public initialize(): void {
    // カーソル位置の初期化
    this.fixPosition();

    // フィールドの初期化
    Puzzle.stageMethod(this.field, (y: number, w: number, z: number, x: number) => {
      if (x == 0 || x == Puzzle.STAGE_WIDTH - 1 || y == 0 || y == Puzzle.STAGE_HEIGHT - 1 || z == 0 || z == Puzzle.STAGE_WIDTH - 1 || w == 0 || w == Puzzle.STAGE_WIDTH - 1) {
        this.field[y][w][z][x] = 9;
      }
    });

    // ブロックの初期化
    this.createBlock(Math.floor(random(0, Block.BLOCK_TYPE_MAX)));

    // カメラの初期化
    Camera.initialize();
  }

  public update(): void {
    // カメラの移動
    Camera.update();

    if (keyIsPressed) {
      let prePos: Vec4 = new Vec4(this.position.x, this.position.y, this.position.z, this.position.w);
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
      if (this.position.equal(prePos) == false) {
        // 移動先にブロックがある場合,移動を無効化する
        if (this.collisionBlock(this.position) == true) {
          this.position.set(prePos.x, prePos.y, prePos.z, prePos.w);
        }
      }

      if (Input.getKeyDown('C')) {
        this.setBlock();
        this.createBlock(Math.floor(random(0, Block.BLOCK_TYPE_MAX)));
        this.fixPosition();
      }
    }

  }

  public draw(): void {
    background(255, 255, 255);
    // background(0);
    fill(0);
    noStroke();
    // ステージの描画
    Puzzle.stageMethod(this.field, (y: number, w: number, z: number, x: number) => {
      if (this.field[y][w][z][x] != 0 && this.field[y][w][z][x] != 8) {
        rect(w * (Puzzle.STAGE_WIDTH + 2) * Puzzle.BLOCK_SIZE + x * Puzzle.BLOCK_SIZE, z * (Puzzle.STAGE_HEIGHT + 2) * Puzzle.BLOCK_SIZE + y * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);
      }
    });

    // 移動中のブロックの描画
    Block.blockMethod(this.currentBlock, (y: number, w: number, z: number, x: number) => {
      if (this.currentBlock[y][w][z][x] != 0) {
        rect((w + this.position.w) * (Puzzle.STAGE_WIDTH + 2) * Puzzle.BLOCK_SIZE + (x + this.position.x) * Puzzle.BLOCK_SIZE, (z + this.position.z) * (Puzzle.STAGE_HEIGHT + 2) * Puzzle.BLOCK_SIZE + (y + this.position.y) * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);
      }
    });

    fill(255,0,0);
    rect(this.position.w * (Puzzle.STAGE_WIDTH + 2) * Puzzle.BLOCK_SIZE + this.position.x * Puzzle.BLOCK_SIZE, this.position.z * (Puzzle.STAGE_HEIGHT + 2) * Puzzle.BLOCK_SIZE + this.position.y * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);

    fill(0, 0, 255);
    box(30);
  }


  // フィールド全体に適用する処理
  static fieldMethod(_field: number[][][][], method: (_y: number, _w: number, _z: number, _x: number) => any): void {
    for (let y: number = Puzzle.FIELD_INDEX_MIN; y < Puzzle.FIELD_HEIGHT_INDEX_MAX; y++) {
      for (let w: number = Puzzle.FIELD_INDEX_MIN; w < Puzzle.FIELD_WIDTH_INDEX_MAX; w++) {
        for (let z: number = Puzzle.FIELD_INDEX_MIN; z < Puzzle.FIELD_WIDTH_INDEX_MAX; z++) {
          for (let x: number = Puzzle.FIELD_INDEX_MIN; x < Puzzle.FIELD_WIDTH_INDEX_MAX; x++) {
            method(y, w, z, x);
          }
        }
      }
    }
  }

  // ステージ全体に適用する処理
  static stageMethod(_field: number[][][][], method: (_y: number, _w: number, _z: number, _x: number) => any): void {
    for (let y: number = 0; y < Puzzle.STAGE_HEIGHT; y++) {
      for (let w: number = 0; w < Puzzle.STAGE_WIDTH; w++) {
        for (let z: number = 0; z < Puzzle.STAGE_WIDTH; z++) {
          for (let x: number = 0; x < Puzzle.STAGE_WIDTH; x++) {
            method(y, w, z, x);
          }
        }
      }
    }
  }

  // 新しいブロックを生成
  private createBlock(index: number): void{
    Block.blockMethod(this.currentBlock, (y: number, w: number, z: number, x: number) => {
      this.currentBlock[y][w][z][x] = Block.BLOCK_LIST[index][y][w][z][x];
    });
  }

  // ブロックの位置を固定する
  private setBlock(): void{
    Block.blockMethod(this.currentBlock, (y: number, w: number, z: number, x: number) => {
      if (this.currentBlock[y][w][z][x] != 0) {
        this.field[y + this.position.y][w + this.position.w][z + this.position.z][x + this.position.x] = this.currentBlock[y][w][z][x];
      }
    });
  }

  // カーソル位置を初期化
  private fixPosition(): void{
    this.position.set(Math.floor(Puzzle.STAGE_WIDTH / 2 - 1), 0, Math.floor(Puzzle.STAGE_WIDTH / 2 - 1), Math.floor(Puzzle.STAGE_WIDTH / 2 - 1));
  }

  // ブロックとフィールドの接触判定
  private collisionBlock(position: Vec4): boolean{
    let flag: boolean = false;
    Block.blockMethod(this.currentBlock, (y: number, w: number, z: number, x: number) => {
      // ブロックのないマスは無視
      if (this.currentBlock[y][w][z][x] == 0) {
        return;
      }
      // 移動先がフィールド外の場合も無視
      if (y + position.y < 0 || y + position.y >= Puzzle.STAGE_HEIGHT ||
        w + position.w < 0 || w + position.w >= Puzzle.STAGE_WIDTH ||
        z + position.z < 0 || z + position.z >= Puzzle.STAGE_WIDTH ||
        x + position.x < 0 || x + position.x >= Puzzle.STAGE_WIDTH) {
        return;
      }

      if (this.field[y + position.y][w + position.w][z + position.z][x + position.x] != 0) {
        flag = true;
      }
    });
    return flag;
  }

}
