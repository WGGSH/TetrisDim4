class Util{
  static screenWidth(scale: number) {
    return windowWidth * scale;
  }

  static screenHeight(scale: number) {
    return windowHeight * scale;
  }

  static for(min: number, max: number, method: (index:number)=>any):void {
    for (let i: number = min; i < max; i++){
      method(i);
    }
  }
}
