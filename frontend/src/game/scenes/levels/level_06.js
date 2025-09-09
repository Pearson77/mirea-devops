import Phaser from "phaser";

// Импорт фона
import sceneImage from '/src/game/assets/level_06/scene_6.png'
import sceneImageDark from '/src/game/assets/level_06/scene_6_dark.png'
import perehod from "/src/game/assets/basic/perehody/perehod_06-07.jpg"

// Импорт вспомогательных предметов
import arrow_right from '/src/game/assets/basic/arrow_right.png'
import arrow_left from '/src/game/assets/basic/arrow_left.png'
import tablet_right from '/src/game/assets/basic/tablet_right.png'

import textHelp from '/src/game/assets/basic/text_help.png'

import dialog_01 from '/src/game/assets/level_06/dialog_01.png'
import dialog_02 from '/src/game/assets/level_06/dialog_02.png'
import dialog_03 from '/src/game/assets/level_06/dialog_03.png'

// Импорт анимации грозы и дождя
import groza_01 from '/src/game/assets/level_06/animation_scene_06/animation_1.png'
import groza_02 from '/src/game/assets/level_06/animation_scene_06/animation_2.png'
import groza_03 from '/src/game/assets/level_06/animation_scene_06/animation_3.png'
import groza_04 from '/src/game/assets/level_06/animation_scene_06/animation_4.png'
import groza_05 from '/src/game/assets/level_06/animation_scene_06/animation_5.png'
import groza_06 from '/src/game/assets/level_06/animation_scene_06/animation_6.png'
import groza_07 from '/src/game/assets/level_06/animation_scene_06/animation_7.png'
import groza_08 from '/src/game/assets/level_06/animation_scene_06/animation_8.png'
import dozhd_01 from '/src/game/assets/level_06/dozhd/dozhd_01.png'
import dozhd_02 from '/src/game/assets/level_06/dozhd/dozhd_02.png'
import dozhd_03 from '/src/game/assets/level_06/dozhd/dozhd_03.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import voice_01 from "/src/game/assets/level_06/voice_01.wav";
import voice_02 from "/src/game/assets/level_06/voice_02.wav";
import voice_03 from "/src/game/assets/level_06/voice_03.wav";
import voice_dozhd from "/src/game/assets/level_06/dozhd.mp3";
import voice_grom from "/src/game/assets/level_06/grom.mp3";
import background_music from "/src/game/assets/basic/background_music.mp3";

// Импорт персонажей и классов
import playerImage from '/src/game/assets/basic/player.png'
import dolphin from '/src/game/assets/basic/dolphin.png'
import dolphin_invert from '/src/game/assets/basic/dolphin_invert.png'

import { Player } from "/src/game/entities/player.js"
import { Tooltip } from "/src/game/tooltip/tooltip.js"
import { Dolphin } from "/src/game/entities/dolphin.js"
import playerImageGirl from "@/game/assets/basic/player_girl.png";

export class Level_06 extends Phaser.Scene
{
    constructor() {
        super('Level_6');  // По сути название сцены
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

        // Загрузка картинки перехода между уровнями как спрайта (чтобы сделать из него анимацию)
        this.load.spritesheet('perehod', perehod, {
            frameWidth: 1920,
            frameHeight: 1080
        });

        this.load.image('scene_6', sceneImage);
        this.load.image('scene_6_dark', sceneImageDark);

        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        // Картинки анимации грозы и дождя
        this.load.image('groza_01', groza_01);
        this.load.image('groza_02', groza_02);
        this.load.image('groza_03', groza_03);
        this.load.image('groza_04', groza_04);
        this.load.image('groza_05', groza_05);
        this.load.image('groza_06', groza_06);
        this.load.image('groza_07', groza_07);
        this.load.image('groza_08', groza_08);
        this.load.image('dozhd_01', dozhd_01);
        this.load.image('dozhd_02', dozhd_02);
        this.load.image('dozhd_03', dozhd_03);

        this.load.image('textHelp', textHelp);

        this.load.image('arrow_right', arrow_right);
        this.load.image('arrow_left', arrow_left);
        this.load.image('tablet_right', tablet_right);

        this.load.image('dialog_01', dialog_01);
        this.load.image('dialog_02', dialog_02);
        this.load.image('dialog_03', dialog_03);

        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('voice_03', voice_03);
        this.load.audio('voice_dozhd', voice_dozhd);
        this.load.audio('voice_grom', voice_grom);
        this.load.audio('background_music', background_music);
    }

    create () {
        // Создание фона
        this.background = this.add.image(0, 0, 'scene_6').setOrigin(0, 0);

        // Тёмная версия фона
        this.background_dark = this.add.sprite(0, 0, 'scene_6_dark').setOrigin(0, 0);

        // Ставим нулевую прозрачность у тёмной версии
        this.background_dark.setAlpha(0);

        // Версия фона для дождя
        this.background_dozhd = this.add.sprite(0, 0, 'scene_6_dark').setOrigin(0, 0);

        // Ставим нулевую прозрачность у этой версии
        this.background_dozhd.setAlpha(0);

        // Фоновая музыка сцены
        this.background_music = this.sound.add('background_music', {
            volume: 0.07, loop: true,
        });

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

        // Создаём звуки диалогов
        this.voice_01 = this.sound.add('voice_01', { volume: 0.35, loop: false });
        this.voice_02 = this.sound.add('voice_02', { volume: 0.35, loop: false });
        this.voice_03 = this.sound.add('voice_03', { volume: 0.35, loop: false });
        this.voice_dozhd = this.sound.add('voice_dozhd', { volume: 0.15, loop: true });
        this.voice_grom = this.sound.add('voice_grom', { volume: 0.35, loop: false });

        this.tablet_right = this.add.image(1840, 450, 'tablet_right');
        this.tablet_right.visible = false;

        // Персонаж
        this.player = new Player(this, 80, 600);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 80, 600, true);
        }

        this.dolphin = new Dolphin(this, 1200, 925, false, true, 'dolphin');
        this.dolphin_invert = new Dolphin(this, 1200, 925, true, true, 'dolphin_invert');

        this.tool_tip1 = new Tooltip(this, 1200, 925, 'dialog_01', this.dolphin_invert, this.voice_01);
        this.tool_tip2 = new Tooltip(this, 1200, 925, 'dialog_02', this.dolphin_invert, this.voice_02);
        this.tool_tip3 = new Tooltip(this, 1200, 925, 'dialog_03', this.dolphin_invert, this.voice_03, true);

        this.currentStage = 1;  // Изначально текущий этап - первый

        // Маркер остановки сцены (для анимаций)
        this.sceneStoped = false;

        // Отвечает за цикл анимаций
        this.skipTooltip1 = false;
        this.skipTooltip2 = false;

        // Создаем анимацию удара молнии
        this.anims.create({
            key: 'animation_groza',
            frames: [
                { key: 'groza_02' },
                { key: 'groza_03' },
                { key: 'groza_04' },
                { key: 'groza_05' },
                { key: 'groza_06' },
                { key: 'groza_07' },
                { key: 'groza_08' },
                { key: 'groza_01' },
            ],
            frameRate: 16,
            repeat: 0
        });

        // Создаем анимацию дождя
        this.anims.create({
            key: 'animation_dozhd',
            frames: [
                { key: 'dozhd_01' },
                { key: 'dozhd_02' },
                { key: 'dozhd_03' },
            ],
            frameRate: 12,
            repeat: -1
        });

        // Создаем анимацию ожидания (просто темный фон висит 1 секунду)
        this.anims.create({
            key: 'animation_stop',
            frames: [
                { key: 'groza_01' },
            ],
            frameRate: 1,
            repeat: 0
        });

        this.perehod = this.add.sprite(0, 0, 'perehod').setOrigin(0, 0);
        this.anims.create({
            key: 'anim_perehod',
            frames: [
                { key: 'perehod' },
                { key: 'perehod' },
            ],
            frameRate: 1,
            repeat: 1
        });
        this.perehod.visible = false;

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

        //Правая граница полигона
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
            { x: 0, y: 940},
            { x: 390, y: 882 },
            { x: 779, y: 848 },
            { x: 1920, y: 883 },
            { x: 1920, y: 1080 },
            { x: 0, y: 1080 },
        ];
        this.matter.add.fromVertices(
            996, 996,
            downWallVer,
            { isStatic: true }
        );

        // Верхняя граница полигона
        const upWallVer = [
            { x: 0, y: 0},
            { x: 0, y: 100},
            { x: 251, y: 120},
            { x: 540, y: 250},
            { x: 868, y: 275},
            { x: 1141, y: 250 },
            { x: 1250, y: 350 },
            { x: 1750, y: 350 },
            { x: 1750, y: 275 },
            { x: 1920, y: 200 },
            { x: 1920, y: 0 },
        ];
        this.matter.add.fromVertices(
            1050, 220,
            upWallVer,
            { isStatic: true }
        );

        // Для работы стрелок влево и вправо
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
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
        if (!this.tool_tip2.showed)
        {
            if (!this.tool_tip2.visible) {
                this.tool_tip2.show();
            }
            return;
        }

        this.tweens.add({
            targets: this.background_dozhd,
            alpha: 1,         // конечная прозрачность (1 = полностью видно)
            duration: 2000,   // время анимации (мс)
            ease: 'Linear'    // можно попробовать 'Sine.easeInOut' для плавности
        });

        this.background_dozhd.play('animation_dozhd');
        this.voice_dozhd.play();

        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip1 = false;

    }

    start_tool_tips_cycle_02 () {
        if (!this.tool_tip3.showed) {
            if (!this.tool_tip3.visible) {
                this.tool_tip3.show()
            }
            return;
        }

        this.tablet_right.visible = true;
        this.skipTooltip2 = false;
    }


    update (_, delta) {

        // Переменная с позицией игрока по X
        let posX = this.player.x;
        let posY = this.player.y;

        if (this.skipTooltip1) {
            this.start_tool_tips_cycle_01();
        }

        if (this.skipTooltip2){
            this.start_tool_tips_cycle_02();
        }

        // Перемещение теперь в функции move() в классе Player:
        this.player.move();

        // Логика этапов игры

        // Первый этап (подойти правее)
        if (this.currentStage === 1)
        {
            if (posX >= 200) {
                // Останавливаем сцену
                this.sceneStoped = true;

                this.skipTooltip1 = true;

                // Через смену прозрачности меняем фон на тёмый
                this.tweens.add({
                    targets: this.background_dark,
                    alpha: 1,         // конечная прозрачность (1 = полностью видно)
                    duration: 1000,   // время анимации (мс)
                    ease: 'Linear'    // можно попробовать 'Sine.easeInOut' для плавности
                });

                this.background_music.stop();

                // Меняем этап на второй
                this.currentStage = 2;
            }
        }

        // Второй этап (добежать до беседки)
        if (this.currentStage === 2)
        {
            if (posX >= 1345 && posY <= 540 && posX <= 1610)
            {
                this.voice_dozhd.stop();
                this.background_music.play();

                this.tweens.add({
                    targets: this.background_dozhd,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear'
                });

                this.background_dark.play('animation_groza');
                this.voice_grom.play();

                this.background_dark.on('animationcomplete', (anim, _) => {
                    if (anim.key === 'animation_groza') {
                        this.background_dark.play('animation_stop');
                    }
                });

                this.background_dark.on('animationcomplete', (anim, _) => {
                    if (anim.key === 'animation_stop') {
                        this.tweens.add({
                            targets: this.background_dark,
                            alpha: 0,
                            duration: 1000,
                            ease: 'Linear'
                        });

                        this.skipTooltip2 = true;
                    }
                });

                this.currentStage = 3;
            }
        }

        // Третий этап (уйти в правый край экрана)
        if (this.currentStage === 3)
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
                    this.scene.launch('Level_7');
                });
            }
        }
    }
}
