"use strict";
var Camera = /** @class */ (function () {
    function Camera() {
    }
    Object.defineProperty(Camera, "AngleX", {
        get: function () {
            return Camera.angleX;
        },
        enumerable: true,
        configurable: true
    });
    Camera.initialize = function () {
        ambientLight(100);
        directionalLight(120, 120, 120, -1, -1, -1);
        ambientMaterial(230, 210, 255, 255);
    };
    Camera.update = function () {
        if (Input.MousePress) {
            // クリックした箇所がUI部以外ならカメラアングルを変更する処理を行う
            if (Input.ClickPos.y < height / 4 * 3) {
                this.angleX += (Input.MousePos.x - Input.PreMousePos.x) * Camera.ROTATE_SPEED;
                this.angleY += (Input.MousePos.y - Input.PreMousePos.y) * Camera.ROTATE_SPEED;
            }
            if (Camera.angleY < -Math.PI / 2) {
                Camera.angleY = -Math.PI / 2;
            }
            if (Camera.angleY > Math.PI / 180 * 15) {
                Camera.angleY = Math.PI / 180 * 15;
            }
        }
        Camera.cameraDirection.set(Camera.range * Math.cos(Camera.angleX) * Math.cos(Camera.angleY), Camera.range * Math.sin(Camera.angleY), Camera.range * Math.sin(Camera.angleX) * Math.cos(Camera.angleY));
        var cameraZ = height / 2 / tan(60 / 180 * PI);
        perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);
        camera(Camera.cameraDirection.x, Camera.cameraDirection.y, Camera.cameraDirection.z, 0, Puzzle.STAGE_HEIGHT * Puzzle.BLOCK_DRAW_SIZE / 4 * 3, 0, 0, 1, 0);
    };
    Camera.ROTATE_SPEED = 0.02;
    Camera.angleX = 150 / 180 * Math.PI;
    Camera.angleY = -35 / 180 * Math.PI;
    Camera.range = 150;
    Camera.cameraDirection = new Vec3(0, 0, 0);
    return Camera;
}());
