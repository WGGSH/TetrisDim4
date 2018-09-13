class Puzzle extends Scene {
  private ui: PuzzleUI; // UI

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
  private moveVec: Vec4; // 移動ベクトル

  static readonly BLOCK_DRAW_SIZE: number = 10; // 描画時のブロックの大きさ
  static readonly W_LENGTH: number = 16 * Puzzle.FIELD_WIDTH; // W用のずらし幅

  static UI_HEIGHT: number; //UI部の高さ(コンストラクタで初期化)

  public get Position(): Vec4{
    return this.position
  }

  public get MoveVec(): Vec4{
    return this.moveVec;
  }

  constructor(_game: Game) {
    super(_game);
    this.ui = new PuzzleUI(this);

    Puzzle.UI_HEIGHT = height / 5;

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
    this.moveVec = new Vec4(null);
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
      if (Input.getKeyDown('L')) {
        
      }

      // Cキーで，ブロックが接地していれば固定する
      if (Input.getKeyDown('C')) {
        this.fixBlock();
      }

    }
    if (!this.moveVec.equal(new Vec4(null))) {
      // 移動先にブロックがある場合,移動を無効化する
      let targetPos: Vec4 = new Vec4(this.position.x + this.moveVec.x, this.position.y + this.moveVec.y, this.position.z + this.moveVec.z, this.position.w + this.moveVec.w);
      if (this.collisionBlock(this.currentBlock, targetPos) == false) {
        this.position.set(targetPos.x, targetPos.y, targetPos.z, targetPos.w);
      }
    }

  }

  public draw(): void {
    // background(255, 255, 255);
    background(0);

    // this.drawUI();

    // this.draw3D();
    
  }

  public draw2D(): void{
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0 , 2000);

    this.ui.draw();

    // デバッグ用,クリック情報の描画
    push();
    if (Input.MouseDown) {
      fill(255, 0, 0);
      noStroke();
      ellipse(Input.MousePos.x, Input.MousePos.y, 15, 15);
    } else if (Input.MousePress) {
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

  }

  public draw3D(): void {
    // カメラの移動
    Camera.update();
    // return;
    push();
    strokeWeight(0.5);
    // fill(0, 128, 255);
    // noStroke();
    // フィールドの枠描画
    for (let w: number = Puzzle.FIELD_INDEX_MIN; w < Puzzle.FIELD_WIDTH_INDEX_MAX; w++){
      push();
      rotateY(w * Math.PI * 2 / (Puzzle.FIELD_WIDTH + 1));
      translate(-Puzzle.W_LENGTH, 0);
      translate(0.5 * Puzzle.BLOCK_DRAW_SIZE, Puzzle.BLOCK_DRAW_SIZE * (Puzzle.STAGE_HEIGHT - 1.5), 0.5 * Puzzle.BLOCK_DRAW_SIZE);
      push();
      rotateX(Math.PI / 2);
      // rect(0, 0, Puzzle.BLOCK_DRAW_SIZE * Puzzle.FIELD_WIDTH, Puzzle.BLOCK_DRAW_SIZE * Puzzle.FIELD_WIDTH,);
      for (let z: number = 0; z < Puzzle.FIELD_WIDTH; z++){
        for (let x: number = 0; x < Puzzle.FIELD_WIDTH; x++){
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
    Puzzle.fieldMethod(this.field, (y: number, w: number, z: number, x: number) => {
      if (this.field[y][w][z][x] == 0) {
        return;
      }
      push();
      stroke(Block.BLOCK_COLOR[this.field[y][w][z][x] - 1]);
      rotateY(w * Math.PI * 2 / (Puzzle.FIELD_WIDTH + 1));
      translate(-Puzzle.W_LENGTH, 0);
      translate(x * Puzzle.BLOCK_DRAW_SIZE, y * Puzzle.BLOCK_DRAW_SIZE, z * Puzzle.BLOCK_DRAW_SIZE);
      box(Puzzle.BLOCK_DRAW_SIZE);
      pop();
    });


    // 移動中ブロックの描画
    Block.blockMethod(this.currentBlock, (y: number, w: number, z: number, x: number) => {
      if (this.currentBlock[y][w][z][x] == 0) {
        return;
      }
      push();
      stroke(Block.BLOCK_COLOR[this.currentBlock[y][w][z][x] - 1]);
      rotateY((w + this.position.w) * Math.PI * 2 / (Puzzle.FIELD_WIDTH + 1));
      translate(-Puzzle.W_LENGTH, 0);
      translate((x + this.position.x) * Puzzle.BLOCK_DRAW_SIZE, (y + this.position.y) * Puzzle.BLOCK_DRAW_SIZE, (z + this.position.z) * Puzzle.BLOCK_DRAW_SIZE);
      box(Puzzle.BLOCK_DRAW_SIZE);
      pop();
    });

    // ゴーストブロックの描画
    // 落下可能距離を導出する
    let dropVec: Vec4 = new Vec4(null);
    let dropDist: number = 0;
    for (let y = this.position.y; y < Puzzle.STAGE_HEIGHT; y++){
      dropVec.set(this.position.x, y, this.position.z, this.position.w);
      if (this.collisionBlock(this.currentBlock, dropVec) == true) {
        dropDist = y - 1;
        break;
      }
    }

    // ゴーストを描画
    fill(0, 0, 0, 64);
    Block.blockMethod(this.currentBlock, (y: number, w: number, z: number, x: number) => {
      if (this.currentBlock[y][w][z][x] == 0) {
        return;
      }
      // TODO: ゴーストが移動中のブロックと重なっている場合,描画しない

      push();
      stroke(Block.BLOCK_COLOR[this.currentBlock[y][w][z][x] - 1]);
      rotateY((w + this.position.w) * Math.PI * 2 / (Puzzle.FIELD_WIDTH + 1));
      translate(-Puzzle.W_LENGTH, 0);
      translate((x + this.position.x) * Puzzle.BLOCK_DRAW_SIZE, (y+dropDist) * Puzzle.BLOCK_DRAW_SIZE, (z + this.position.z) * Puzzle.BLOCK_DRAW_SIZE);
      box(Puzzle.BLOCK_DRAW_SIZE);
      pop();
    });

    pop();
  }

  private draw2DField(): void{
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

    fill(255, 0, 0);
    rect(this.position.w * (Puzzle.STAGE_WIDTH + 2) * Puzzle.BLOCK_SIZE + this.position.x * Puzzle.BLOCK_SIZE, this.position.z * (Puzzle.STAGE_HEIGHT + 2) * Puzzle.BLOCK_SIZE + this.position.y * Puzzle.BLOCK_SIZE, Puzzle.BLOCK_SIZE - 2, Puzzle.BLOCK_SIZE - 2);

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

  // ブロック設置処理
  public fixBlock(): void{
    let dropVec: Vec4 = new Vec4(this.position.x, this.position.y + 1, this.position.z, this.position.w);
    if (this.collisionBlock(this.currentBlock, dropVec) == true) {
      this.setBlock();
      this.createBlock(Math.floor(random(0, Block.BLOCK_TYPE_MAX)));
      this.fixPosition();
    }
  }

  // ブロックとフィールドの接触判定
  private collisionBlock(block: number[][][][], position: Vec4): boolean {
    let flag: boolean = false;
    Block.blockMethod(block, (y: number, w: number, z: number, x: number) => {
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

      if (this.field[y + position.y][w + position.w][z + position.z][x + position.x] != 0) {
        flag = true;
      }
    });
    return flag;
  }

  public blockRotate(axis: Axis4): void{
    let val: number = -1;
    let rotBlock: number[][][][] = new Array(Block.BLOCK_WIDTH);
    for (let y: number = 0; y < Block.BLOCK_WIDTH; y++){
      rotBlock[y] = new Array(Block.BLOCK_WIDTH);
      for (let w: number = 0; w < Block.BLOCK_WIDTH; w++){
        rotBlock[y][w] = new Array(Block.BLOCK_WIDTH);
        for (let z: number = 0; z < Block.BLOCK_WIDTH; z++){
          rotBlock[y][w][z] = new Array(Block.BLOCK_WIDTH);
          for (let x: number = 0; x < Block.BLOCK_WIDTH; x++){
            rotBlock[y][w][z][x] = 0;
          }
        }
      }
    }

    if (axis.xy == -1) val = 0;
    if (axis.xy == 1) val = 1;
    if (axis.xz == -1) val = 2;
    if (axis.xz == 1) val = 3;
    if (axis.xw == -1) val = 4;
    if (axis.xw == 1) val = 5;
    if (axis.yz == -1) val = 6;
    if (axis.yz == 1) val = 7;
    if (axis.yw == -1) val = 8;
    if (axis.yw == 1) val = 9;
    if (axis.zw == -1) val = 10;
    if (axis.zw == 1) val = 11;

    Block.blockMethod(rotBlock, (y: number, w: number, z: number, x: number) => {
      if (this.currentBlock[y][w][z][x] == 0) {
        return;
      }
      // rotBlock[y][w][z][x] = this.currentBlock[y][w][z][x];
      switch (val) {
        case 0: // XY-1
          rotBlock[y][z][Block.BLOCK_WIDTH - 1 - w][x] = this.currentBlock[y][w][z][x];
          break;
        case 1: // XY-2
          rotBlock[y][Block.BLOCK_WIDTH - 1 - z][w][x] = this.currentBlock[y][w][z][x];
          break;
        case 2: // XZ-1
          rotBlock[w][Block.BLOCK_WIDTH - 1 - y][z][x] = this.currentBlock[y][w][z][x];
          break;
        case 3: // XZ-2
          rotBlock[Block.BLOCK_WIDTH - 1 - w][y][z][x] = this.currentBlock[y][w][z][x];
          break;
        case 4: // XW-1
          rotBlock[z][w][Block.BLOCK_WIDTH - 1 - y][x] = this.currentBlock[y][w][z][x];
          break;
        case 5: // XW-2
          rotBlock[Block.BLOCK_WIDTH - 1 - z][w][y][x] = this.currentBlock[y][w][z][x];
          break;
        case 6: // YZ-1
          rotBlock[y][x][z][Block.BLOCK_WIDTH - 1 - w] = this.currentBlock[y][w][z][x];
          break;
        case 7: // YZ-2
          rotBlock[y][Block.BLOCK_WIDTH - 1 - x][z][w] = this.currentBlock[y][w][z][x];
          break;
        case 8: // YW-1
          rotBlock[y][w][x][Block.BLOCK_WIDTH - 1 - z] = this.currentBlock[y][w][z][x];
          break;
        case 9: // YW-2
          rotBlock[y][w][Block.BLOCK_WIDTH - 1 - x][z] = this.currentBlock[y][w][z][x];
          break;
        case 10: // ZW-1
          rotBlock[x][w][z][Block.BLOCK_WIDTH - 1 - y] = this.currentBlock[y][w][z][x];
          break;
        case 11: // ZW-2
          rotBlock[Block.BLOCK_WIDTH - 1 - x][w][z][y] = this.currentBlock[y][w][z][x];
          break;
      }
    });

    // 回転後のブロックがフィールドに重なっていないか確認
    if (this.collisionBlock(rotBlock, this.position) == true) {
      return;
    }

    // 回転後のブロックを現在のブロックに反映する
    Block.blockMethod(this.currentBlock, (y: number, w: number, z: number, x: number) => {
      this.currentBlock[y][w][z][x] = rotBlock[y][w][z][x];
    });

  }

}
