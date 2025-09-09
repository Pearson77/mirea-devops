import Phaser from "phaser";

import sceneImg from '/src/game/assets/level_02/scene_02.png'
import perehod from "/src/game/assets/basic/perehody/perehod_02-03.jpg"

import animationImg_01 from '/src/game/assets/level_02/animation_scene_02/coast_01.png'
import animationImg_02 from '/src/game/assets/level_02/animation_scene_02/coast_02.png'
import animationImg_03 from '/src/game/assets/level_02/animation_scene_02/coast_03.png'
import animationImg_04 from '/src/game/assets/level_02/animation_scene_02/coast_04.png'
import animationImg_05 from '/src/game/assets/level_02/animation_scene_02/coast_05.png'
import animationImg_06 from '/src/game/assets/level_02/animation_scene_02/coast_06.png'
import animationImg_07 from '/src/game/assets/level_02/animation_scene_02/coast_07.png'
import animationImg_08 from '/src/game/assets/level_02/animation_scene_02/coast_08.png'

import table_not_swimming from '/src/game/assets/level_02/not_swimming.png'
import tablet_left from '/src/game/assets/basic/tablet_left.png'

import textHelp from '/src/game/assets/basic/text_help.png'

import dialog_01 from '/src/game/assets/level_02/dialog_01.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import background_music from '/src/game/assets/basic/background_music.mp3'
import voice_01 from '/src/game/assets/level_02/voice_01.wav'
import voice_bax from '/src/game/assets/level_02/voice_bax.mp3'

import playerImage from '/src/game/assets/basic/player.png'
import dolphin from '/src/game/assets/basic/dolphin_invert.png'

import { Player } from "/src/game/entities/player.js";
import { Tooltip } from "/src/game/tooltip/tooltip.js";
import { Dolphin } from "/src/game/entities/dolphin.js";
import playerImageGirl from "@/game/assets/basic/player_girl.png";
// import { help } from "/src/tooltip/help.js"; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

export class Level_02 extends Phaser.Scene
{
    constructor() {
        super('Level_2');  // По сути название сцены
    }

    preload ()
    {
        this.textures.remove('dialog_01');
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

        this.load.spritesheet('dolphin_right', dolphin, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Загрузка картинки перехода между уровнями как спрайта (чтобы сделать из него анимацию)
        this.load.spritesheet('perehod', perehod, {
            frameWidth: 1920,
            frameHeight: 1080
        });

        this.load.image('sceneImg', sceneImg);

        this.load.image('animationImg_01', animationImg_01);
        this.load.image('animationImg_02', animationImg_02);
        this.load.image('animationImg_03', animationImg_03);
        this.load.image('animationImg_04', animationImg_04);
        this.load.image('animationImg_05', animationImg_05);
        this.load.image('animationImg_06', animationImg_06);
        this.load.image('animationImg_07', animationImg_07);
        this.load.image('animationImg_08', animationImg_08);

        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        this.load.image('table_not_swimming', table_not_swimming);
        this.load.image('tablet_left', tablet_left);

        this.load.image('textHelp', textHelp);

        this.load.image('dialog_01', dialog_01);

        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_bax', voice_bax);
        this.load.audio('background_music', background_music);
    }

    create ()
    {

        this.background = this.add.image(0, 0, 'sceneImg');
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

        // Создаем анимацию берега
        this.backgroundSprite = this.add.sprite(808.01, 790.35, 'animationImg_01');
        this.anims.create({
            key: 'animationCoast',
            frames: [
                { key: 'animationImg_01' },
                { key: 'animationImg_02' },
                { key: 'animationImg_03' },
                { key: 'animationImg_04' },
                { key: 'animationImg_05' },
                { key: 'animationImg_06' },
                { key: 'animationImg_07' },
                { key: 'animationImg_08' },
            ],
            frameRate: 4,
            repeat: 0
        });

        this.tablet_left = this.add.image(70, 450, 'tablet_left');
        this.tablet_left.visible = false;

        // Персонаж
        this.player = new Player(this, 1725, 800);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 1725, 800, true);
        }

        // Таблички "осторожно"
        this.table_not_swimming_01 = this.add.image(1050, 580, 'table_not_swimming');
        this.table_not_swimming_02 = this.add.image(300, 540, 'table_not_swimming');
        this.table_not_swimming_01.visible = false;
        this.table_not_swimming_02.visible = false;

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

        // this.skipTooltip = false;

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

        //Правая граница полигона и центра тела
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
            { x: 0, y: 1920 },
            { x: 0, y: 700 },
            { x: 259, y: 643 },
            { x: 700, y: 600 },
            { x: 911, y: 628 },
            { x: 1016, y: 691 },
            { x: 1484, y: 682 },
            { x: 1920, y: 800 },
            { x: 1920, y: 1920 },
            { x: 0, y: 1920 },
        ];
        this.matter.add.fromVertices(
            1190, 1240,
            downWallVer,
            { isStatic: true }
        );

        // Верхняя граница полигона
        const upWallVer = [
            { x: 0, y: 0 },
            { x: 0, y: 570 },
            { x: 365, y: 515 },
            { x: 690, y: 500 },
            { x: 960, y: 505 },
            { x: 1400, y: 575 },
            { x: 1770, y: 645 },
            { x: 1920, y: 615 },
            { x: 1920, y: 0 },
        ];
        this.matter.add.fromVertices(
            625, 150,
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

        this.skip_tool_tip_1 = false;

        // Создаём звуки диалогов
        this.voice_01 = this.sound.add('voice_01', { volume: 0.35, loop: false });
        this.voice_bax = this.sound.add('voice_bax', { volume: 0.35, loop: false });

        // Создаём всплывающие подсказки
        this.dolphinInstance1 = new Dolphin(this, 750, 1050, true, true, 'dolphin_right');
        this.tool_tip = new Tooltip(this, 750, 900, 'dialog_01', this.dolphinInstance1, this.voice_01, true);
    }

    start_tool_tip_cycle_01 () {
        if (!this.tool_tip.showed) {
            if (!this.tool_tip.visible)
                this.tool_tip.show();
            return;
        }

        this.tablet_left.visible = true;

        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip1 = false;
    }

    update (_, delta) {
        // Переменная с позицией игрока по X
        let posX = this.player.x;

        if (this.skip_tool_tip_1) {
            this.start_tool_tip_cycle_01();
        }

        // Перемещение теперь в функции move() в классе Player:
        this.player.move();

        // Логика этапов игры

        // Проверки завершения текущего этапа

        // Первый этап (подойти правее)
        if (this.currentStage === 1)
        {
            if (posX <= 1600)  // Достигнута точка, где лежит буёк
            {
                // Останавливаем сцену
                this.sceneStoped = true;
                this.player.stopMove();

                // Запускаем анимацию
                this.backgroundSprite.play('animationCoast');
                this.voice_bax.play();

                // Остановимся на последнем кадре после завершения
                this.backgroundSprite.on('animationcomplete', () => {
                    this.backgroundSprite.setTexture('animationImg_08');
                    this.skip_tool_tip_1 = true;
                });

                // Меняем этап на второй
                this.currentStage = 2;
            }
        }

        // Второй этап (поставить табличку)
        else if (this.currentStage === 2)
        {
            if (posX <= 1075) {
                this.player.stopMove();

                this.table_not_swimming_01.visible = true;

                // this.skipTooltip = true; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                this.player.x = posX;
                // this.player.y = 800;

                // Меняем этап на третий
                this.currentStage = 3;
            }
        }

        // Третий этап (поставить табличку)
        else if (this.currentStage === 3)
        {
            if (posX <= 325) {
                this.player.stopMove();

                this.table_not_swimming_02.visible = true;

                // Меняем этап на четвертый
                this.currentStage = 4;
            }
        }

        // Четвертый этап (уйти на след. уровень)
        else if (this.currentStage === 4)
        {
            if (posX - 60 <= 30)  // Персонаж вернулся на берег
            {
                this.perehod.visible = true;
                this.perehod.play('anim_perehod');
                this.currentStage = 0;

                this.perehod.once('animationcomplete', () => {
                    this.scene.stop();
                    this.background_music.stop();
                    this.sound.removeAll();
                    this.scene.launch('Level_3');
                });
            }
        }
    }
}
