import { Entity } from "./entity.js";

export class Dolphin extends Entity {
    constructor(
        scene, x, y, isInverted = false, isSpeak = false, texture = "dolphin"
    )
    {
        super(scene, x, y, true);
        this.texture = texture;

        const animsFrameRate = 10;

        let keyUp = isInverted ? 'up_inverse' : 'up';
        let keyStatic = isInverted ? 'static_inverse' : 'static';
        let keyDown = isInverted ? 'down_inverse' : 'down';

        if (!this.scene.anims.exists(keyUp))
        this.scene.anims.create({
            key: keyUp,
            frames: this.scene.anims.generateFrameNumbers(texture, {
                frames:
                    isInverted
                        ? [31, 32, 33, 34, 35, 36, 37]
                        : [38, 37, 36, 35, 34, 33, 32]
            }),
            frameRate: animsFrameRate,
            repeat: 0
        });

        if (!this.scene.anims.exists(keyStatic))
        this.scene.anims.create({
            key: keyStatic,
            frames: this.scene.anims.generateFrameNumbers(texture, {
                start: isSpeak ? 24 : 18,
                end: isSpeak ? 25 : 19,
            }),
            frameRate: animsFrameRate * 0.4,
            repeat: -1
        });

        if (!this.scene.anims.exists(keyDown))
        this.scene.anims.create({
            key: keyDown,
            frames: this.scene.anims.generateFrameNumbers(texture, {
                frames:
                    isInverted
                        ? [8, 9, 10, 11, 12, 13, 14]
                        : [13, 12, 11, 10, 9, 8, 7]
            }),
            frameRate: animsFrameRate,
            repeat: 0
        });

        this.scene.anims.addMix(keyDown, keyUp, 1000);
        this.scene.anims.addMix(keyUp, keyStatic, 1000);
    }
}