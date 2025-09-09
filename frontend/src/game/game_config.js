import Phaser from 'phaser';

import { scenes } from "@/game/scenes/index.js";

export const game_config = {
    width: 1920,
    height: 1080,
    name: 'Dolphin Game',
    url: '',
    version: '0.1.1',
    backgroundColor: '#797979',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    pixelArt: false,
    scene: scenes,
}
