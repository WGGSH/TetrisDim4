/// <reference path="p5.global-mode.d.ts" />

class Input{
  private static mousePressCount: number = 0; // マウスボタンが押され続けたフレーム数
  private static mosueReleaseCount: number = 0; // マウスボタンが離され続けたフレーム数
  private static mousePos: Vec2 = new Vec2(null); // 現在のマウス座標
  private static preMousePos: Vec2 = new Vec2(null); // 直前フレームのマウス座標
  private static clickedPos: Vec2 = new Vec2(null); // 最後にクリックした時のマウス座標
  private static keyCount: number[] = new Array(256); // 各キーの入力状態

  public static update(): void {
    Input.mouseUpdate();
    Input.keyboardUpdate();
  }

  // マウス(タップ)の入力状態更新
  private static mouseUpdate(): void {
    if (mouseIsPressed) {
      Input.mousePressCount++;
      Input.mosueReleaseCount = 0;
      if (Input.MouseDown) {
        // クリック時のマウス座標を記録
        Input.clickedPos.x = mouseX;
        Input.clickedPos.y = mouseY;
      }
    } else {
      Input.mousePressCount = 0;
      Input.mosueReleaseCount++;
    }

    Input.preMousePos.x = Input.mousePos.x;
    Input.preMousePos.y = Input.mousePos.y;

    Input.mousePos.x = mouseX;
    Input.mousePos.y = mouseY;
  }

  // キーボードの入力状態更新
  private static keyboardUpdate(): void{
    // if (keyIsPressed) {
    //   console.log(key);
    // }

    for (let i = 0; i < 256; i++){
      if (Input.keyCount[i] >= 1) {
        Input.keyCount[i]++;
        console.log(i + ":" + Input.keyCount[i]);
      }
    }

  }

  public static keyPress(_key: string): void{
    Input.keyCount[_key.charCodeAt(0)] = 1;
  }

  public static keyRelease(_key: string): void{
    Input.keyCount[_key.charCodeAt(0)] = 0;
  }

  static get MouseDown(): boolean{
    return Input.mousePressCount == 1;
  }

  static get MousePress(): boolean{
    return Input.mousePressCount >= 1;
  }

  static get MouseUp(): boolean{
    return Input.mosueReleaseCount == 1;
  }

  static get MousePos(): Vec2{
    return Input.mousePos;
  }

  static get PreMousePos(): Vec2{
    return Input.preMousePos;
  }
}

function keyPressed() {
  Input.keyPress(key);
}

function keyReleased() {
  Input.keyRelease(key);
}
