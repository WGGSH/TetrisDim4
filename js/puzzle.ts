class Puzzle extends Scene {
  static readonly FIELD_WIDTH: number = 5; // フィールドの高さ以外の幅
  static readonly STAGE_WIDTH: number = Puzzle.FIELD_WIDTH + 2;
  static readonly FIELD_HEIGHT: number = 10; // フィールドの高さ
  static readonly STAGE_HEIGHT: number = Puzzle.FIELD_HEIGHT + 2;

  // フィールド内部をループするためのインデックス定数
  static readonly FIELD_INDEX_MIN: number = 1;
  static readonly FIELD_HEIGHT_INDEX_MAX: number = Puzzle.FIELD_HEIGHT + 1;
  static readonly FIELD_WIDTH_INDEX_MAX: number = Puzzle.FIELD_WIDTH + 1;

  private field: number[][][][]; // [Y][W][Z][X]
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

    this.position = new Vec4(null);
  }

  public initialize(): void {
    
  }

  public update(): void {
  }

  public draw(): void{
    background(255, 255, 255);
  }
}
