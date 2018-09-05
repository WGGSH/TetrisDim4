class Title extends Scene{
  constructor(_game:Game) {
    super(_game);
  }

  public initialize(): void{
    
  }

  public update(): void{
    
  }

  public draw(): void{
    fill(255);
    if (Input.MousePress) {
      triangle(Input.MousePos.x, Input.MousePos.y, Util.screenWidth(0.5), Util.screenHeight(0.5), Util.screenWidth(0.75), Util.screenHeight(0.75));
    }
  }
}
