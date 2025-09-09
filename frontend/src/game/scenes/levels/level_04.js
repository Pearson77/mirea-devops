import Phaser from "phaser";

import sceneImage from '/src/game/assets/level_04/scene_04.png'
import perehod from "/src/game/assets/basic/perehody/perehod_04-05.jpg"

import textHelp from '/src/game/assets/basic/text_help.png'

import text_1 from '/src/game/assets/level_04/text_1.png'
import text_2 from '/src/game/assets/level_04/text_2.png'

// Импорт стрелок управления (для телефонов)
import mobile_arrow_up from '/src/game/assets/basic/mobile_arrow_up.png'
import mobile_arrow_down from '/src/game/assets/basic/mobile_arrow_down.png'
import mobile_arrow_right from '/src/game/assets/basic/mobile_arrow_right.png'
import mobile_arrow_left from '/src/game/assets/basic/mobile_arrow_left.png'

// Импорт звуков
import voice_01 from "/src/game/assets/level_04/voice_01.wav";
import voice_02 from "/src/game/assets/level_04/voice_02.wav";
import background_music from "/src/game/assets/basic/background_music.mp3";

import veslo from '/src/game/assets/level_04/veslo.png'
import kust from '/src/game/assets/level_04/kust.png'
import lodka from '/src/game/assets/level_04/lodka.png'
import veslo_v_lodke from '/src/game/assets/level_04/veslo_v_lodke.png'
import lodka2 from '/src/game/assets/level_04/lodka2.png'
import lodka2_girl from '/src/game/assets/level_04/lodka2_girl.png'
import help from '/src/game/assets/level_04/help.png'

import playerImage from '/src/game/assets/basic/player.png'
import dedInside from '/src/game/assets/level_04/дедус.png'

import { Player } from "/src/game/entities/player.js";
import { DedHelp } from "/src/game/tooltip/DedHelp.js";
import playerImageGirl from "@/game/assets/basic/player_girl.png";

export class Level_04 extends Phaser.Scene
{
    constructor() {
        super('Level_4');  // По сути название сцены
    }

    preload ()
    {
        // this.textures.remove('text_1'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.load.image('dedInside', dedInside);
        this.textures.remove('perehod');
        this.anims.remove('anim_perehod');

        /*
        * Путь до картинок пишем в импорте сверху
        * чтобы адекватно работал `npm run build`
        */
        this.load.spritesheet('player', playerImage, {
            frameWidth: 166,
            frameHeight: 233
        });

        this.load.spritesheet('player_girl', playerImageGirl, {
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

        this.load.image('scene_4', sceneImage);

        this.load.image('text_1', text_1)
        this.load.image('text_2', text_2)
        this.load.image('veslo', veslo)
        this.load.image('kust', kust)
        this.load.image('lodka', lodka)
        this.load.image('veslo_v_lodke', veslo_v_lodke)
        this.load.image('lodka2', lodka2)
        this.load.image('lodka2_girl', lodka2_girl)
        this.load.image('help', help)

        this.load.image('textHelp', textHelp);

        this.load.audio('voice_01', voice_01);
        this.load.audio('voice_02', voice_02);
        this.load.audio('background_music', background_music);
    }

    create () {
        this.background = this.add.image(0, 0, 'scene_4');
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

        this.matter.world.setBounds(0, 0, 2050, 1150);

        this.dedInside = this.add.image(982, 349, 'dedInside');
        this.veslo = this.add.image(1700,500,'veslo');
        this.kust = this.add.image(1700,500,'kust');
        this.lodka = this.add.image(710,550,'lodka');
        this.veslo_v_lodke = this.add.image(720,540,'veslo_v_lodke');
        this.veslo_v_lodke.visible = false;
        this.lodka2 = this.add.image(710, 550, 'lodka2');
        this.lodka2.visible = false;
        if (localStorage.getItem('gender') === 'Ж') {
            this.lodka2 = this.add.image(710, 550, 'lodka2_girl');
        } else {
            this.lodka2 = this.add.image(710, 550, 'lodka2');
        }
        this.lodka2.visible = false;

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
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

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
        this.matter.add.gameObject(this.lodka2, options);

        this.help = this.add.image(960, 100, 'help');
        this.help.visible = false;

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

        this.tweens.add({
            targets: this.help,
            scale: { from: 0.95, to: 1.05 },  // Меняем масштаб от 0.95 до 1.05
            duration: 1000,                   // Длительность одного цикла (в мс)
            yoyo: true,                       // Возврат к начальному значению
            repeat: -1,                       // Бесконечное повторение
            ease: 'Sine.easeInOut'            // Плавное ускорение/замедление
        });

        // Отвечает за цикл анимаций
        this.skipTooltip1 = false;
        this.skipTooltip2 = false;

        // Персонаж
        this.player = new Player(this, 1854, 539);
        // Если игра запущена с телефона, создаем кнопки
        const { os, input } = this.game.device;
        if (os.android || os.iOS || os.iPad || os.windowsPhone || input.touch) {
            this.left_mobile_button = this.add.image(1300, 900, 'mobile_arrow_left').setInteractive();
            this.right_mobile_button = this.add.image(1700, 900, 'mobile_arrow_right').setInteractive();
            this.up_mobile_button = this.add.image(1500, 700, 'mobile_arrow_up').setInteractive();
            this.down_mobile_button = this.add.image(1500, 900, 'mobile_arrow_down').setInteractive();

            this.player.destroy();  // Подменяем челика, ставим ему управление по кнопкам
            this.player = new Player(this, 1854, 539, true);
        }

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
            { x: 0, y: 0 },
            { x: 1024, y: 0 },
            { x: 1034, y: 321 },
            { x: 1034, y: 504 },
            { x: 1172, y: 547 },
            { x: 1250, y: 652 },
            { x: 1365, y: 792 },
            { x: 1920, y: 772 },
            { x: 1920, y: 1080 },
            { x: 0, y: 1080 },
        ];

        this.matter.add.fromVertices(
            845, 740,
            downWallVer,
            { isStatic: true }
        );

        // Верхняя граница полигона
        const upWallVer = [
            { x: 1024, y: 200},
            { x: 1378, y: 257 },
            { x: 1554, y: 391 },
            { x: 1920, y: 416 },
            { x: 1920, y: 0 },
        ];

        this.matter.add.fromVertices(
            1634, 184,
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
        this.dedhelp1 = new DedHelp(this, 982, 349, 'text_1', this.voice_01);
        this.dedhelp2 = new DedHelp(this, 982, 349, 'text_2', this.voice_02);

        this.stageChanged = false;
    }

    startToolTipsCycle2 () {
        this.dedInside.visible = false;

        if (!this.dedhelp2.showed) {
            return;
        }

        this.player.visible = false;

        this.veslo_v_lodke.visible = false;
        this.lodka2.visible = true;
        this.lodka.visible = false;
        // Все подсказки показаны, переменную меняем на `true`

         this.lodka2.setVelocity(-5, 2.5);
    }


    startToolTipsCycle1 () {
    // Функция для последовательного отображения стартовых подсказок до начала уровня

        if (!this.dedhelp1.showed) {
            return;
        }

        this.help.visible = true;

        // Все подсказки показаны, переменную меняем на `true`
        this.skipTooltip1 = false;
    }

        // startPoka () {
        // // Функция для последовательного ПОКА ПРОСТО
        // this.lodka2.setVelocity(-200, 75);
        // }


    update (_, delta) {

        if (this.skipTooltip1) {
            this.startToolTipsCycle1();
        }

        if (this.skipTooltip2) {
            this.startToolTipsCycle2();
        }

        // Переменная с позицией игрока по X
        let posX = this.player.x;

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


        //     // Логика этапов игры

            // Проверки завершения текущего этапа

            // Первый этап (подойти правее)
            if (this.currentStage === 1)
            {
                if (posX <= 1130)  // Достигнута точка, где лежит буёк
                {
                    // Останавливаем сцену
                    this.sceneStoped = true;
                    this.player.stopMove();

                    this.dedhelp1.show();
                    this.skipTooltip1 = true;

                    // Меняем этап на второй
                    this.currentStage = 2;
                    this.stageChanged = true;


                }
            }

            // Второй этап
            else if (this.currentStage === 2)
            {

                if (posX >= 1500) {

                    this.player.stopMove();

                    this.veslo.visible = false;
                    this.veslo_v_lodke.visible = true;
                    this.help.visible = false;
                    // Меняем этап на третий
                    this.currentStage = 3;
                    this.stageChanged = true;
                }
            }

            else if (this.currentStage === 3)
            {

                if (posX <= 1130) {

                    this.sceneStoped = true;
                    this.player.stopMove();

                    this.dedhelp2.show();
                    this.skipTooltip2 = true;
                    // Меняем этап на третий
                    this.currentStage = 4;
                    this.stageChanged = true;


                }
            }

            else if (this.currentStage === 4) {

                if (this.lodka2.x <= 30)
                {
                    this.perehod.visible = true;
                    this.perehod.play('anim_perehod');
                    this.currentStage = 0;

                    this.perehod.once('animationcomplete', () => {
                        this.scene.stop();
                        this.background_music.stop();
                        this.sound.removeAll();
                        this.scene.launch('Level_5');
                    });
                }
            }

        }
    }
