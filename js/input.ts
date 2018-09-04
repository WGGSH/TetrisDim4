/// <reference path="p5.global-mode.d.ts" />

class Input{
  private mousePressCount: number; // マウスボタンが押され続けたフレーム数
  private mosueReleaseCount: number; // マウスボタンが離され続けたフレーム数
  private mousePos: Vec2; // 現在のマウス座標
  private preMousePos: Vec2; // 直前フレームのマウス座標
  private clickedPos: Vec2; // 最後にクリックした時のマウス座標

  constructor() {
    this.mousePressCount = 0;
    this.mosueReleaseCount = 0;
    this.mousePos = new Vec2(null);
    this.preMousePos = new Vec2(null);
    this.clickedPos = new Vec2(null);
  }

  public update() {
    if (mouseIsPressed) {
      this.mousePressCount++;
      this.mosueReleaseCount = 0;
      if (this.MouseDown) {
        // クリック時のマウス座標を記録
        this.clickedPos.x = mouseX;
        this.clickedPos.y = mouseY;
      }
    } else {
      this.mousePressCount = 0;
      this.mosueReleaseCount++;
    }

    this.preMousePos.x = this.mousePos.x;
    this.preMousePos.y = this.mousePos.y;

    this.mousePos.x = mouseX;
    this.mousePos.y = mouseY;
  }

  get MouseDown(): boolean{
    return this.mousePressCount == 1;
  }

  get MousePress(): boolean{
    return this.mousePressCount >= 1;
  }

  get MouseUp(): boolean{
    return this.mosueReleaseCount == 1;
  }

  get MousePos(): Vec2{
    return this.mousePos;
  }

  get PreMousePos(): Vec2{
    return this.preMousePos;
  }
}
