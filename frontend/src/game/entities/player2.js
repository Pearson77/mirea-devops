import { Entity } from "./entity.js";
import Phaser from "phaser";

export class Player1 extends Entity {
    constructor(scene, x, y, is_mobile = false) {
        super(scene, x, y);

        this.scene = scene;
        this.last_side = false;  // Последняя сторона, в которую шел (true - вправо)
        this.is_mobile = is_mobile;  // true, если игра запущена с телефона

        let sprite;
        if (localStorage.getItem('gender') === 'М') {
            sprite = 'player1';
        }
        else {
            sprite = 'player_girl1';
        }

        const anims = this.scene.anims;
        const animsFrameRate = 10;

        if (!anims.exists('left1'))
        anims.create({
            key: 'left1',
            frames: anims.generateFrameNumbers(sprite, {
                frames: [21, 20, 19, 18, 17, 16],
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('right1'))
        anims.create({
            key: 'right1',
            frames: anims.generateFrameNumbers(sprite, {
                start: 8,
                end: 13
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('left_water1'))
        anims.create({
            key: 'left_water1',
            frames: anims.generateFrameNumbers(sprite, {
                start: 32,
                end: 39
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('right_water1'))
        anims.create({
            key: 'right_water1',
            frames: anims.generateFrameNumbers(sprite, {
                start: 24,
                end: 31
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        if (!anims.exists('stop1'))
            anims.create({
                key: 'stop1',
                frames: anims.generateFrameNumbers(sprite, {
                    start: 1,
                    end: 1
                }),
                frameRate: animsFrameRate,
                repeat: -1
            });

        if (!anims.exists('stop_water1'))
            anims.create({
                key: 'stop_water1',
                frames: anims.generateFrameNumbers(sprite, {
                    start: 48,
                    end: 53
                }),
                frameRate: animsFrameRate,
                repeat: -1
            });

        if (!anims.exists('stop_right1'))
            anims.create({
                key: 'stop_right1',
                frames: anims.generateFrameNumbers(sprite, {
                    start: 0,
                    end: 0
                }),
                frameRate: animsFrameRate,
                repeat: -1
            });

        if (!anims.exists('stop_water_right1'))
            anims.create({
                key: 'stop_water_right1',
                frames: anims.generateFrameNumbers(sprite, {
                    start: 40,
                    end: 45
                }),
                frameRate: animsFrameRate,
                repeat: -1
            });

        this.play('stop1', true);
    }

    stopMove(inWater = false) {
        this.setVelocity(0, 0);

        if (inWater) {
            this.play('stop_water1', true);
        } else {
            this.play('stop1', true);
        }
    }

    move(inWater = false) {
        if (this.scene.sceneStoped) {
            if (this.last_side) {
                this.play(inWater ? 'stop_water_right1' : 'stop_right1', true);
            }
            else {
                this.play(inWater ? 'stop_water1' : 'stop1', true);
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
            this.play(inWater ? 'right_water1' : 'right1', true);
        }
        else if (vx < 0)
        {
            this.play(inWater ? 'left_water1' : 'left1', true);
        }
        else
        {
            if (this.last_side) {
                if (vy !== 0) {
                    this.play(inWater ? 'right_water1' : 'right1', true);
                }
                else {
                    this.play(inWater ? 'stop_water_right1' : 'stop_right1', true);
                }
            }
            else {
                if (vy !== 0) {
                    this.play(inWater ? 'left_water1' : 'left1', true);
                }
                else {
                    this.play(inWater ? 'stop_water1' : 'stop1', true);
                }
            }
        }

        this.setVelocity(vx, vy);
    }
}
