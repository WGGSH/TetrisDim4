"use strict";
var Resource = /** @class */ (function () {
    function Resource() {
    }
    Resource.initialize = function () {
        Resource.RESOURCES = new Array(RESOURCE_NUM);
        Resource.RESOURCE_PATH = new Array(RESOURCE_NUM);
        // パスの設定
        Resource.RESOURCE_PATH[RESOURCE_ID.BUTTON_ARROW] = 'Resources/buttonArrow.png';
    };
    Resource.getResource = function (id) {
        // 初読み込み時だけ，読み込み処理を行う
        if (Resource.RESOURCES[id] == undefined) {
            Resource.RESOURCES[id] = loadImage(Resource.RESOURCE_PATH[id]);
        }
        return Resource.RESOURCES[id];
    };
    return Resource;
}());
var RESOURCE_ID;
(function (RESOURCE_ID) {
    RESOURCE_ID[RESOURCE_ID["BUTTON_ARROW"] = 0] = "BUTTON_ARROW";
})(RESOURCE_ID || (RESOURCE_ID = {}));
;
var RESOURCE_NUM = 1;
