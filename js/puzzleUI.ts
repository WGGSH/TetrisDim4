class PuzzleUI{
  private puzzle: Puzzle;
  
  constructor(_puzzle:Puzzle) {
    this.puzzle = _puzzle;
  }

  public initialize(): void{
    
  }

  public update(): void{
    // クリック(タップ)した時にその位置によってボタンが押されたか判定する
    if (Input.MouseDown) {
      let mosuePos: Vec2 = Input.ClickPos;
      let targetPos: Vec2 = new Vec2(null);

      // 回転ボタン
      for (let i: number = 0; i < 4; i++){
        fill(255);
        targetPos.set(
          width / 2 + Puzzle.UI_HEIGHT / 4 * Math.cos(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX),
          height / 8 * 7 + Puzzle.UI_HEIGHT / 4 * Math.sin(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX)
        );
        // ellipse(targetPos.x, targetPos.y, Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT / 3);
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

      // W軸回転ボタン
      let buttonTurnWidth: number = Puzzle.UI_HEIGHT / 3;
      let buttonTurnHeight: number = Puzzle.UI_HEIGHT;
      let topPos: Vec2 = new Vec2(null);
      let bottomPos: Vec2 = new Vec2(null);
      for (let i: number = 0; i < 2; i++){
        targetPos.set(width / 2 + (i * 2 - 1) * Puzzle.UI_HEIGHT / 2, height - Puzzle.UI_HEIGHT);
        // rect(targetPos.x, targetPos.y, buttonTurnWidth * (i * 2 - 1), buttonTurnHeight);
        topPos.set(
          i==0 ? targetPos.x-buttonTurnWidth : targetPos.x,
          targetPos.y
        );
        bottomPos.set(
          (i == 0 ? targetPos.x  : targetPos.x + buttonTurnWidth),
          targetPos.y + buttonTurnHeight
        );
        // line(topPos.x, topPos.y, buttonPos.x, buttonPos.y);
        if (mosuePos.x >= topPos.x && mosuePos.x <= bottomPos.x && mosuePos.y >= topPos.y && mosuePos.y <= bottomPos.y) {
          this.puzzle.MoveVec.set(0, 0, 0, -(i * 2 - 1));
        }
      }

      // 上下移動ボタン
      for (let i: number = 0; i < 2; i++){
        targetPos.set(width / 2 + Puzzle.UI_HEIGHT / 6 * 5, height - Puzzle.UI_HEIGHT / 2);
        topPos.set(
          targetPos.x,
          i == 0 ? height - Puzzle.UI_HEIGHT : height - Puzzle.UI_HEIGHT / 2
        );
        bottomPos.set(
          targetPos.x + Puzzle.UI_HEIGHT / 3,
          i == 0 ? height - Puzzle.UI_HEIGHT / 2 : height
        );
        // line(topPos.x, topPos.y, bottomPos.x, bottomPos.y);
        if (mosuePos.x >= topPos.x && mosuePos.x <= bottomPos.x && mosuePos.y >= topPos.y && mosuePos.y <= bottomPos.y) {
          this.puzzle.MoveVec.set(0, (i * 2 - 1), 0, 0);
        }
      }
    }
  }

  public draw(): void{
    // fill(255);
    // noFill();
    fill(255);
    noStroke();
    translate(0, 0, 400);

    // 背景色
    fill(64, 64, 64);
    // rect(0, height / 4 * 3, width, height / 4, 1, 1);

    // 4方向矢印の描画
    push();
    translate(width / 2, height / 8 * 7);
    for (let i: number = 0; i < 4; i++) {
      push();
      rotate(radians(i * 90 - 60 * this.puzzle.Position.w - 60) - Camera.AngleX);
      translate(Puzzle.UI_HEIGHT / 4, 0);
      texture(Resource.getResource(RESOURCE_ID.BUTTON_ARROW));
      plane(Puzzle.UI_HEIGHT / 2, Puzzle.UI_HEIGHT / 2);
      noFill();
      stroke(128, 128, 128, 128);
      strokeWeight(1);
      pop();
    }
    pop();

    // 回転ボタンの描画
    push();
    translate(width / 2, height / 8 * 7);
    for (let i: number = 0; i < 2; i++){
      push();
      rotate(radians(i * 180));
      translate(Puzzle.UI_HEIGHT / 2 + Puzzle.UI_HEIGHT/6, 0);
      texture(Resource.getResource(RESOURCE_ID.BUTTON_TURN));
      plane(Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT * -(i * 2 - 1));
      pop();
    }
    pop();

    // 上下移動ボタンの描画
    push();
    translate(width / 2+Puzzle.UI_HEIGHT , height / 8 * 7);
    for (let i: number = 0; i < 2; i++){
      push();
      rotate(radians(i * 180));
      translate(0, Puzzle.UI_HEIGHT / 4);
      texture(Resource.getResource(RESOURCE_ID.BUTTON_STRAIGHT));
      plane(Puzzle.UI_HEIGHT / 3, Puzzle.UI_HEIGHT / 2.5);
      pop();
    }

    pop();
  }
}
