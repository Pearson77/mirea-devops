export class help {
    constructor(scene, x, y, textKey) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.textKey = textKey;

        this.visible = false;
        this.showed = false;
        this.elements = []; // Массив для хранения элементов подсказки
    }

    createTooltip() {
        // Затемнение сцены
        this.darkOverlay = this.scene.add.graphics();
        this.darkOverlay.fillStyle(0x000000, 0.15); // Черный цвет с прозрачностью 15%
        this.darkOverlay.fillRect(0, 0, this.scene.sys.game.config.width + 200, this.scene.sys.game.config.height + 200);
        this.darkOverlay.setVisible(false);
        this.elements.push(this.darkOverlay);

        // Облако текста
        this.text = this.scene.add.image(this.x + 200, this.y - 170, this.textKey);
        this.text.visible = false;
        this.elements.push(this.text);

        // Текст сверху как закрыть подсказку
        this.textHelp = this.scene.add.image(960, 75, 'textHelp');
        this.textHelp.visible = false;
        this.elements.push(this.textHelp);

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.ded = this.scene.add.image(this.x, this.y, 'плавать_нельзя');
        this.ded.visible = false;
        this.elements.push(this.ded);

        // Анимация текста подсказки
        this.scene.tweens.add({
            targets: this.textHelp,
            scale: { from: 0.95, to: 1.05 },  // Меняем масштаб от 0.95 до 1.05
            duration: 1000,                   // Длительность одного цикла (в мс)
            yoyo: true,                       // Возврат к начальному значению
            repeat: -1,                       // Бесконечное повторение
            ease: 'Sine.easeInOut'            // Плавное ускорение/замедление
        });

        // Обработчик кликов
        this.setupClickHandler();
    }

    setupClickHandler() {
        // Закрытие при клике вне подсказки
        this.scene.input.on('pointerdown', () => {
            this.hide();
        });
    }

    show() {
        this.createTooltip();
        this.visible = true;
        this.scene.sceneStoped = true;

        // Анимация появления всех элементов
        this.scene.tweens.add({
            targets: this.elements,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.9, to: 1 },
            duration: 250,
            ease: 'Quad.out'
        });

        // this.elements.forEach(el => {
        //     console.log(el)
        // })
        // Анимация появления дельфина
        // this.dolphin.play('up')
        // this.dolphin.play('static')
    }

    hide() {
        if (this.showed) return;

        this.visible = false;
        this.scene.sceneStoped = false;
        this.showed = true;

        // this.dolphin.play('down');

        // Анимация исчезновения всех элементов
        this.scene.tweens.add({
            targets: this.elements.shift(2),
            alpha: 0,
            scale: 0.9,
            duration: 250,
            onComplete: () => {
                this.elements.forEach(el => {
                    el.setVisible(false);
                    el.setActive(false);
                    el.destroy();
                });
            }
        });
    }

    destroy() {
        // Удаляем все элементы
        this.elements.forEach(el => el.destroy());
        this.elements = [];

        // Удаляем обработчик
        this.scene.input.off('pointerdown');
    }
}