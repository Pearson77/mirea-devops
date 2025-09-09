import Phaser from "phaser";

import scene_10 from '/src/game/assets/level_10/scene_10.png'

// Импорт палки
import tablet_right from '/src/game/assets/basic/tablet_right.png'

import textHelp from '/src/game/assets/basic/text_help.png'

// Импорт картинок
import trash_01 from '/src/game/assets/level_10/trash_01.png'
import trash_02 from '/src/game/assets/level_10/trash_02.png'
import trash_03 from '/src/game/assets/level_10/trash_03.png'
import trash_04 from '/src/game/assets/level_10/trash_04.png'
import trash_05 from '/src/game/assets/level_10/trash_05.png'
import trash_can_green_01 from '/src/game/assets/level_10/trash_can_green_01.png'
import trash_can_green_02 from '/src/game/assets/level_10/trash_can_green_02.png'
import trash_can_green_03 from '/src/game/assets/level_10/trash_can_green_03.png'
import trash_can_red_01 from '/src/game/assets/level_10/trash_can_red_01.png'
import trash_can_red_02 from '/src/game/assets/level_10/trash_can_red_02.png'
import table_not_swim from '/src/game/assets/level_10/table_not_swim.png'

import animation_img_01 from '/src/game/assets/level_10/animation_scene_10/coast_01.png'
import animation_img_02 from '/src/game/assets/level_10/animation_scene_10/coast_02.png'
import animation_img_03 from '/src/game/assets/level_10/animation_scene_10/coast_03.png'
import animation_img_04 from '/src/game/assets/level_10/animation_scene_10/coast_04.png'
import animation_img_05 from '/src/game/assets/level_10/animation_scene_10/coast_05.png'
import animation_img_06 from '/src/game/assets/level_10/animation_scene_10/coast_06.png'
import animation_img_07 from '/src/game/assets/level_10/animation_scene_10/coast_07.png'

// Импорт диалогов
import dialog_01 from '/src/game/assets/level_10/dialog_01.png'
import dialog_02 from '/src/game/assets/level_10/dialog_02.png'
import dialog_03 from '/src/game/assets/level_10/dialog_03.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import background_music from '/src/game/assets/basic/background_music.mp3'
import voice_01 from '/src/game/assets/level_10/voice_01.wav'
import voice_02 from '/src/game/assets/level_10/voice_02.wav'
import voice_03 from '/src/game/assets/level_10/voice_03.wav'
import voice_bax from '/src/game/assets/level_10/voice_bax.mp3'

import playerImage from '/src/game/assets/basic/player.png'
import dolphin from '/src/game/assets/basic/dolphin.png'
import dolphin_invert from '/src/game/assets/basic/dolphin_invert.png'

import { Player } from "/src/game/entities/player.js";
import { Tooltip } from "/src/game/tooltip/tooltip.js";
import { Dolphin } from "/src/game/entities/dolphin.js";
import playerImageGirl from "@/game/assets/basic/player_girl.png";

export class Level_10 extends Phaser.Scene
{
    constructor() {
        super('Level_10');
    }

    preload ()
    {
        this.textures.remove('dialog_01');
        this.textures.remove('dialog_02');
        this.textures.remove('dialog_03');

        this.cache.audio.remove('background_music');

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

        // загрузка сцены
        this.load.image('scene_10', scene_10);

        // Мобильное управление
        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        this.load.image('tablet_right', tablet_right);

        this.load.image('textHelp', textHelp);

        // Картинки
        this.load.image('trash_01_10', trash_01);
        this.load.image('trash_02_10', trash_02);
        this.load.image('trash_03_10', trash_03);
        this.load.image('trash_04_10', trash_04);
        this.load.image('trash_05_10', trash_05);
        this.load.image('trash_can_green_01', trash_can_green_01);
        this.load.image('trash_can_green_02', trash_can_green_02);
        this.load.image('trash_can_green_03', trash_can_green_03);
        this.load.image('trash_can_red_01', trash_can_red_01);
        this.load.image('trash_can_red_02', trash_can_red_02);
        this.load.image('table_not_swim', table_not_swim);

        this.load.image('animation_img_01', animation_img_01);
        this.load.image('animation_img_02', animation_img_02);
        this.load.image('animation_img_03', animation_img_03);
        this.load.image('animation_img_04', animation_img_04);
        this.load.image('animation_img_05', animation_img_05);
        this.load.image('animation_img_06', animation_img_06);
        this.load.image('animation_img_07', animation_img_07);

        // Диалоговые окна
        this.load.image('dialog_01', dialog_01);
        this.load.image('dialog_02', dialog_02);
        this.load.image('dialog_03', dialog_03);

        // Музыка
        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('voice_03', voice_03);
        this.load.audio('voice_bax', voice_bax);
        this.load.audio('background_music', background_music);
    }

    create ()
    {
        // Установка сцены
        this.background = this.add.image(0, 0, 'scene_10').setOrigin(0, 0);

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

        // Стрелка с направлением
        this.tablet_right = this.add.image(1840, 400, 'tablet_right');
        this.tablet_right.visible = false;

        this.skipTooltip1 = false;
        this.skipTooltip2 = false;

        this.trash_01 = this.add.image(490, 377, 'trash_01_10');
        this.trash_02 = this.add.image(726, 751, 'trash_02_10');
        this.trash_03 = this.add.image(1020, 724, 'trash_03_10');
        this.trash_04 = this.add.image(1126, 441, 'trash_04_10');
        this.trash_05 = this.add.image(1727, 882, 'trash_05_10');
        this.trash_can_green_01 = this.add.image(1365, 383, 'trash_can_green_01');
        this.trash_can_green_01.visible = false;
        this.trash_can_green_02 = this.add.image(1365, 383, 'trash_can_green_02');
        this.trash_can_green_02.visible = false;
        this.trash_can_green_03 = this.add.image(1365, 383, 'trash_can_green_03');
        this.trash_can_green_03.visible = false;
        this.trash_can_red_01 = this.add.image(1588, 399, 'trash_can_red_01');
        this.trash_can_red_01.visible = false;
        this.trash_can_red_02 = this.add.image(1588, 399, 'trash_can_red_02');
        this.trash_can_red_02.visible = false;

        this.backgroundSprite = this.add.sprite(0, 562, 'animation_img_01').setOrigin(0, 0);
        this.anims.create({
            key: 'animation_coast',
            frames: [
                { key: 'animation_img_01' },
                { key: 'animation_img_02' },
                { key: 'animation_img_03' },
                { key: 'animation_img_04' },
                { key: 'animation_img_05' },
                { key: 'animation_img_06' },
                { key: 'animation_img_07' },
            ],
            frameRate: 4,
            repeat: 0
        });

        // Персонаж
        this.player = new Player(this, 80, 500);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 80, 500, true);
        }

        this.table_not_swim = this.add.image(216, 560, 'table_not_swim');
        this.table_not_swim.visible = false;

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

        // Верхняя граница полигона
        const upWallVer = [
            { x: 0, y: 0 },
            { x: 0, y: 223 },
            { x: 296, y: 226 },
            { x: 601, y: 259 },
            { x: 930, y: 303 },
            { x: 1146, y: 316 },
            { x: 1590, y: 326 },
            { x: 1920, y: 345 },
            { x: 1920, y: 0 },
        ];
        this.matter.add.fromVertices(
            760, 170,
            upWallVer,
            { isStatic: true }
        );

        // Нижняя граница полигона
        const downWallVer = [
            { x: 0, y: 1080 },
            { x: 0, y: 620 },
            { x: 200, y: 640 },
            { x: 560, y: 800 },
            { x: 998, y: 809 },
            { x: 1277, y: 836 },
            { x: 1399, y: 946 },
            { x: 1920, y: 964 },
            { x: 1920, y: 1080 },
        ];
        this.matter.add.fromVertices(
            730, 940,
            downWallVer,
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
        this.voice_03 = this.sound.add('voice_03', { volume: 0.35, loop: false });
        this.voice_bax = this.sound.add('voice_bax', { volume: 0.35, loop: false });

        // Создаём всплывающие подсказки
        this.dolphinInstance = new Dolphin(this, 1180, 850, false, true, 'dolphin');
        this.dolphinInstance1 = new Dolphin(this, 1180, 850, true, true, 'dolphin_invert');
        this.tool_tip1 = new Tooltip(this, 1180, 850, 'dialog_01', this.dolphinInstance, this.voice_01);
        this.tool_tip2 = new Tooltip(this, 1180, 850, 'dialog_02', this.dolphinInstance, this.voice_02);
        this.tool_tip3 = new Tooltip(this, 1180, 850, 'dialog_03', this.dolphinInstance1, this.voice_03, true);

        this.stageChanged = false;
    }

    start_tool_tip_cycle_01 () {
        if (!this.tool_tip1.showed) {
            if (!this.tool_tip1.visible)
                this.tool_tip1.show();
            return;
        }
        if (!this.tool_tip2.showed) {
            if (!this.tool_tip2.visible)
                this.tool_tip2.show();
            return;
        }

        this.table_not_swim.visible = true;

        this.skipTooltip1 = false;
    }

    start_tool_tip_cycle_02 () {
        if (!this.tool_tip3.showed) {
            if (!this.tool_tip3.visible)
                this.tool_tip3.show();
            return;
        }

        this.tablet_right.visible = true;

        this.skipTooltip2 = false;
    }

    update (_, delta) {

        // Переменная с позицией игрока по X и Y
        let posX = this.player.x;
        let posY = this.player.y;

        if (this.skipTooltip1) {
            this.start_tool_tip_cycle_01();
        }

        if (this.skipTooltip2) {
            this.start_tool_tip_cycle_02();
        }

        // Перемещение теперь в функции move() в классе Player:
        this.player.move();

        // Первый этап (анимация дельфина  и обрушение берега + табличка)
        if (this.currentStage === 1)
        {
            if (posX >= 180)
            {
                // Останавливаем сцену
                this.sceneStoped = true;
                this.player.stopMove();

                // Анимация берега
                this.backgroundSprite.play('animation_coast');
                this.voice_bax.play();

                this.backgroundSprite.on('animationcomplete', () => {
                    this.backgroundSprite.setTexture('animation_img_07');
                    this.skipTooltip1 = true;
                });

                // Меняем этап на второй
                this.currentStage = 2;
            }
        }

        // Взять яболоко 1
        else if (this.currentStage === 2)
        {
            if (posX >= 425 && posX <= 522 && posY <= 432)
            {
                this.trash_01.visible = false;
                this.currentStage = 3;
            }
        }

        // Положить в зеленый бак
        else if (this.currentStage === 3)
        {
            if (posX >= 1225 && posX <= 1453 && posY <= 475)
            {
                this.trash_can_green_01.visible = true;
                this.currentStage = 4;
            }
        }

        // Взять яболоко 2
        else if (this.currentStage === 4)
        {
            if (posX >= 654 && posX <= 778 && posY >= 676)
            {
                this.trash_02.visible = false;
                this.currentStage = 5;
            }
        }

        // положить в зеленый бак 2
        else if (this.currentStage === 5)
        {
            if (posX >= 1225 && posX <= 1453 && posY <= 475)
            {
                this.trash_can_green_02.visible = true;
                this.trash_can_green_01.visible = false;
                this.currentStage = 6;
            }
        }

        // Взять  батарейки
        else if (this.currentStage === 6)
        {
            if (posX >= 930 && posX <= 1078 && posY >= 635)
            {
                this.trash_03.visible = false;
                this.currentStage = 7;
            }
        }

        // положить в бак красный
        else if (this.currentStage === 7)
        {
            if (posX >= 1484 && posX <= 1700 && posY <= 475)
            {
                this.trash_can_red_01.visible = true;
                this.currentStage = 8;
            }
        }

        // Взять градусник
        else if (this.currentStage === 8)
        {
            if (posX >= 1039 && posX <= 1197 && posY <= 445)
            {
                this.trash_04.visible = false;
                this.currentStage = 9;
            }
        }

        // положить в бак красный 2
        else if (this.currentStage === 9)
        {
            if (posX >= 1484 && posX <= 1700 && posY <= 475)
            {
                this.trash_can_red_02.visible = true;
                this.trash_can_red_01.visible = false;
                this.currentStage = 10;
            }
        }

        // Взять пакет
        else if (this.currentStage === 10)
        {
            if (posX >= 1598 && posX <= 1835 && posY >= 768)
            {
                this.trash_05.visible = false;
                this.currentStage = 11;
            }
        }

        // положить в зеленый бак 3
        else if (this.currentStage === 11)
        {
            if (posX >= 1225 && posX <= 1453 && posY <= 475)
            {
                this.trash_can_green_03.visible = true;
                this.trash_can_green_02.visible = false;

                this.skipTooltip2 = true;

                this.currentStage = 12;
            }
        }

        else if (this.currentStage === 12)
        {
            if (posX >= 1830)
            {
                this.scene.stop();
                this.background_music.stop();

                const rebusScenes = [
                    "RebusScene1",
                    "RebusScene2",
                    "RebusScene3",
                    "RebusScene4",
                    "RebusScene5",
                    "CrosswordScene01",
                    "CrosswordScene02",
                ];

                this.scene.stop();
                this.background_music.stop();
                this.sound.removeAll();

                const randomScene = Phaser.Utils.Array.GetRandom(rebusScenes);
                this.scene.launch(randomScene);
            }
        }


//FFFFFFFFFFFFFFFFFFFFFFFFFFFuck



    }
}
