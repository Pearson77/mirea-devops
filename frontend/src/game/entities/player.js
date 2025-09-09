import Phaser from "phaser";

import { Entity } from "./entity.js";

export class Player extends Entity {
    constructor(scene, x, y, is_mobile = false) {
        super(scene, x, y);

        this.scene = scene;
        this.last_side = false;  // Последняя сторона, в которую шел (true - вправо)
        this.is_mobile = is_mobile;  // true, если игра запущена с телефона

        const anims = this.scene.anims;
        const animsFrameRate = 10;

        let sprite;
        if (localStorage.getItem('gender') === 'М') {
            sprite = 'player';
        }
        else {
            sprite = 'player_girl';
        }

        if (!anims.exists('left'))
        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers(sprite, {
                frames: [16, 20, 19, 18, 17, 21],
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('right'))
        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers(sprite, {
                start: 8,
                end: 13
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('left_water'))
        anims.create({
            key: 'left_water',
            frames: anims.generateFrameNumbers(sprite, {
                start: 32,
                end: 39
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('right_water'))
        anims.create({
            key: 'right_water',
            frames: anims.generateFrameNumbers(sprite, {
                start: 24,
                end: 31
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('stop'))
        anims.create({
            key: 'stop',
            frames: anims.generateFrameNumbers(sprite, {
                start: 1,
                end: 1
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('stop_water'))
        anims.create({
            key: 'stop_water',
            frames: anims.generateFrameNumbers(sprite, {
                start: 48,
                end: 53
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('stop_right'))
        anims.create({
            key: 'stop_right',
            frames: anims.generateFrameNumbers(sprite, {
                start: 0,
                end: 0
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('stop_water_right'))
        anims.create({
            key: 'stop_water_right',
            frames: anims.generateFrameNumbers(sprite, {
                start: 40,
                end: 45
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('hide'))
        anims.create({
            key: 'hide',
            frames: anims.generateFrameNumbers(sprite, {
                start: 4,
                end: 5
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        this.play('stop', true);
    }

    stopMove(inWater = false) {
        this.setVelocity(0, 0);

        if (inWater) {
            this.play('stop_water', true);
        } else {
            this.play('stop', true);
        }
    }

    move(inWater = false) {
        if (this.scene.sceneStoped) {
            if (this.last_side) {
                this.play(inWater ? 'stop_water_right' : 'stop_right', true);
            }
            else {
                this.play(inWater ? 'stop_water' : 'stop', true);
            }
            this.setVelocity(0, 0);
            return;
        }

        let vx = 0, vy = 0;

        if (this.is_mobile)  // Если игра запущена с телефона
        {
            let pointer = this.scene.input.activePointer;

            if (pointer.isDown) {
                if (Phaser.Geom.Rectangle.Contains(this.scene.left_mobile_button.getBounds(), pointer.x, pointer.y)) {
                    this.last_side = false;
                    vx -= 5;
                }

                if (Phaser.Geom.Rectangle.Contains(this.scene.right_mobile_button.getBounds(), pointer.x, pointer.y)) {
                    this.last_side = true;
                    vx += 5;
                }

                if (Phaser.Geom.Rectangle.Contains(this.scene.up_mobile_button.getBounds(), pointer.x, pointer.y)) {
                    vy -= 5;
                }

                if (Phaser.Geom.Rectangle.Contains(this.scene.down_mobile_button.getBounds(), pointer.x, pointer.y)) {
                    vy += 5;
                }
            }
        }
        else  // Если игра запущена с ПК
        {
            if (this.scene.cursors.left.isDown || this.scene.keyA.isDown) {
                this.last_side = false;
                vx -= 5;
            }

            if (this.scene.cursors.right.isDown || this.scene.keyD.isDown) {
                this.last_side = true;
                vx += 5;
            }

            if (this.scene.cursors.up.isDown || this.scene.keyW.isDown) {
                vy -= 5;
            }

            if (this.scene.cursors.down.isDown || this.scene.keyS.isDown) {
                vy += 5;
            }
        }

        if (vx > 0)
        {
            this.play(inWater ? 'right_water' : 'right', true);
        }
        else if (vx < 0)
        {
            this.play(inWater ? 'left_water' : 'left', true);
        }
        else
        {
            if (this.last_side) {
                if (vy !== 0) {
                    this.play(inWater ? 'right_water' : 'right', true);
                }
                else {
                    this.play(inWater ? 'stop_water_right' : 'stop_right', true);
                }
            }
            else {
                if (vy !== 0) {
                    this.play(inWater ? 'left_water' : 'left', true);
                }
                else {
                    this.play(inWater ? 'stop_water' : 'stop', true);
                }
            }
        }

        this.setVelocity(vx, vy);
    }
}
