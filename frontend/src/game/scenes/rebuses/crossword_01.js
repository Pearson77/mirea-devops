import Phaser from "phaser";

// Фон + финал
import crosswordBackground from "/src/assets/crossword_01/crossword_01.png";
import finalScreen from "/src/assets/final_rebus_screen.png";

// Слова в кроссворде
import word_in_crossword_1 from "/src/assets/crossword_01/word_01.png";
import word_in_crossword_2 from "/src/assets/crossword_01/word_02.png";
import word_in_crossword_3 from "/src/assets/crossword_01/word_03.png";

// Вопросы
import question_1 from "/src/assets/crossword_01/question_01.png";
import question_2 from "/src/assets/crossword_01/question_02.png";
import question_3 from "/src/assets/crossword_01/question_03.png";
import question_1_dark from "/src/assets/crossword_01/question_01_dark.png";
import question_2_dark from "/src/assets/crossword_01/question_02_dark.png";
import question_3_dark from "/src/assets/crossword_01/question_03_dark.png";

// Ответы
import word_1_1 from "/src/assets/crossword_01/word_01/word_01_01.png";
import word_1_2 from "/src/assets/crossword_01/word_01/word_01_02.png";
import word_1_3 from "/src/assets/crossword_01/word_01/word_01_03.png";
import word_1_4 from "/src/assets/crossword_01/word_01/word_01_04.png";

import word_2_1 from "/src/assets/crossword_01/word_02/word_02_01.png";
import word_2_2 from "/src/assets/crossword_01/word_02/word_02_02.png";
import word_2_3 from "/src/assets/crossword_01/word_02/word_02_03.png";
import word_2_4 from "/src/assets/crossword_01/word_02/word_02_04.png";

import word_3_1 from "/src/assets/crossword_01/word_03/word_03_01.png";
import word_3_2 from "/src/assets/crossword_01/word_03/word_03_02.png";
import word_3_3 from "/src/assets/crossword_01/word_03/word_03_03.png";
import word_3_4 from "/src/assets/crossword_01/word_03/word_03_04.png";

import word_1_1_F from "/src/assets/crossword_01/word_01/word_01_01_F.png";
import word_1_2_F from "/src/assets/crossword_01/word_01/word_01_02_F.png";
import word_1_3_F from "/src/assets/crossword_01/word_01/word_01_03_F.png";
import word_1_4_F from "/src/assets/crossword_01/word_01/word_01_04_F.png";

import word_2_1_F from "/src/assets/crossword_01/word_02/word_02_01_F.png";
import word_2_2_F from "/src/assets/crossword_01/word_02/word_02_02_F.png";
import word_2_3_F from "/src/assets/crossword_01/word_02/word_02_03_F.png";
import word_2_4_F from "/src/assets/crossword_01/word_02/word_02_04_F.png";

import word_3_1_F from "/src/assets/crossword_01/word_03/word_03_01_F.png";
import word_3_2_F from "/src/assets/crossword_01/word_03/word_03_02_F.png";
import word_3_3_F from "/src/assets/crossword_01/word_03/word_03_03_F.png";
import word_3_4_F from "/src/assets/crossword_01/word_03/word_03_04_F.png";

export class CrosswordScene01 extends Phaser.Scene {
    constructor() {
        super("CrosswordScene01");
    }

    preload() {
        this.load.image("crossword_bg", crosswordBackground);
        this.load.image("final_screen", finalScreen);

        this.load.image("word_in_crossword_1", word_in_crossword_1);
        this.load.image("word_in_crossword_2", word_in_crossword_2);
        this.load.image("word_in_crossword_3", word_in_crossword_3);

        this.load.image("question_1", question_1);
        this.load.image("question_2", question_2);
        this.load.image("question_3", question_3);
        this.load.image("question_1_dark", question_1_dark);
        this.load.image("question_2_dark", question_2_dark);
        this.load.image("question_3_dark", question_3_dark);

        [
            [word_1_1, word_1_1_F],
            [word_1_2, word_1_2_F],
            [word_1_3, word_1_3_F],
            [word_1_4, word_1_4_F],
            [word_2_1, word_2_1_F],
            [word_2_2, word_2_2_F],
            [word_2_3, word_2_3_F],
            [word_2_4, word_2_4_F],
            [word_3_1, word_3_1_F],
            [word_3_2, word_3_2_F],
            [word_3_3, word_3_3_F],
            [word_3_4, word_3_4_F],
        ].forEach(([key, final], i) => {
            this.load.image(`ans_${i}`, key);
            this.load.image(`ans_${i}_F`, final);
        });
    }

    create() {
        this.add.image(0, 0, "crossword_bg").setOrigin(0, 0);

        this.words = [
            this.add.image(900, 228, "word_in_crossword_1").setVisible(false),
            this.add.image(1100, 328, "word_in_crossword_2").setVisible(false),
            this.add.image(700, 428, "word_in_crossword_3").setVisible(false),
        ];

        this.trueAnswers = 0;

        this.questions = [
            { white: "question_1", dark: "question_1_dark", x: 400,  y: 880, target: 0 },
            { white: "question_2", dark: "question_2_dark", x: 1000, y: 880, target: 1 },
            { white: "question_3", dark: "question_3_dark", x: 1600, y: 880, target: 2 },
        ];

        this.answersGroups = [];
        this.activeQuestion = null;

        this.questions.forEach((q, qi) => {
            let qDark = this.add.image(q.x, q.y, q.dark)
                .setInteractive({ useHandCursor: true })
                .setScale(1.5);

            let qWhite = this.add.image(q.x, q.y, q.white)
                .setVisible(false)
                .setScale(1.5);

            qDark.on("pointerdown", () => {
                // Скрываем все группы с ответами
                this.answersGroups.forEach(g => g.setVisible(false));
                this.answersGroups[qi].setVisible(true);

                // Возвращаем все вопросы в тёмный режим
                this.questions.forEach(qq => {
                    qq.whiteImg.setVisible(false);
                    qq.darkImg.setVisible(true);
                });

                // Активируем текущий вопрос (белый)
                qWhite.setVisible(true);
                qDark.setVisible(false);
            });

            q.whiteImg = qWhite;
            q.darkImg = qDark;
        });

        let answersData = [
            { group: 0, items: [
                    { key: "ans_0", final: "ans_0_F", isTrue: true },
                    { key: "ans_1", final: "ans_1_F", isTrue: false },
                    { key: "ans_2", final: "ans_2_F", isTrue: false },
                    { key: "ans_3", final: "ans_3_F", isTrue: false },
                ]},
            { group: 1, items: [
                    { key: "ans_4", final: "ans_4_F", isTrue: false },
                    { key: "ans_5", final: "ans_5_F", isTrue: true },
                    { key: "ans_6", final: "ans_6_F", isTrue: false },
                    { key: "ans_7", final: "ans_7_F", isTrue: false },
                ]},
            { group: 2, items: [
                    { key: "ans_8", final: "ans_8_F", isTrue: false },
                    { key: "ans_9", final: "ans_9_F", isTrue: true },
                    { key: "ans_10", final: "ans_10_F", isTrue: false },
                    { key: "ans_11", final: "ans_11_F", isTrue: false },
                ]},
        ];

        answersData.forEach((group, gi) => {
            let container = this.add.container(900, 600).setVisible(false);
            group.items.forEach((ans, ai) => {
                let img = this.add.image(ai * 400 - 530, 0, ans.key) // увеличил расстояние
                    .setScale(1.5) // увеличил картинку
                    .setInteractive({ useHandCursor: true });
                img.on("pointerdown", () => this.toggleAnswer(img, ans, gi));
                container.add(img);
            });
            this.answersGroups.push(container);
        });

        this.finalScreen = this.add.image(0, 0, "final_screen")
            .setOrigin(0, 0)
            .setVisible(false);
    }

    toggleAnswer(img, ans, wordIndex) {
        img.setTexture(ans.final);
        if (ans.isTrue) {
            this.words[wordIndex].setVisible(true);
            this.trueAnswers++;
            if (this.trueAnswers === 3) {
                this.finalScreen.setVisible(true);
            }
        }
    }
}
