import Phaser from "phaser";

import scene_09 from '/src/game/assets/level_09/scene_09.png'
import scene_09_01 from '/src/game/assets/level_09/scene_09_01.png'
import perehod from "/src/game/assets/basic/perehody/perehod_09-10.jpg"

// Импорт палки
import tablet_right from '/src/game/assets/basic/tablet_right.png'
import wood from '/src/game/assets/level_09/wood.png'
import wo_od from '/src/game/assets/level_09/wo_od.png'

import textHelp from '/src/game/assets/basic/text_help.png'

// Импорт диалогов
import dialog_01 from '/src/game/assets/level_09/dialog_01.png'
import dialog_02 from '/src/game/assets/level_09/dialog_02.png'
import dialog_03 from '/src/game/assets/level_09/dialog_03.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import background_music from '/src/game/assets/basic/background_forest.mp3'
import voice_01 from '/src/game/assets/level_09/voice_01.wav'
import voice_02 from '/src/game/assets/level_09/voice_02.wav'
import voice_03 from '/src/game/assets/level_09/voice_03.wav'
import voice_wood from '/src/game/assets/level_09/voice_wood.mp3'
import voice_yyyy from '/src/game/assets/level_09/voice_yyyy.mp3'

import playerImage from '/src/game/assets/basic/player.png'
import dolphin from '/src/game/assets/basic/dolphin.png'

import { Player } from "/src/game/entities/player.js";
import { Tooltip } from "/src/game/tooltip/tooltip.js";
import { BezDelphina } from "/src/game/tooltip/bez_delphina.js";
import { Dolphin } from "/src/game/entities/dolphin.js";
import playerImageGirl from "@/game/assets/basic/player_girl.png";

export class Level_09 extends Phaser.Scene
{
    constructor() {
        super('Level_9');
    }

    preload ()
    {
        this.textures.remove('dialog_01');
        this.textures.remove('dialog_02');
        this.textures.remove('dialog_03');
        this.textures.remove('perehod');
        this.anims.remove('anim_perehod');
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

        // Загрузка картинки перехода между уровнями как спрайта (чтобы сделать из него анимацию)
        this.load.spritesheet('perehod', perehod, {
            frameWidth: 1920,
            frameHeight: 1080
        });

        // загрузка сцены
        this.load.image('scene_09', scene_09);
        this.load.image('scene_09_01', scene_09_01);

        // Мобильное управление
        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        this.load.image('tablet_right', tablet_right);

        // Таблички "не подходить"
        this.load.image('wood',wood)
        this.load.image('wo_od',wo_od)

        this.load.image('textHelp', textHelp);

        // Диалоговые окна
        this.load.image('dialog_01', dialog_01);
        this.load.image('dialog_02', dialog_02);
        this.load.image('dialog_03', dialog_03);

        // Музыка
        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('voice_03', voice_03);
        this.load.audio('voice_wood', voice_wood);
        this.load.audio('voice_yyyy', voice_yyyy);
        this.load.audio('background_music', background_music);
    }

    create ()
    {
        // Установка сцены
        this.background = this.add.image(0, 0, 'scene_09').setOrigin(0, 0);
        this.background_01 = this.add.image(0, 0, 'scene_09_01').setOrigin(0, 0);
        this.background_01.visible = false;

        // Фоновая музыка сцены
        this.background_music = this.sound.add('background_music', { volume: 0.2, loop: true });
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
        this.tablet_right = this.add.image(1640, 500, 'tablet_right');
        this.tablet_right.visible = false;

        this.skipTooltip1 = false;
        this.skipTooltip2 = false;
        this.skip_stop_yyyy = false;

        // Дерево
        this.wood = this.add.image(370, 815, 'wood');
        this.wo_od = this.add.image(370, 815, 'wo_od');
        this.wo_od.visible = false;

        // Персонаж
        this.player = new Player(this, 80, 650);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 80, 650, true);
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
            { x: 0, y: 406 },
            { x: 260, y: 480 },
            { x: 620, y: 745 },
            { x: 943, y: 457 },
            { x: 1446, y: 379 },
            { x: 1782, y: 490 },
            { x: 1920, y: 505 },
            { x: 1920, y: 0 },
        ];
        this.matter.add.fromVertices(
            1055, 330,
            upWallVer,
            { isStatic: true }
        );

        // Нижняя граница полигона
        const downWallVer = [
            { x: 0, y: 1080 },
            { x: 0, y: 750 },
            { x: 332, y: 900 },
            { x: 380, y: 1000 },
            { x: 879, y: 950 },
            { x: 1267, y: 732 },
            { x: 1651, y: 874 },
            { x: 1920, y: 1080 },
        ];
        this.matter.add.fromVertices(
            850, 920,
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

        this.voice_wood = this.sound.add('voice_wood', { volume: 0.35, loop: false });
        this.voice_yyyy = this.sound.add('voice_yyyy', { volume: 0.35, loop: false });

        // Создаём всплывающие подсказки
        this.dolphinInstance1 = new Dolphin(this, 1180, 850, false, true, 'dolphin');
        this.tool_tip = new BezDelphina(this, 1180, 850, 'dialog_01', this.voice_01, true);
        this.tool_tip2 = new BezDelphina(this, 1180, 850, 'dialog_02', this.voice_02, true);
        this.tool_tip3 = new Tooltip(this, 1180, 850, 'dialog_03', this.dolphinInstance1, this.voice_03);

        this.stageChanged = false;
    }

    stop_poka_yyyy () {
        this.sceneStoped = true;

        // Когда анимация закончилась, ставим skip_stop_yyyy обратно в false
        this.voice_yyyy.once('complete', () => {
            console.log('Закончилась');
            this.skip_stop_yyyy = false;
            this.sceneStoped = false;

            // После этого показываем дельфина
            this.skipTooltip1 = true;
        });
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

        this.skipTooltip2 = true;
        this.background_01.visible = true;

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
            this.start_tool_tip_cycle_01();
        }

        if (this.skipTooltip2)
        {
            this.start_tool_tip_cycle_02();
        }

        if (this.skip_stop_yyyy) {
            this.stop_poka_yyyy();
        }

        // Переменная с позицией игрока по X и Y
        let posX = this.player.x;
        let posY = this.player.y;

        // Перемещение теперь в функции move() в классе Player:
        this.player.move();

        // Первый этап (подойти правее)
        if (this.currentStage === 1)
        {
            if (posX >= 370)
            {
                // this.player.stopMove();

                this.wood.visible = false;
                this.wo_od.visible = true;

                this.voice_wood.play();

                // this.skipTooltip1 = true;
                // this.table_not_go_01.visible = true;

                // Меняем этап на второй
                this.currentStage = 2;
                // this.stageChanged = true;
            }
        }

        // Второй этап (поставить табличку)
        else if (this.currentStage === 2)
        {
            if (posX >= 500 && posY >= 820)
            {
                this.voice_yyyy.play();
                this.skip_stop_yyyy = true;

                // Меняем этап на третий
                this.currentStage = 3;
            }
        }

        // // Четвертый этап (уйти на след. уровень)
        else if (this.currentStage === 3)
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
                    this.scene.launch('Level_10');
                });
            }
        }
    }
}
