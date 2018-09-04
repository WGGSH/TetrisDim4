class Vec2{
  public x: number;
  public y: number;

  constructor(_x: number, _y: number);
  constructor(_v: Vec2);
  constructor(_a: any);

  constructor(a: any, b?: any) {
    if (a == null) {
      this.x = 0;
      this.y = 0;
      return;
    }

    this.x = a;
    this.y = b;
    return;
  }
}
