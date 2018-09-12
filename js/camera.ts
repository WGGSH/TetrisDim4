class Camera{
  static ROTATE_SPEED: number = 0.02;
  private static angleX: number = 150 / 180 * Math.PI;
  private static angleY: number = -35 / 180 * Math.PI;
  private static range: number = 150;
  private static cameraDirection: Vec3 = new Vec3(0,0,0);

  public static initialize(): void{
    ambientLight(100);
    directionalLight(120, 120, 120, -1, -1, -1);
    ambientMaterial(230, 210, 255, 255);
  }

  public static update(): void{
    if (Input.MousePress) {
      this.angleX += (Input.MousePos.x - Input.PreMousePos.x) * Camera.ROTATE_SPEED;
      this.angleY += (Input.MousePos.y - Input.PreMousePos.y) * Camera.ROTATE_SPEED;

      if (Camera.angleY < -Math.PI / 2) {
        Camera.angleY = -Math.PI / 2;
      }
      if (Camera.angleY > Math.PI / 180 * 15) {
        Camera.angleY = Math.PI / 180 * 15;
      }
    }
    Camera.cameraDirection.set(
      Camera.range * Math.cos(Camera.angleX) * Math.cos(Camera.angleY),
      Camera.range * Math.sin(Camera.angleY),
      Camera.range * Math.sin(Camera.angleX) * Math.cos(Camera.angleY)
    );

    let cameraZ = height / 2 / tan(60 / 180 * PI);
    perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);
    camera(Camera.cameraDirection.x, Camera.cameraDirection.y, Camera.cameraDirection.z, 0, Puzzle.STAGE_HEIGHT * Puzzle.BLOCK_DRAW_SIZE / 4 * 3, 0, 0, 1, 0);
  }
}
