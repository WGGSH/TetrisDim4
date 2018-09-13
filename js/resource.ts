class Resource{
  private static RESOURCES: p5.Image[];
  private static RESOURCE_PATH: string[];

  public static initialize(): void {
    Resource.RESOURCES = new Array(RESOURCE_NUM);
    Resource.RESOURCE_PATH = new Array(RESOURCE_NUM);

    // パスの設定
    Resource.RESOURCE_PATH[RESOURCE_ID.BUTTON_ARROW] = 'Resources/buttonArrow.png';
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
};
const RESOURCE_NUM: number = 1;

