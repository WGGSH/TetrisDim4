/// <reference path="p5.global-mode.d.ts" />

class Game{
  private sceneList: Scene[];
  private currentScene: number;

  constructor(){
    this.sceneList = new Array(1);
    this.sceneList[0] = new Title(this);

    this.currentScene = 0;
    this.sceneList[this.currentScene].initialize();
  }

  public update(): void{
    background(0);
    this.sceneList[this.currentScene].update();
    this.sceneList[this.currentScene].draw();
  }
}
