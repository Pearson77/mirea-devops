import Phaser from "phaser";

// Импорт фона
import sceneImage from '/src/game/assets/level_01/scene_01.png'
import perehod from "/src/game/assets/basic/perehody/perehod_01-02.jpg"

// Импорт вспомогательных предметов: буйки, стрелки, надпись, диалоги
import buoys_on_grass from '/src/game/assets/level_01/buoys_on_grass.png'
import buoys_on_water from '/src/game/assets/level_01/buoys_on_water.png'
import buoys_text from '/src/game/assets/level_01/buoys_text.png'
import tablet_left from '/src/game/assets/basic/tablet_left.png'

import arrow_right from '/src/game/assets/basic/arrow_right.png'
import arrow_left from '/src/game/assets/basic/arrow_left.png'

import textHelp from '/src/game/assets/basic/text_help.png'

import dialog_01 from '/src/game/assets/level_01/dialog_01.png'
import dialog_02 from '/src/game/assets/level_01/dialog_02.png'
import dialog_03 from '/src/game/assets/level_01/dialog_03.png'
import dialog_04 from '/src/game/assets/level_01/dialog_04.png'

// Импорт звуков
import voice_01 from '/src/game/assets/level_01/voice_01.wav'
import voice_02 from '/src/game/assets/level_01/voice_02.wav'
import voice_03 from '/src/game/assets/level_01/voice_03.wav'
import voice_04 from '/src/game/assets/level_01/voice_04.wav'
import background_music from "/src/game/assets/basic/background_music.mp3";

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт персонажей и классов
import playerImage from '/src/game/assets/basic/player.png'
import playerImageGirl from '/src/game/assets/basic/player_girl.png'
import dolphin from '/src/game/assets/basic/dolphin.png'

import { Tooltip } from "/src/game/tooltip/tooltip.js";
import { Dolphin } from "/src/game/entities/dolphin.js";
import { Player } from "/src/game/entities/player.js";

export class Level_01 extends Phaser.Scene
{
    // Название сцены
    constructor() {
        super('Level_1');
    }

    preload ()
    {
        // Подключение игрока и настройки
        this.load.spritesheet('player', playerImage, {
            frameWidth: 166,
            frameHeight: 233
        });

        this.load.spritesheet('player_girl', playerImageGirl, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Подключение дельфина и настройки
        this.load.spritesheet('dolphin', dolphin, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Загрузка картинки перехода между уровнями как спрайта (чтобы сделать из него анимацию)
        this.load.spritesheet('perehod', perehod, {
            frameWidth: 1920,
            frameHeight: 1080
        });

        // Подключение картинок
        this.load.image('scene_1', sceneImage);

        this.load.image('buoys_on_grass', buoys_on_grass);
        this.load.image('buoys_on_water', buoys_on_water);
        this.load.image('buoys_text', buoys_text);
        this.load.image('tablet_left', tablet_left);

        this.load.image('arrow_left', arrow_left);
        this.load.image('arrow_right', arrow_right);

        this.load.image('textHelp', textHelp);

        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        this.load.image('dialog_01', dialog_01);
        this.load.image('dialog_02', dialog_02);
        this.load.image('dialog_03', dialog_03);
        this.load.image('dialog_04', dialog_04);

        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('voice_03', voice_03);
        this.load.audio('voice_04', voice_04);
        this.load.audio('background_music', background_music);
    }

    create ()
    {
        // Создание сцены
        this.background = this.add.image(0, 0, 'scene_1');
        // Перемещение верхнего левого угла в начало координат
        this.background.setOrigin(0, 0);

        // Фоновая музыка сцены
        this.background_music = this.sound.add('background_music', { volume: 0.07, loop: true });
        if (!this.sound.locked)
        {
            this.background_music.play();
        }
        else
        {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.background_music.play();
            })
        }

        this.buoys_on_grass = this.add.image(100, 675, 'buoys_on_grass');
        this.buoys_on_water = this.add.image(1350, 890, 'buoys_on_water');
        this.buoys_on_water.visible = false;
        this.tablet_left = this.add.image(300,500, 'tablet_left')
        this.tablet_left.visible = false

        this.arrow_left_01 = this.add.image(115, 535, 'arrow_left');
        this.arrow_left_01.visible = false;
        this.arrow_right = this.add.image(1300, 800, 'arrow_right');
        this.arrow_right.visible = false

        // Сообщение, что буйки в руках
        this.buoys_text = this.add.image(960, 100, 'buoys_text');
        this.buoys_text.visible = false;

        this.player = new Player(this, 420, 800);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 420, 800, true);
        }

        this.perehod = this.add.sprite(0, 0, 'perehod').setOrigin(0, 0);
        this.anims.create({
            key: 'anim_perehod',
            frames: [
                { key: 'perehod' },
                { key: 'perehod' },
            ],
            frameRate: 1,
            repeat: 0
        });
        this.perehod.visible = false;

        // Маркер того, что этап поменялся (по умолчанию false)
        this.stageChanged = false;
        // Маркер остановки сцены (для анимаций)
        this.sceneStoped = false;
        // Переменная для проверки того, все ли начальные подсказки были показаны
        this.skipStartTips = false;

        // Объявление этапа 1
        this.currentStage = 1;

        // Анимации двух левых стрелок
        this.tweens.add({
            targets: this.arrow_left_01,
            y: {
                from: this.arrow_left_01.y - 20,  // На 20 пикселей выше текущего
                to: this.arrow_left_01.y
            },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Анимация правой стрелки
        this.tweens.add({
            targets: this.arrow_right,
            y: {
                from: this.arrow_right.y - 20,  // На 20 пикселей выше текущего
                to: this.arrow_right.y
            },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Анимация текста, что буёк 'в руках'
        this.tweens.add({
            targets: this.buoys_text,
            scale: { from: 0.95, to: 1.05 },  // Меняем масштаб от 0.95 до 1.05
            duration: 1000,                   // Длительность одного цикла (в мс)
            yoyo: true,                       // Возврат к начальному значению
            repeat: -1,                       // Бесконечное повторение
            ease: 'Sine.easeInOut'            // Плавное ускорение/замедление
        });

         // Левая граница полигона и центра тела
        const leftWall = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 1080 },
            { x: 0, y: 1080 },
        ];
        this.matter.add.fromVertices(
            1, 540,
            leftWall,
            { isStatic: true }
        );

        // Нижняя граница полигона и центра тела
        const downWall = [
            { x: 0, y: 900 },
            { x: 0, y: 1200 },
            { x: 1920, y: 1200 },
            { x: 1920, y: 1050 },
            { x: 350, y: 1050 },
        ];
        this.matter.add.fromVertices(
            580, 990,
            downWall,
            { isStatic: true }
        );

        // Верхняя граница полигона и центра тела
        const upWall = [
            { x: 1920, y: 0 },
            { x: 1920, y: 735 },
            { x: 450, y: 735 },
            { x: 0, y: 450 },
            { x: 0, y: 0 },
        ]
        this.matter.add.fromVertices(
            1000, 300,
            upWall,
            { isStatic: true }
        );

        // Правая граница полигона и центра тела
        const rightWall = [
            { x: 1400, y: 900 },
            { x: 1400, y: 700 },
            { x: 1900, y: 700 },
            { x: 1900, y: 900 },
        ]
        this.rightWall = this.matter.add.fromVertices(
            1600, 800,
            rightWall,
            { isStatic: true }
        )

        // Сразу выключаем коллизию стены
        this.rightWall.collisionFilter = {
            category: 0x0001,       // Категория тела (можно оставить текущую)
            mask: 0x0000,           // Маска коллизий (0 - нет коллизий)
            group: 0                // Группа (если используется)
        };

        // Для работы стрелок влево и вправо
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Создаём звуки диалогов
        this.voice_01 = this.sound.add('voice_01', { volume: 0.35, loop: false });
        this.voice_02 = this.sound.add('voice_02', { volume: 0.35, loop: false });
        this.voice_03 = this.sound.add('voice_03', { volume: 0.35, loop: false });
        this.voice_04 = this.sound.add('voice_04', { volume: 0.35, loop: false });

        // Создаём всплывающие подсказки
        this.dolphinInstance = new Dolphin(this, 950, 800);
        this.tool_tip_1 = new Tooltip(this, 950, 800, 'dialog_01', this.dolphinInstance, this.voice_01);
        this.tool_tip_2 = new Tooltip(this, 950, 800, 'dialog_02', this.dolphinInstance, this.voice_02);
        this.tool_tip_3 = new Tooltip(this, 950, 800, 'dialog_03', this.dolphinInstance, this.voice_03);
        this.tool_tip_4 = new Tooltip(this, 950, 800, 'dialog_04', this.dolphinInstance, this.voice_04);
    }

    // Функция для последовательного отображения стартовых подсказок до начала уровня
    startToolTipsCycle () {
        if (!this.tool_tip_1.showed) {
            if (!this.tool_tip_1.visible)
                this.tool_tip_1.show();
            return;
        }

        if (!this.tool_tip_2.showed) {
            if (!this.tool_tip_2.visible)
                this.tool_tip_2.show();
            return;
        }

        if (!this.tool_tip_3.showed) {
            if (!this.tool_tip_3.visible)
                this.tool_tip_3.show();
            return;
        }

        // Все подсказки показаны, переменную меняем на `true`
        this.arrow_left_01.visible = true;
        this.skipStartTips = true;
    }

    update (_, delta) {
        if (!this.skipStartTips) {
            // Пока все стартовые подсказки не показаны, показываем их
            this.startToolTipsCycle();
        }

        // Переменная с позицией игрока по X
        let posX = this.player.x;

        // Перемещение теперь в функции move() в классе Player:
        this.player.move(posX > 420);

        // Логика этапов игры

        // Первый этап (взять буёк)
        if (this.currentStage === 1)
        {
            if (posX <= 155)  // Достигнута точка, где лежит буёк
            {
                // Меняем этап на второй
                this.currentStage = 2;
                this.stageChanged = true;
            }
        }

        // Второй этап (донести буёк до точки)
        else if (this.currentStage === 2)
        {
            if (posX >= 1265)  // Достигнута точка, куда ставим буёк
            {
                // Меняем этап на третий
                this.tablet_left.visible = true;

                this.currentStage = 3;
                this.stageChanged = true;
            }
        }

        // Третий этап (вернуться к берегу)
        else if (this.currentStage === 3)
        {
            // Персонаж вернулся на берег
            if (posX <= 90)
            {
                this.perehod.visible = true;
                this.perehod.play('anim_perehod');
                this.currentStage = 0;

                this.perehod.once('animationcomplete', () => {
                    this.scene.stop();
                    this.background_music.stop();
                    this.sound.removeAll();
                    this.scene.launch('Level_2');
                });
            }
        }

        if (!this.stageChanged) return;  // Код ниже не отработает, если нет пометки, что этап поменялся

        // Второй этап (донести буёк до точки)
        if (this.currentStage === 2)
        {
            this.buoys_on_grass.visible = false;
            this.arrow_right.visible = true;
            this.arrow_left_01.visible = false;

            this.buoys_text.visible = true;

            // Изменили уровень, теперь переменная, что этап поменялся, обратно в Ложь
            this.stageChanged = false;
        }

        // Третий этап (вернуться к берегу)
        else if (this.currentStage === 3)
        {
            this.tool_tip_4.show();

            this.buoys_on_water.visible = true;
            this.arrow_right.visible = false;

            // Ставим стену справа от буйков
            this.rightWall.collisionFilter = {
                category: 0x0001,       // Категория тела
                mask: 0xFFFFFFFF,       // Маска коллизий (все биты установлены)
                group: 0
            };

            this.buoys_text.visible = false;

            // this.arrow_left_02.visible = true;
            // Изменили уровень, теперь переменная, что этап поменялся, обратно в Ложь
            this.stageChanged = false;
        }
    }
}
