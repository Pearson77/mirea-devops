<script setup>
import Phaser from 'phaser';
import { onMounted, ref } from 'vue';

import { game_config } from "@/game/game_config.js";

const gameParent = ref(null);
let game = null;

const toggleFullscreen = () => {
    if (game && game.scale.isFullscreen) {
        game.scale.stopFullscreen();
    } else if (game) {
        game.scale.startFullscreen();
    }
}

onMounted(() => {
    game = new Phaser.Game({
        ...game_config,
        parent: gameParent.value
    });

    document.addEventListener('fullscreenchange', () => {
        let canvas = document.getElementsByClassName('game-canvas')[0];
        if (document.fullscreenElement) {
            canvas.style.width = document.documentElement.clientWidth + 'px';
        } else {
            canvas.style.width = '80%';
        }
    });
});
</script>



<template>
    <div class="main">

        <div class="game-container">
            <div ref="gameParent" class="game-canvas"></div>
            <img
                src="/src/assets/site_fullscreen_button.png"
                alt="Полноэкранный режим"
                class="fullscreen-button"
                @click="toggleFullscreen"
            />
        </div>
    </div>
</template>



<style scoped>
body {
    height: 100%;
}

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url('/src/assets/site_background.png') no-repeat center center;
    background-size: cover;
    height: 100vh;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.game-canvas {
    aspect-ratio: 16/9;
    width: 80%;
    max-height: 100vh;
}

.fullscreen-button {
    margin-top: 16px;
    width: 395px;
    height: 48px;
    border: aliceblue 2px solid;
    border-radius: 25px;
}

@media (min-width: 1300px) {
    .game-container {
        max-width: 1600px;
        width: 80%;
    }
}

@media (max-width: 1299px) {
    .game-container {
        max-width: 100%;
        width: 100%;
    }
}
</style>
