export class Arrow{

    constructor (scene, x, y, text_key) {
        this.scene = scene;

        this.arrow = this.scene.add.image(x, y, text_key)

        this.animation = this.scene.tweens.add({
            targets: this.arrow,
            y: {
                from: y - 20,  // На 20 пикселей выше текущего
                to: y
            },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    destroy(){
        this.arrow.destroy()
        this.animation.destroy()
    }
}
