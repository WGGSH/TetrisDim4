class Vec3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(_x: number, _y: number, _z: number);
  constructor(_v: Vec3);
  constructor(_a: any);

  constructor(_a: any, _b?: any, _c?: any) {
    if (_a == null) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      return;
    }

    if (_a instanceof Vec3) {
      this.x = _a.x;
      this.y = _a.y;
      this.z = _a.z;
      return;
    }

    this.x = _a;
    this.y = _b;
    this.z = _c;
    return;
  }

  public set(_x: number, _y: number, _z: number): void {
    this.x = _x;
    this.y = _y;
    this.z = _z;
  }

  public equal(vec: Vec3): boolean {
    return (this.x == vec.x && this.y == vec.y && this.z == vec.z);
  }
}
