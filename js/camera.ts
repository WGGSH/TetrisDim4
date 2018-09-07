class Camera{
  static ROTATE_SPEED: number = 0.05;
  private static angleX: number = 0;
  private static angleY: number = 0;
  private static range: number = 100;
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
      if (Camera.angleY > Math.PI / 2) {
        Camera.angleY = Math.PI / 2;
      }
    }
    Camera.cameraDirection.set(
      Camera.range * Math.cos(Camera.angleX) * Math.cos(Camera.angleY),
      Camera.range * Math.sin(Camera.angleY),
      Camera.range * Math.sin(Camera.angleX) * Math.cos(Camera.angleY)
    );
    camera(Camera.cameraDirection.x, Camera.cameraDirection.y, Camera.cameraDirection.z,
      0, 0, 0, 0, 1, 0);
  }
}
