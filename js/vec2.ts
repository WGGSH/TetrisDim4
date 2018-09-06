class Vec2{
  public x: number;
  public y: number;

  constructor(_x: number, _y: number);
  constructor(_v: Vec2);
  constructor(_a: any);

  constructor(_a: any, _b?: any) {
    if (_a == null) {
      this.x = 0;
      this.y = 0;
      return;
    }

    if (_a instanceof Vec2) {
      this.x = _a.x;
      this.y = _a.y;
      return;
    }

    this.x = _a;
    this.y = _b;
    return;
  }
}
