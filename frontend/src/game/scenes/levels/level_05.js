import Phaser from "phaser";

// Импорт фона
import sceneImage from '/src/game/assets/level_05/scene_5.png'
import perehod from "/src/game/assets/basic/perehody/perehod_05-06.jpg"

// Импорт вспомогательных предметов: баки, мусор, надпись, диалоги
import trash_can_green from '/src/game/assets/level_05/trash_can_green.png'
import trash_can_green_01 from '/src/game/assets/level_05/trash_can_green_01.png'
import trash_can_green_02 from '/src/game/assets/level_05/trash_can_green_02.png'
import trash_can_green_03 from '/src/game/assets/level_05/trash_can_green_03.png'
import trash_can_red from '/src/game/assets/level_05/trash_can_red.png'
import trash_can_red_01 from '/src/game/assets/level_05/trash_can_red_01.png'
import trash_can_red_02 from '/src/game/assets/level_05/trash_can_red_02.png'

import trash_01 from '/src/game/assets/level_05/trash_01.png'
import trash_02 from '/src/game/assets/level_05/trash_02.png'
import trash_03 from '/src/game/assets/level_05/trash_03.png'
import trash_04 from '/src/game/assets/level_05/trash_04.png'
import trash_05 from '/src/game/assets/level_05/trash_05.png'
import tablet_right from '/src/game/assets/basic/tablet_right.png'

import textHelp from '/src/game/assets/basic/text_help.png'

import arrow_right from '/src/game/assets/basic/arrow_right.png'
import arrow_left from '/src/game/assets/basic/arrow_left.png'

import dialog_01 from '/src/game/assets/level_05/dialog_01.png'
import dialog_02 from '/src/game/assets/level_05/dialog_02.png'
import dialog_03 from '/src/game/assets/level_05/dialog_03.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import voice_01 from "../../assets/level_05/voice_01.wav";
import voice_02 from "../../assets/level_05/voice_02.wav";
import voice_03 from "../../assets/level_05/voice_03.wav";
import background_music from "../../assets/basic/background_music.mp3";

// Импорт персонажей и классов
import playerImage from '/src/game/assets/basic/player.png'
import dolphin from '/src/game/assets/basic/dolphin.png'
import dolphin_invert from '/src/game/assets/basic/dolphin_invert.png'

import { Player } from "/src/game/entities/player.js"
import { Tooltip } from "/src/game/tooltip/tooltip.js"
import { Dolphin } from "/src/game/entities/dolphin.js"
import { Arrow } from "/src/game/tooltip/arrow.js"
import playerImageGirl from "@/game/assets/basic/player_girl.png";

export class Level_05 extends Phaser.Scene
{
    constructor() {
        super('Level_5');  // По сути название сцены
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

        this.load.image('scene_5', sceneImage);

        this.load.image('trash_can_green', trash_can_green)
        this.load.image('trash_can_green_01', trash_can_green_01)
        this.load.image('trash_can_green_02', trash_can_green_02)
        this.load.image('trash_can_green_03', trash_can_green_03)
        this.load.image('trash_can_red', trash_can_red)
        this.load.image('trash_can_red_01', trash_can_red_01)
        this.load.image('trash_can_red_02', trash_can_red_02)

        this.load.image('mobile_arrow_up', mobile_arrow_up);
        this.load.image('mobile_arrow_down', mobile_arrow_down);
        this.load.image('mobile_arrow_right', mobile_arrow_right);
        this.load.image('mobile_arrow_left', mobile_arrow_left);

        this.load.image('trash_01', trash_01);
        this.load.image('trash_02', trash_02);
        this.load.image('trash_03', trash_03);
        this.load.image('trash_04', trash_04);
        this.load.image('trash_05', trash_05);
        this.load.image('tablet_tight', tablet_right);

        this.load.image('textHelp', textHelp);

        this.load.image('arrow_right', arrow_right);
        this.load.image('arrow_left', arrow_left);

        this.load.image('dialog_01', dialog_01);
        this.load.image('dialog_02', dialog_02);
        this.load.image('dialog_03', dialog_03);

        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('voice_03', voice_03);
        this.load.audio('background_music', background_music);
    }

    create () {
        // Создание фона
        this.background = this.add.image(0, 0, 'scene_5');
        this.background.setOrigin(0, 0)

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

        // Создание предметов
        this.trash_can_green = this.add.image(1480, 350, 'trash_can_green');
        this.trash_can_green_01 = this.add.image(1480, 350, 'trash_can_green_01');
        this.trash_can_green_01.visible = false;
        this.trash_can_green_02 = this.add.image(1480, 350, 'trash_can_green_02');
        this.trash_can_green_02.visible = false;
        this.trash_can_green_03 = this.add.image(1480, 350, 'trash_can_green_03');
        this.trash_can_green_03.visible = false;
        this.trash_can_red = this.add.image(1270, 290, 'trash_can_red');
        this.trash_can_red_01 = this.add.image(1270, 290, 'trash_can_red_01');
        this.trash_can_red_01.visible = false;
        this.trash_can_red_02 = this.add.image(1270, 290, 'trash_can_red_02');
        this.trash_can_red_02.visible = false;
        this.trash_01 = this.add.image(505, 393, 'trash_01')
        this.trash_02 = this.add.image(521, 576, 'trash_02')
        this.trash_03 = this.add.image(947, 476, 'trash_03')
        this.trash_05 = this.add.image(1431, 736, 'trash_05')
        this.tablet_right = this.add.image(1850, 260, 'tablet_tight')
        this.tablet_right.visible = false

        // Создаём звуки диалогов
        this.voice_01 = this.sound.add('voice_01', { volume: 0.35, loop: false });
        this.voice_02 = this.sound.add('voice_02', { volume: 0.35, loop: false });
        this.voice_03 = this.sound.add('voice_03', { volume: 0.35, loop: false });

        // Персонаж
        this.player = new Player(this, 80, 340);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 80, 340, true);
        }

        this.trash_04 = this.add.image(1172, 592, 'trash_04')
        this.dolphin = new Dolphin(this, 1200, 925, false, true, 'dolphin');
        this.dolphin_invert = new Dolphin(this, 1200, 925, true, true, 'dolphin_invert');
        this.tool_tip1 = new Tooltip(this, 1200, 925, 'dialog_01', this.dolphin, this.voice_01);
        this.tool_tip2 = new Tooltip(this, 1200, 925, 'dialog_02', this.dolphin, this.voice_02);
        this.tool_tip3 = new Tooltip(this, 1200, 925, 'dialog_03', this.dolphin_invert, this.voice_03, true);

        this.currentStage = 1;  // Изначально текущий этап - первый
        // Маркер остановки сцены (для анимаций)
        this.sceneStoped = false;
        // // Отвечает за цикл анимаций
        this.skipTooltip1 = false;
        this.skipTooltip2 = false;

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

        // Нижняя граница полигона
        const downWallVer = [
            { x: 0, y: 1080 },
            { x: 0, y: 483},
            { x: 220, y: 593 },
            { x: 551, y: 677 },
            { x: 924, y: 724 },
            { x: 1222, y: 592 },
            { x: 1490, y: 809 },
            { x: 1759, y: 932 },
            { x: 1920, y: 939 },
            { x: 1920, y: 1080 },
            { x: 0, y: 1080 },
        ];
        this.matter.add.fromVertices(
            870, 830,
            downWallVer,
            { isStatic: true }
        );

        // Верхняя граница полигона
        const upWallVer = [
            { x: 0, y: 0},
            { x: 0, y: 147},
            { x: 251, y: 200},
            { x: 540, y: 215},
            { x: 868, y: 169},
            { x: 1141, y: 151 },
            { x: 1475, y: 236 },
            { x: 1920, y: 185 },
            { x: 1920, y: 0 },
        ];
        this.matter.add.fromVertices(
            972, 140,
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

        if (!this.tool_tip1.showed) {
            if (!this.tool_tip1.visible){
                this.tool_tip1.show();
            }
            return;
        }
        if (!this.tool_tip2.showed)
        {
            if (!this.tool_tip2.visible){
                this.tool_tip2.show()
            }
            return;
        }

        this.arrow = new Arrow(this, 520, 280, "arrow_right")

        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip1 = false;

    }

    start_tool_tips_cycle_02 () {
        if (!this.tool_tip3.showed){
            if (!this.tool_tip3.visible){
                this.tool_tip3.show()
            }
            return;
        }
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

        // const pointer = this.input.activePointer;
        // console.log(pointer);
        //
        // console.log(this.sys.game.device.os);
        //
        // if (pointer.isDown) {
        //     const bounds = this.a.getBounds();
        //
        //     if (Phaser.Geom.Rectangle.Contains(bounds, pointer.x, pointer.y)) {
        //         this.player.moveRight();
        //     }
        // }

        // Перемещение теперь в функции move() в классе Player:
        this.player.move();

        // // Обработка нажатий клавиш управления
        // if (this.cursors.left.isDown || this.keyA.isDown)
        //     this.player.moveLeft();
        //
        // else if (this.cursors.right.isDown || this.keyD.isDown)
        //     this.player.moveRight();
        //
        // else if (this.cursors.up.isDown || this.keyW.isDown)
        //     this.player.moveUp();
        //
        // else if (this.cursors.down.isDown || this.keyS.isDown)
        //     this.player.moveDown();
        //
        // else
        //     this.player.stopMove();

        // Логика этапов игры
        //Первый этап (подойти правее)
        if (this.currentStage === 1) {
            // Достигнута точка, где лежит буёк
            if (posX >= 100){
                // Останавливаем сцену
                this.sceneStoped = true;
                this.player.stopMove();

                this.skipTooltip1 = true;

                // Меняем этап на второй

                this.currentStage = 2;
            }
        }

        //яблоко
        if (this.currentStage === 2){
            if (posX >= 436 && posY <= 450 && posX <= 500) {
                // console.log(posX, posY);

                this.trash_01.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 1491, 150, "arrow_right")

                this.currentStage = 3;

            }
        }

        //бак зеленый
        if (this.currentStage === 3) {
            if (posX >= 1382 && posY <= 400 && posX <= 1600) {
                // console.log(posX, posY)

                this.trash_can_green_01.visible = true;
                this.trash_can_green.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 513, 475, "arrow_left")

                this.currentStage = 4;
            }
        }

        //градусник
        if (this.currentStage === 4) {
            if (posX >= 486 && posY >= 500 && posX <= 630) {
                // console.log(posX, posY)

                this.trash_02.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 1280, 100, "arrow_right")

                this.currentStage = 5;
            }
        }

        // бак красный
        if (this.currentStage === 5) {
            if (posX >= 1150 && posY <= 375 && posX <= 1300) {
                // console.log(posX, posY)

                this.trash_can_red_01.visible = true;
                this.trash_can_red.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 935, 380, "arrow_left")

                this.currentStage = 6;
            }
        }

        // батарейки
        if (this.currentStage === 6) {
            if (posX >= 881 && posY <= 480 && posX <= 1025 && posY >= 422) {
                // console.log(posX, posY)

                this.trash_03.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 1280, 100, "arrow_right")

                this.currentStage = 7;
            }
        }

        // бак красный
        if (this.currentStage === 7) {
            if (posX >= 1150 && posY <= 375 && posX <= 1300) {
                // console.log(posX, posY)

                this.trash_can_red_02.visible = true;
                this.trash_can_red_01.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 1140, 430, "arrow_left")

                this.currentStage = 8;
            }
        }

        // коробка
        if (this.currentStage === 8) {
            if (posX >=1058 && posY >= 450 && posX <=1287) {
                //console.log(posX, posY)

                this.trash_04.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 1491, 150, "arrow_right")

                this.currentStage = 9;
            }
        }

        // бак зеленый
        if (this.currentStage === 9) {
            if (posX >= 1382 && posY <= 400 && posX <= 1600) {
                //console.log(posX, posY)

                this.trash_can_green_02.visible = true;
                this.trash_can_green_01.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 1485, 580, "arrow_right")

                this.currentStage = 10;
            }
        }

        // пакет
        if (this.currentStage === 10) {
            if (posX >=1426 && posY >= 650 && posX <=1556) {
                //console.log(posX, posY)

                this.trash_05.visible = false;

                this.arrow.destroy();
                this.arrow = new Arrow(this, 1491, 150, "arrow_right")

                this.currentStage = 11;
            }
        }

        // бак зеленый
        if (this.currentStage === 11) {
            if (posX >= 1382 && posY <= 400 && posX <= 1600) {
                //console.log(posX, posY)

                this.trash_can_green_03.visible = true;
                this.trash_can_green_02.visible = false;

                this.arrow.destroy();

                this.currentStage = 12;
            }
        }

        if (this.currentStage === 12) {
            this.sceneStoped = true;
            this.player.stopMove();

            this.skipTooltip2 = true;

            this.tablet_right.visible = true

            this.currentStage = 13;
        }

        if (this.currentStage === 13){

            if (posX + 60 >= 1890)
            {
                this.perehod.visible = true;
                this.perehod.play('anim_perehod');
                this.currentStage = 0;

                this.perehod.once('animationcomplete', () => {
                    this.scene.stop();
                    this.background_music.stop();
                    this.sound.removeAll();
                    this.scene.launch('Level_6');
                });
            }
        }

    }
}
