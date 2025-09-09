import Phaser from "phaser";

// Импорт фона
import sceneImage from '/src/game/assets/level_07/scene_7.png'
import perehod from "/src/game/assets/basic/perehody/perehod_07-08.jpg"

// Импорт вспомогательных предметов
import arrow_right from '/src/game/assets/basic/arrow_right.png'
import arrow_left from '/src/game/assets/basic/arrow_left.png'
import tablet_right from '/src/game/assets/basic/tablet_right.png'

import kust_ from '/src/game/assets/level_07/kust.png'

import child_1 from '/src/game/assets/level_07/child_1.png'
import child_2 from '/src/game/assets/level_07/child_2.png'
import child_3 from '/src/game/assets/level_07/child_3.png'

import ded_v_lodke from '/src/game/assets/level_07/ded_v_lodke.png'

import krug_1 from '/src/game/assets/level_07/krug_1.png'
import krug_2 from '/src/game/assets/level_07/krug_2.png'
import krug_3 from '/src/game/assets/level_07/krug_3.png'

import krug_text from '/src/game/assets/level_07/krug_text.png'

import textHelp from '/src/game/assets/basic/text_help.png'

import dialog_01 from '/src/game/assets/level_07/dialog_01.png'
import dialog_02 from '/src/game/assets/level_07/dialog_02.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import voice_01 from "/src/game/assets/level_07/voice_01.wav";
import voice_02 from "/src/game/assets/level_07/voice_02.wav";
import voice_pluh from "/src/game/assets/level_07/pluh.mp3";
import background_music from "/src/game/assets/basic/background_music.mp3";

// Импорт персонажей и классов
import playerImage from '/src/game/assets/basic/player.png'
import dolphin from '/src/game/assets/basic/dolphin.png'
import dolphin_invert from '/src/game/assets/basic/dolphin_invert.png'

import { Player } from "/src/game/entities/player.js"
import { Tooltip } from "/src/game/tooltip/tooltip.js"
import { Dolphin } from "/src/game/entities/dolphin.js"
import { Arrow } from "/src/game/tooltip/arrow.js"
import playerImageGirl from "@/game/assets/basic/player_girl.png";

export class Level_07 extends Phaser.Scene
{
    constructor() {
        super('Level_7');  // По сути название сцены
    }

    preload ()
    {
        this.textures.remove('dialog_01');
        this.textures.remove('dialog_02');
        this.textures.remove('dialog_03');
        this.textures.remove('perehod');
        this.anims.remove('anim_perehod');

        this.load.spritesheet('player', playerImage, {
            frameWidth: 166,
            frameHeight: 233
        });

        this.load.spritesheet('player_girl', playerImageGirl, {
            frameWidth: 166,
            frameHeight: 233
        });

        this.load.spritesheet('dolphin', dolphin, {
            frameWidth: 166,
            frameHeight: 233
        });

        this.load.spritesheet('dolphin_invert', dolphin_invert, {
            frameWidth: 166,
            frameHeight: 233
        });

        this.load.spritesheet('child_1', child_1, {
            frameWidth: 202,
            frameHeight: 233
        });
        this.load.spritesheet('child_2', child_2, {
            frameWidth: 202,
            frameHeight: 233
        });
        this.load.spritesheet('child_3', child_3, {
            frameWidth: 202,
            frameHeight: 233
        });

        // Загрузка картинки перехода между уровнями как спрайта (чтобы сделать из него анимацию)
        this.load.spritesheet('perehod', perehod, {
            frameWidth: 1920,
            frameHeight: 1080
        });

        this.load.image('scene_7', sceneImage);

        this.load.image('kust_', kust_);
        this.load.image('krug_1', krug_1);
        this.load.image('krug_2', krug_2);
        this.load.image('krug_3', krug_3);
        this.load.image('krug_text', krug_text);
        this.load.image('ded_v_lodke', ded_v_lodke);

        this.load.image('tablet_right', tablet_right);

        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        this.load.image('textHelp', textHelp);

        this.load.image('arrow_right', arrow_right);
        this.load.image('arrow_left', arrow_left);

        this.load.image('dialog_01', dialog_01);
        this.load.image('dialog_02', dialog_02);

        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('voice_pluh', voice_pluh);
        this.load.audio('background_music', background_music);
    }

    create () {
        this.background = this.add.image(0, 0, 'scene_7').setOrigin(0, 0);

        // Фоновая музыка сцены
        this.background_music = this.sound.add('background_music', {
            volume: 0.07, loop: true,
        });

        // Для музыки
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

        // Стрелка с направлением
        this.tablet_right = this.add.image(1840, 390, 'tablet_right');
        this.tablet_right.visible = false;

        this.krug_1 = this.add.image(420, 420, 'krug_1');
        this.krug_2 = this.add.image(420, 420, 'krug_2');
        this.krug_3 = this.add.image(420, 420, 'krug_3');
        this.kust = this.add.image(420, 420, 'kust_');

        this.krug_text = this.add.image(960, 100, 'krug_text');
        this.krug_text.visible = false;

        this.ded_v_lodke = this.add.image(-275, 940, 'ded_v_lodke');
        let options = {
            shape: {
                type: 'rectangle',
                width: 166,
                height: 233
            }
        }
        options['collisionFilter'] = {
            category: 0x0001,       // Категория тела (можно оставить текущую)
            mask: 0x0000,           // Маска коллизий (0 - нет коллизий)
            group: 0
        }

        this.matter.add.gameObject(this.ded_v_lodke, options);

        this.child_1 = this.add.sprite(1450, 820, 'child_1', 0);
        this.anims.create({
            key: 'child_1_water',  // Анимация челика в воде
            frames: this.anims.generateFrameNumbers("child_1", {
                start: 0,  // Анимация начинается с первого кадра и заканчивается четвертым в спрайтлисте
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'child_1_water_krug',  // Анимация челика в воде со спасательным кругом
            frames: this.anims.generateFrameNumbers("child_1", {
                start: 4,
                end: 5
            }),
            frameRate: 4,
            repeat: -1
        });
        this.child_1.play('child_1_water');

        this.child_2 = this.add.sprite(1650, 740, 'child_2', 0);
        this.anims.create({
            key: 'child_2_water',  // Анимация челика в воде
            frames: this.anims.generateFrameNumbers("child_2", {
                start: 0,  // Анимация начинается с первого кадра и заканчивается четвертым в спрайтлисте
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'child_2_water_krug',  // Анимация челика в воде со спасательным кругом
            frames: this.anims.generateFrameNumbers("child_2", {
                start: 4,
                end: 5
            }),
            frameRate: 4,
            repeat: -1
        });
        this.child_2.play('child_2_water');

        this.child_3 = this.add.sprite(1720, 860, 'child_3', 0);
        this.anims.create({
            key: 'child_3_water',  // Анимация челика в воде
            frames: this.anims.generateFrameNumbers("child_3", {
                start: 0,  // Анимация начинается с первого кадра и заканчивается четвертым в спрайтлисте
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'child_3_water_krug',  // Анимация челика в воде со спасательным кругом
            frames: this.anims.generateFrameNumbers("child_3", {
                start: 4,
                end: 5
            }),
            frameRate: 4,
            repeat: -1
        });
        this.child_3.play('child_3_water');

        // Анимация текста "Вы взяли круг"
        this.tweens.add({
            targets: this.krug_text,
            scale: { from: 0.95, to: 1.05 },  // Меняем масштаб от 0.95 до 1.05
            duration: 1000,                   // Длительность одного цикла (в мс)
            yoyo: true,                       // Возврат к начальному значению
            repeat: -1,                       // Бесконечное повторение
            ease: 'Sine.easeInOut'            // Плавное ускорение/замедление
        });

        // Создаём звуки диалогов
        this.voice_01 = this.sound.add('voice_01', { volume: 0.35, loop: false });
        this.voice_02 = this.sound.add('voice_02', { volume: 0.35, loop: false });
        this.voice_pluh = this.sound.add('voice_pluh', { volume: 0.45, loop: false });

        // Персонаж
        this.player = new Player(this, 75, 720);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 75, 720, true);
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

        this.dolphin = new Dolphin(this, 1200, 925, false, true, 'dolphin');
        this.dolphin_invert = new Dolphin(this, 700, 950, true, true, 'dolphin_invert');

        this.tool_tip1 = new Tooltip(this, 1200, 925, 'dialog_01', this.dolphin, this.voice_01);
        this.tool_tip2 = new Tooltip(this, 700, 950, 'dialog_02', this.dolphin_invert, this.voice_02, true);

        this.currentStage = 1;  // Изначально текущий этап - первый

        // Маркер остановки сцены (для анимаций)
        this.sceneStoped = false;

        // Отвечает за цикл анимаций
        this.skipTooltip1 = false;
        this.skipTooltip2 = false;

        // Левая граница полигона
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

        // Правая граница полигона
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
            { x: 0, y: 877},
            { x: 297, y: 859 },
            { x: 677, y: 752 },
            { x: 1018, y: 595 },
            { x: 1232, y: 540 },
            { x: 1650, y: 487 },
            { x: 1920, y: 464 },
            { x: 1920, y: 1080 },
            { x: 0, y: 1080 },
        ];
        this.matter.add.fromVertices(
            1050, 820,
            downWallVer,
            { isStatic: true }
        );

        // Верхняя граница полигона
        const upWallVer = [
            { x: 0, y: 0},
            { x: 0, y: 364},
            { x: 272, y: 295},
            { x: 560, y: 237},
            { x: 1113, y: 220},
            { x: 1920, y: 225 },
            { x: 1920, y: 0 },
            { x: 0, y: 0},
        ];
        this.matter.add.fromVertices(
            720, 170,
            upWallVer,
            { isStatic: true }
        );

        // Для работы стрелок влево и вправо
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Переменная, которая отвечает за перемещение деда вправо
        this.move_ded_right = false;
    }

    start_tool_tips_cycle_01 () {
        // Функция для последовательного отображения диалогов

        if (!this.tool_tip1.showed)
        {
            if (!this.tool_tip1.visible) {
                this.tool_tip1.show();
            }
            return;
        }

        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip1 = false;
    }

    start_tool_tips_cycle_02 () {
        // Функция для последовательного отображения диалогов

        if (!this.tool_tip2.showed)
        {
            if (!this.tool_tip2.visible) {
                this.tool_tip2.show();
            }
            return;
        }

        this.tablet_right.visible = true;

        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip2 = false;
    }

    update (_, delta) {

        // Переменная с позицией игрока по X
        let posX = this.player.x;
        let posY = this.player.y;

        if (this.skipTooltip1) {
            this.start_tool_tips_cycle_01();
        }

        if (this.skipTooltip2) {
            this.start_tool_tips_cycle_02();
        }

        if (this.move_ded_right) {
            this.ded_v_lodke.setVelocity(5, 0);
            this.sceneStoped = true;
        } else { this.ded_v_lodke.setVelocity(0, 0); }

        // Перемещение теперь в функции move() в классе Player:
        this.player.move();

        // Логика этапов игры

        // Первый этап (подойти правее)
        if (this.currentStage === 1)
        {
            if (posX >= 125)
            {
                this.skipTooltip1 = true;
                this.currentStage = 2;
            }
        }

        // Второй этап (первый спасательный круг)
        if (this.currentStage === 2)
        {
            if (posX >= 150 && posY <= 525 && posX <= 250)
            {
                this.krug_text.visible = true;
                this.krug_1.visible = false;

                this.arrow = new Arrow(this, 1450, 400, 'arrow_right');

                this.currentStage = 3;
            }
        }

        // Третий этап (первый челик)
        if (this.currentStage === 3)
        {
            if (posX >= 1300 && posY >= 400 && posX <= 1500)
            {
                this.krug_1.visible = false;
                this.child_1.play('child_1_water_krug');
                this.voice_pluh.play();
                this.krug_text.visible = false;
                this.arrow.destroy();
                this.currentStage = 4;
            }
        }

        // Четвертый этап (второй спасательный круг)
        if (this.currentStage === 4)
        {
            if (posX >= 310 && posY <= 480 && posX <= 450)
            {
                this.krug_text.visible = true;
                this.krug_2.visible = false;

                this.arrow = new Arrow(this, 1450, 400, 'arrow_right');

                this.currentStage = 5;
            }
        }

        // Пятый этап (второй челик)
        if (this.currentStage === 5)
        {
            if (posX >= 1300 && posY >= 400 && posX <= 1500)
            {
                this.child_2.play('child_2_water_krug');
                this.voice_pluh.play();
                this.krug_text.visible = false;
                this.arrow.destroy();
                this.currentStage = 6;
            }
        }

        // Шестой этап (третий спасательный круг)
        if (this.currentStage === 6)
        {
            if (posX >= 500 && posY <= 445 && posX <= 625)
            {
                this.krug_text.visible = true;
                this.krug_3.visible = false;

                this.arrow = new Arrow(this, 1450, 400, 'arrow_right');

                this.currentStage = 7;
            }
        }

        // Седьмой этап (третий челик)
        if (this.currentStage === 7)
        {
            if (posX >= 1345 && posY <= 540 && posX <= 1610)
            {
                this.child_3.play('child_3_water_krug');
                this.voice_pluh.play();
                this.krug_text.visible = false;
                this.move_ded_right = true;
                this.arrow.destroy();
                this.currentStage = 8;
            }
        }

        // Восьмой этап (плывёт дед)
        if (this.currentStage === 8)
        {
            if (this.ded_v_lodke.x >= 1200)
            {
                this.skipTooltip2 = true;
                this.move_ded_right = false;
                this.sceneStoped = false;
                this.currentStage = 9;
            }
        }

        // Девятый этап (уйти в правый край экрана)
        if (this.currentStage === 9)
        {
            if (posX >= 1800)
            {
                this.perehod.visible = true;
                this.perehod.play('anim_perehod');
                this.currentStage = 0;

                this.perehod.once('animationcomplete', () => {
                    this.scene.stop();
                    this.background_music.stop();
                    this.sound.removeAll();
                    this.scene.launch('Level_8');
                });
            }
        }
    }
}
