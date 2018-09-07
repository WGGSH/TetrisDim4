class Vec4{
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  constructor(_x: number, _y: number, _z: number, _w: number);
  constructor(_v: Vec4);
  constructor(_a: any);

  constructor(_a: any, _b?: any, _c?:any, _d?:any) {
    if (_a == null) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;
      return;
    }

    if (_a instanceof Vec4) {
      this.x = _a.x;
      this.y = _a.y;
      this.z = _a.z;
      this.w = _a.w;
      return;
    }

    this.x = _a;
    this.y = _b;
    this.z = _c;
    this.w = _d;
    return;
  }

  public set(_x:number, _y:number, _z:number, _w:number): void{
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.w = _w;
  }

  public equal(vec: Vec4): boolean{
    return (this.x == vec.x && this.y == vec.y && this.z == vec.z && this.w == vec.w);
  }
}
