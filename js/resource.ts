class Resource{
  private static RESOURCES: p5.Image[];
  private static RESOURCE_PATH: string[];

  public static initialize(): void {
    Resource.RESOURCES = new Array(RESOURCE_NUM);
    Resource.RESOURCE_PATH = new Array(RESOURCE_NUM);

    // パスの設定
    Resource.RESOURCE_PATH[RESOURCE_ID.BUTTON_ARROW] = 'Resources/buttonArrow.png';
    Resource.RESOURCE_PATH[RESOURCE_ID.BUTTON_STRAIGHT] = 'Resources/buttonStraight.png';
    Resource.RESOURCE_PATH[RESOURCE_ID.BUTTON_TURN] = 'Resources/buttonTurn.png';
  }

  public static getResource(id: RESOURCE_ID) {
    // 初読み込み時だけ，読み込み処理を行う
    if (Resource.RESOURCES[id] == undefined) {
      Resource.RESOURCES[id] = loadImage(Resource.RESOURCE_PATH[id]);
    }
    return Resource.RESOURCES[id];
  }

}

enum RESOURCE_ID {
  BUTTON_ARROW,
  BUTTON_STRAIGHT,
  BUTTON_TURN,
};
const RESOURCE_NUM: number = 3;

