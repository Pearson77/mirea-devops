export class Entity extends Phaser.Physics.Arcade.Sprite {
    /*
        Базовый класс, от которого наследуются все сущности
        (пока - только персонаж и дельфинчик)
    */

    constructor(scene, x, y, withoutCollision = false) {
        super(scene, x, y);

        this.scene = scene;
        this.scene.add.existing(this);

        let options = {
            shape: {
                type: 'rectangle',
                width: 166,
                height: 233
            }
        }

        if (withoutCollision) {
            options['collisionFilter'] = {
                group: -1,
                category: 0,
                mask: 0
            }
        }

        this.scene.matter.add.gameObject(this, options);
        this.setFixedRotation();
    }
}