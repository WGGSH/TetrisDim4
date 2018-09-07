class Block{
  static BLOCK_TYPE_MAX: number = 7; // 降ってくるブロックの種類の総数
  static BLOCK_WIDTH: number = 4; // 1組のブロックを格納する幅
  static BLOCK_LIST: number[][][][][]; // ブロックの配置リスト

  static initialize(): void{
    Block.BLOCK_LIST = new Array(Block.BLOCK_TYPE_MAX);

    for (let i: number = 0; i < 7; i++){
      Block.BLOCK_LIST[i] = new Array(Block.BLOCK_WIDTH);
      for (let y: number = 0; y < Block.BLOCK_WIDTH; y++){
        Block.BLOCK_LIST[i][y] = new Array(Block.BLOCK_WIDTH);
        for (let w: number = 0; w < Block.BLOCK_WIDTH; w++){
          Block.BLOCK_LIST[i][y][w] = new Array(Block.BLOCK_WIDTH);
          for (let z: number = 0; z < Block.BLOCK_WIDTH; z++){
            Block.BLOCK_LIST[i][y][w][z] = new Array(Block.BLOCK_WIDTH);
          }
        }
      }
      Block.blockMethod(Block.BLOCK_LIST[i], (y: number, w: number, z: number, x: number) => {
        Block.BLOCK_LIST[i][y][w][z][x] = 0;
      });
    }

    // 1種類ずつブロックの情報を設定していく
    // 1つ目: 正方形
    Block.BLOCK_LIST[0][1][1][1][1] = 1;
    Block.BLOCK_LIST[0][1][1][1][2] = 1;
    Block.BLOCK_LIST[0][2][1][1][1] = 1;
    Block.BLOCK_LIST[0][2][1][1][2] = 1;

    // 2つ目: I字(テトリス棒)
    Block.BLOCK_LIST[1][1][1][1][0] = 2;
    Block.BLOCK_LIST[1][1][1][1][1] = 2;
    Block.BLOCK_LIST[1][1][1][1][2] = 2;
    Block.BLOCK_LIST[1][1][1][1][3] = 2;

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
    Block.BLOCK_LIST[5][1][1][1][1] = 6;
    Block.BLOCK_LIST[5][1][1][1][2] = 6;
    Block.BLOCK_LIST[5][2][1][1][1] = 6;
    Block.BLOCK_LIST[5][1][1][2][1] = 6;

    // 7つ目: 3次元的形状その2
    Block.BLOCK_LIST[6][1][1][1][1] = 7;
    Block.BLOCK_LIST[6][1][1][1][2] = 7;
    Block.BLOCK_LIST[6][2][1][1][1] = 7;
    Block.BLOCK_LIST[6][1][1][2][2] = 7;
  }

  static blockMethod(_block: number[][][][], method: (_y: number, _w: number, _z: number, _x: number) => any): void{
    for (let y: number = 0; y < Block.BLOCK_WIDTH; y++){
      for (let w: number = 0; w < Block.BLOCK_WIDTH; w++){
        for (let z: number = 0; z < Block.BLOCK_WIDTH; z++){
          for (let x: number = 0; x < Block.BLOCK_WIDTH; x++){
            method(y, w, z, x);
          }
        }
      }
    }
  }
}
