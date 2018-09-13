class Axis4{
  public xy: number;
  public xz: number;
  public xw: number;
  public yz: number;
  public yw: number;
  public zw: number;

  constructor(_xy: number, _xz: number, xw: number, yz: number,yw:number,zw:number);
  constructor(_v: Axis4);
  constructor(_a: any);
  
  constructor(_a: any, _b?: any, _c?: any, _d?: any, _e?:any,_f?:any) {
    if (_a == null) {
      this.xy = 0;
      this.xz = 0;
      this.xw = 0;
      this.yz = 0;
      this.yw = 0;
      this.zw = 0;
      return;
    }

    if (_a instanceof Axis4) {
      this.xy = _a.xy;
      this.xz = _a.xz;
      this.xw = _a.xw;
      this.yz = _a.yz;
      this.yw = _a.yw;
      this.zw = _a.zw;
      return;
    }

    this.xy = _a;
    this.xz = _b;
    this.xw = _c;
    this.yz = _d;
    this.yw = _e;
    this.zw = _f;
    return;
  }

  public set(_xy: number, _xz: number, _xw: number, _yz: number, _yw: number, _zw: number): void{
    this.xy = _xy;
    this.xz = _xz;
    this.xw = _xw;
    this.yz = _yz;
    this.yw = _yw;
    this.zw = _zw;
  }
}
