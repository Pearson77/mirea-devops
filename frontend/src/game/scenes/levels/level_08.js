import Phaser from "phaser";

import scene_08 from '/src/game/assets/level_08/scene_08.png'
import perehod from "/src/game/assets/basic/perehody/perehod_08-09.jpg"

// Импорт табличек
import table_not_go_01 from '/src/game/assets/level_08/table_not_go_01.png'
import table_not_go_02 from '/src/game/assets/level_08/table_not_go_02.png'
import table_not_go_03 from '/src/game/assets/level_08/table_not_go_03.png'
import arrow_right from '/src/game/assets/basic/arrow_right.png'
import tablet_right from '/src/game/assets/basic/tablet_right.png'

import textHelp from '/src/game/assets/basic/text_help.png'

// Импорт диалогов
import dialog_01 from '/src/game/assets/level_08/dialog_01.png'
import dialog_02 from '/src/game/assets/level_08/dialog_02.png'
import dialog_03 from '/src/game/assets/level_08/dialog_03.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import background_music from '/src/game/assets/basic/background_music.mp3'
import voice_01 from '/src/game/assets/level_08/voice_01.wav'
import voice_02 from '/src/game/assets/level_08/voice_02.wav'
import voice_03 from '/src/game/assets/level_08/voice_03.wav'

import playerImage from '/src/game/assets/basic/player.png'
import dolphin from '/src/game/assets/basic/dolphin_invert.png'

import { Player } from "/src/game/entities/player.js";
import { Tooltip } from "/src/game/tooltip/tooltip.js";
import { Dolphin } from "/src/game/entities/dolphin.js";
import { Arrow } from "@/game/tooltip/arrow.js";
import playerImageGirl from "@/game/assets/basic/player_girl.png";

export class Level_08 extends Phaser.Scene
{
    constructor() {
        super('Level_8');
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

        this.load.spritesheet('dolphin_right', dolphin, {
            frameWidth: 166,
            frameHeight: 233
        });

        // Загрузка картинки перехода между уровнями как спрайта (чтобы сделать из него анимацию)
        this.load.spritesheet('perehod', perehod, {
            frameWidth: 1920,
            frameHeight: 1080
        });

        // загрузка сцены
        this.load.image('scene_08', scene_08);

        // Мобильное управление
        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        this.load.image('tablet_right', tablet_right);
        this.load.image('arrow_right', arrow_right);

        // Таблички "не подходить"
        this.load.image('table_not_go_01',table_not_go_01)
        this.load.image('table_not_go_02',table_not_go_02)
        this.load.image('table_not_go_03',table_not_go_03)

        this.load.image('textHelp', textHelp);

        // Диалоговые окна
        this.load.image('dialog_01', dialog_01);
        this.load.image('dialog_02', dialog_02);
        this.load.image('dialog_03', dialog_03);

        // Музыка
        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('voice_03', voice_03);
        this.load.audio('background_music', background_music);
    }

    create ()
    {
        // Установка сцены
        this.background = this.add.image(0, 0, 'scene_08').setOrigin(0, 0);

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
        this.tablet_right = this.add.image(1840, 490, 'tablet_right');
        this.tablet_right.visible = false;

        this.skipTooltip1 = false;
        this.skipTooltip2 = false;

        // Табличка "осторожно" третья
        this.table_not_go_03 = this.add.image(1605, 700, 'table_not_go_03');
        this.table_not_go_03.visible = false;

        // Персонаж
        this.player = new Player(this, 80, 530);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 80, 530, true);
        }

        // Таблички "осторожно" первые две
        this.table_not_go_01 = this.add.image(218, 830, 'table_not_go_01');
        this.table_not_go_02 = this.add.image(1194, 895, 'table_not_go_02');
        this.table_not_go_01.visible = false;
        this.table_not_go_02.visible = false;

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

        // Верхняя граница полигона
        const upWallVer = [
            { x: 0, y: 0 },
            { x: 0, y: 302 },
            { x: 576, y: 371 },
            { x: 1032, y: 412 },
            { x: 1297, y: 548 },
            { x: 1603, y: 615 },
            { x: 1920, y: 650 },
            { x: 1920, y: 0 },
        ];
        this.matter.add.fromVertices(
            1200, 270,
            upWallVer,
            { isStatic: true }
        );

        // Нижняя граница полигона
        const downWallVer = [
            { x: 0, y: 1920 },
            { x: 0, y: 831 },
            { x: 384, y: 897 },
            { x: 1011, y: 951 },
            { x: 1384, y: 930 },
            { x: 1451, y: 1077 },
            { x: 1920, y: 1080 },
        ];
        this.matter.add.fromVertices(
            790, 1200,
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

        // Создаём всплывающие подсказки
        this.dolphinInstance1 = new Dolphin(this, 530, 925, true, true, 'dolphin_right');
        this.tool_tip = new Tooltip(this, 530, 925, 'dialog_01', this.dolphinInstance1, this.voice_01, true);
        this.tool_tip2 = new Tooltip(this, 530, 925, 'dialog_02', this.dolphinInstance1, this.voice_02, true);
        this.tool_tip3 = new Tooltip(this, 530, 925, 'dialog_03', this.dolphinInstance1, this.voice_03, true);

        this.stageChanged = false;
    }

    start_tool_tip_cycle_01 () {
        if (!this.tool_tip.showed) {
            if (!this.tool_tip.visible)
                this.tool_tip.show();
            return;
        }
        if (!this.tool_tip2.showed) {
            if (!this.tool_tip2.visible)
                this.tool_tip2.show();
            return;
        }

        this.arrow = new Arrow(this, 1194, 725, 'arrow_right');
        this.table_not_go_01.visible = true;
        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip1 = false;
    }

    start_tool_tip_cycle_02 () {
        if (!this.tool_tip3.showed) {
            if (!this.tool_tip3.visible)
                this.tool_tip3.show();
            return;
        }

        this.tablet_right.visible = true;

        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip2 = false;
    }

    update (_, delta) {

        if (this.skipTooltip1)
        {
            // Пока все стартовые подсказки не показаны, показываем их
            this.start_tool_tip_cycle_01();
        }

        if (this.skipTooltip2)
        {
            this.start_tool_tip_cycle_02();
        }

        // Переменная с позицией игрока по X
        let posX = this.player.x;

        // Перемещение теперь в функции move() в классе Player:
        this.player.move();

        // Первый этап (подойти правее)
        if (this.currentStage === 1)
        {
            if (posX >= 215)
            {
                this.sceneStoped = true;
                this.player.stopMove();

                this.skipTooltip1 = true;

                // Меняем этап на второй
                this.currentStage = 2;
                this.stageChanged = true;
            }
        }

        // Второй этап (поставить табличку)
        else if (this.currentStage === 2)
        {
            if (posX >= 1120)
            {
                this.table_not_go_02.visible = true;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 1616, 525, 'arrow_right');

                // Меняем этап на третий
                this.currentStage = 3;
            }
        }

        // Третий этап (поставить табличку)
        else if (this.currentStage === 3)
        {
            if (posX >= 1530)
            {
                this.player.stopMove();

                this.skipTooltip2 = true;
                this.table_not_go_03.visible = true;
                this.arrow.destroy();

                // Меняем этап на четвертый
                this.currentStage = 4;
            }
        }

        // // Четвертый этап (уйти на след. уровень)
        else if (this.currentStage === 4)
        {
            if (posX >= 1830)
            {
                this.perehod.visible = true;
                this.perehod.play('anim_perehod');
                this.currentStage = 0;

                this.perehod.once('animationcomplete', () => {
                    this.scene.stop();
                    this.background_music.stop();
                    this.sound.removeAll();
                    this.scene.launch('Level_9');
                });
            }
        }
    }
}
