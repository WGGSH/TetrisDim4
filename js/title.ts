class Title extends Scene{
  constructor(_game:Game) {
    super(_game);
  }

  public initialize(): void{
    
  }

  public update(): void{
    this.game.changeScene(SCENE.PUZZLE);

    if (Input.getKeyDown('A')) {
      this.game.changeScene(SCENE.PUZZLE);
    }
  }

  public draw(): void{
    fill(255,0,0);
    stroke(255,0,0);
    // text('hoge', 240, 240);
  }

  public draw2D(): void{
    
  }

  public draw3D(): void{
    
  }
}
