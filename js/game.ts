/// <reference path="p5.global-mode.d.ts" />

class Game {
  private sceneList: Scene[];
  private currentScene: SCENE;
  private nextScene: SCENE;

  constructor() {
    this.sceneList = new Array(SCENE_NUM);
    this.sceneList[SCENE.TITLE] = new Title(this);
    this.sceneList[SCENE.PUZZLE] = new Puzzle(this);

    this.currentScene = SCENE.TITLE;
    this.nextScene = this.currentScene;
    this.sceneList[this.currentScene].initialize();
  }

  public update(): void {
    background(0);
    this.sceneList[this.currentScene].update();
    this.sceneList[this.currentScene].draw();

    // シーンが変更されるなら，次のシーンを初期化する
    if (this.nextScene != this.currentScene) {
      this.currentScene = this.nextScene;
      this.sceneList[this.currentScene].initialize();
    }
  }

  public changeScene(_scene: SCENE): void{
    this.nextScene = _scene;
  }
}
