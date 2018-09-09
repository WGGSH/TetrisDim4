class Scene{
  protected game: Game;

  constructor(_game: Game) {
    this.game = _game;
  }

  public initialize(): void{
  }

  public update(): void{

  }

  public draw(): void{

  }

  public draw2D(): void{
    
  }

  public draw3D(): void{
    
  }

}

enum SCENE{
  TITLE,
  PUZZLE,
}
const SCENE_NUM: number = 2;
