import Phaser from "phaser";

import sceneImage from '/src/game/assets/level_03/scene_03.png'
import perehod from "/src/game/assets/basic/perehody/perehod_03-04.jpg"

import jacket_on_grass from '/src/game/assets/level_03/jacket_on_grass.png'
import tablet_left from '/src/game/assets/basic/tablet_left.png'

import textHelp from '/src/game/assets/basic/text_help.png'

import dialog_01 from '/src/game/assets/level_03/dialog_01.png'
import dialog_02 from '/src/game/assets/level_03/dialog_02.png'

import playerImage from '/src/game/assets/basic/player.png'
import playerImage1 from '/src/game/assets/basic/player2.png'
import playerImageGirl from '/src/game/assets/basic/player_girl.png'
import playerImageGirl1 from '/src/game/assets/basic/player_girl2.png'
import dolphin from '/src/game/assets/basic/dolphin_invert.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import voice_01 from '/src/game/assets/level_03/voice_01.wav'
import voice_02 from '/src/game/assets/level_03/voice_02.wav'
import background_music from "/src/game/assets/basic/background_music.mp3";

import { Player } from "/src/game/entities/player.js";
import { Player1 } from "/src/game/entities/player2.js";
import { Tooltip } from "/src/game/tooltip/tooltip.js";
import { Dolphin } from "/src/game/entities/dolphin.js";

export class Level_03 extends Phaser.Scene
{
    constructor() {
        super('Level_3');  // По сути название сцены
    }

    preload ()
    {
        this.textures.remove('dialog_01');
        this.textures.remove('dialog_02');
        this.textures.remove('perehod');
        this.anims.remove('anim_perehod');
        /*
        * Путь до картинок пишем в импорте сверху
        * чтобы адекватно работал `npm run build`
        */

        // Игрок без жилета
        this.load.spritesheet('player', playerImage, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Игрок с жилетом
        this.load.spritesheet('player1', playerImage1, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Игрок без жилета
        this.load.spritesheet('player_girl', playerImageGirl, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Игрок с жилетом
        this.load.spritesheet('player_girl1', playerImageGirl1, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Дельфин
        this.load.spritesheet('dolphin_right', dolphin, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Загрузка картинки перехода между уровнями как спрайта (чтобы сделать из него анимацию)
        this.load.spritesheet('perehod', perehod, {
            frameWidth: 1920,
            frameHeight: 1080
        });

        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        // Загрузка картинки жилета на газон
        this.load.image('jacket_on_grass', jacket_on_grass);
        this.load.image('tablet_left', tablet_left)
        // Загрузка картинки сцены
        this.load.image('scene_3', sceneImage);

        // Загрузка надписи "нажмите чтобы продолжить"
        this.load.image('textHelp', textHelp);
        // Загрузка диалогового окна 1
        this.load.image('dialog_01', dialog_01);
        // Загрузка диалогового окна 2
        this.load.image('dialog_02', dialog_02);

        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('background_music', background_music);
    }

    create ()
    {
        // Установка фона в нулевые координаты
        this.background = this.add.image(0, 0, 'scene_3');
        this.background.setOrigin(0, 0);  // Левый верхний угол помещаем в начало координат

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

        // Установка картинки жилета на газон
        this.jacket_on_grass = this.add.image(957, 690, 'jacket_on_grass');
        this.tablet_left = this.add.image(70,550, 'tablet_left')
        this.tablet_left.visible = false;

        this.skipTooltip = false;
        this.skipTooltip2 = false;

        // Персонаж
        this.player = new Player(this, 1854, 539);
        this.player1 = new Player1(this, 554, 539);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 1854, 539, true);
            this.player1.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player1 = new Player1(this, 554, 539, true);
        }
        this.player1.visible = false;

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

        // Правая граница полигона и центра тела
        const rightWall = [
            { x: 1918, y: 0 },
            { x: 1920, y: 0 },
            { x: 1920, y: 1080 },
            { x: 1918, y: 1080 },
        ];
        this.matter.add.fromVertices(
            1919, 540,
            rightWall,
            { isStatic: true }
        );

        // Нижняя граница полигона
        const downWallVer = [
            { x: 0, y: 1080 },
            { x: 0, y: 973 },
            { x: 239, y: 937 },
            { x: 466, y: 949 },
            { x: 901, y: 860 },
            { x: 1210, y: 700 },
            { x: 1920, y: 595 },
            { x: 1920, y: 1080 },
            { x: 0, y: 1080 },
        ];
        this.matter.add.fromVertices(
            1108, 940,
            downWallVer,
            { isStatic: true }
        );

        // Верхняя граница полигона
        const upWallVer = [
            { x: 0, y: 0},
            { x: 0, y: 467 },
            { x: 227, y: 576 },
            { x: 692, y: 532 },
            { x: 1111, y: 335 },
            { x: 1920, y: 243 },
            { x: 1920, y: 0 },
            { x: 0, y: 0 },
        ];
        this.matter.add.fromVertices(
            790, 330,
            upWallVer,
            { isStatic: true }
        );

        // Для работы стрелок влево и вправо
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        /*
        Объявляем переменные, которые отвечают за
        изменение текущего этапа прохождения уровня
        */
        this.currentStage = 1;  // Изначально текущий этап - первый

        this.sceneStoped = false; // Остановлена ли сцена (использую во время подсказок, чтобы чел не двигался)

        // Создаём звуки диалогов
        this.voice_01 = this.sound.add('voice_01', { volume: 0.35, loop: false });
        this.voice_02 = this.sound.add('voice_02', { volume: 0.35, loop: false });

        // Создаём всплывающие подсказки
        this.dolphinInstance1 = new Dolphin(this, 631, 800, true, true, 'dolphin_right');
        this.tool_tip = new Tooltip(this, 631, 800, 'dialog_01', this.dolphinInstance1, this.voice_01, true);
        this.tool_tip_2 = new Tooltip(this, 631, 800, 'dialog_02', this.dolphinInstance1, this.voice_02, true);

        this.stageChanged = false;
    }

    startToolTipsCycle () {
        // Функция для последовательного отображения стартовых подсказок до начала уровня

        if (!this.tool_tip.showed) {
            if (!this.tool_tip.visible)
                this.tool_tip.show();
            return;
        }
        this.jacket_on_grass.visible = false;
        this.x = this.player.x;
        this.y = this.player.y;
        this.temp = this.player;
        this.player = this.player1;
        this.temp.destroy();
        this.player.visible = true;
        this.player.x = this.x;
        this.player.y = this.y;

        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip = false;
        this.skipTooltip2 = true;
    }

    startToolTipCycle2 () {
        if (!this.tool_tip_2.showed) {
            if (!this.tool_tip_2.visible)
                this.tool_tip_2.show();
            return;
        }

        this.tablet_left.visible = true;
        this.skipTooltip2 = false;
    }

    update (_, delta) {

        if (this.skipTooltip) {
            this.startToolTipsCycle();
        }

        if (this.skipTooltip2) {
            this.startToolTipCycle2();
        }

        // Переменная с позицией игрока по X
        let posX = this.player.x;

        // Перемещение теперь в функции move() в классе Player:
        this.player.move(posX <= 900);

        // Логика этапов игры

        // Проверки завершения текущего этапа

        // Первый этап (подойти правее)
        if (this.currentStage === 1)
        {
            if (posX <= 1043)  // Достигнута точка, где лежит буёк
            {
                // Останавливаем сцену
                this.sceneStoped = true;
                this.player.stopMove();

                this.skipTooltip = true;

                // Меняем этап на второй
                this.currentStage = 2;
                this.stageChanged = true;
            }
        }

        // Второй этап
        else if (this.currentStage === 2)
        {
            if (posX - 60 <= 30)
            {
                this.perehod.visible = true;
                this.perehod.play('anim_perehod');
                this.currentStage = 0;

                this.perehod.once('animationcomplete', () => {
                    this.scene.stop();
                    this.background_music.stop();
                    this.sound.removeAll();
                    this.scene.launch('Level_4');
                });
            }
        }

    }
}
