import Phaser from "phaser";

import rebusBackground from "/src/assets/rebus_02/rebus_02.png";
import finalScreen from "/src/assets/final_rebus_screen.png";

// Варианты ответов
import word_1 from "/src/assets/rebus_02/word_1.png";
import word_2 from "/src/assets/rebus_02/word_2.png";
import word_3 from "/src/assets/rebus_02/word_3.png";
import word_4 from "/src/assets/rebus_02/word_4.png";

import word_1_F from "/src/assets/rebus_02/word_1_F.png";
import word_2_F from "/src/assets/rebus_02/word_2_F.png";
import word_3_F from "/src/assets/rebus_02/word_3_F.png";
import word_4_F from "/src/assets/rebus_02/word_4_F.png";

export class RebusScene02 extends Phaser.Scene {
    constructor() {
        super("RebusScene2");
    }

    preload() {
        // Фон ребуса
        this.load.image("rebus_bg", rebusBackground);
        this.load.image("final_screen", finalScreen);

        // Варианты ответов
        this.load.image("word_1", word_1);
        this.load.image("word_2", word_2);
        this.load.image("word_3", word_3);
        this.load.image("word_4", word_4);

        this.load.image("word_1_F", word_1_F);
        this.load.image("word_2_F", word_2_F);
        this.load.image("word_3_F", word_3_F);
        this.load.image("word_4_F", word_4_F);
    }

    create() {
        // Фон
        this.add.image(0, 0, "rebus_bg").setOrigin(0, 0);

        // Варианты ответов — шире и крупнее
        this.answers = [
            { key: "word_1", final: "word_1_F", x: 400,  y: 870, isTrue: false },
            { key: "word_2", final: "word_2_F", x: 670,  y: 870, isTrue: false },
            { key: "word_3", final: "word_3_F", x: 1090, y: 870, isTrue: false },
            { key: "word_4", final: "word_4_F", x: 1500, y: 870, isTrue: true  },
        ];

        this.answers.forEach((ans) => {
            let img = this.add.image(ans.x, ans.y, ans.key)
                .setScale(1.5) // увеличиваем
                .setInteractive({ useHandCursor: true })
                .setData("finalKey", ans.final)
                .setData("isTrue", ans.isTrue);

            img.on("pointerdown", () => this.toggleAnswer(img));
        });

        // Финальный экран
        this.finalScreen = this.add.image(0, 0, "final_screen")
            .setOrigin(0, 0)
            .setVisible(false);
    }

    toggleAnswer(img) {
        let finalKey = img.getData("finalKey");
        let isTrue = img.getData("isTrue");

        // Меняем текстуру на вариант с ответом
        img.setTexture(finalKey);

        // Если ответ правильный → показать финальный экран
        if (isTrue) {
            this.finalScreen.setVisible(true);
        }
    }
}
