<script setup>
import final_screen from "@/assets/final_rebus_screen.png";

function toggleAnswer (number, is_true = false) {
    let element = document.getElementById(`img-${number}`);
    let elementF = document.getElementById(`img-${number}-f`);
    let final_screen = document.getElementById("final-screen-img");

    if (is_true) final_screen.style.display = "flex";

    element.hidden = true;
    elementF.hidden = false;
}

import word_1 from "/src/assets/rebus_01/word_1.png"
import word_2 from "/src/assets/rebus_01/word_2.png"
import word_3 from "/src/assets/rebus_01/word_3.png"
import word_4 from "/src/assets/rebus_01/word_4.png"

import word_1_F from "/src/assets/rebus_01/word_1_F.png"
import word_2_F from "/src/assets/rebus_01/word_2_F.png"
import word_3_F from "/src/assets/rebus_01/word_3_F.png"
import word_4_F from "/src/assets/rebus_01/word_4_F.png"

import { onMounted } from "vue";

onMounted(() => {
    let container = document.getElementById('rebus-container');
    container.requestFullscreen();
})
</script>

<template>
    <div class="container">
        <div class="rebus-container" id="rebus-container">
            <img class="rebus-img" src="/src/assets/rebus_01/rebus_01.png" alt="Ребус">
            <div class="answers-container">
                <div class="d">
                    <img @click="toggleAnswer(1)" id="img-1" class="word-img" :src="word_1" alt="Ответ" />
                    <img hidden id="img-1-f" class="word-img" :src="word_1_F" alt="Ответ" />
                    <img @click="toggleAnswer(2, true)" id="img-2" class="word-img" :src="word_2" alt="Ответ" />
                    <img hidden id="img-2-f" class="word-img" :src="word_2_F" alt="Ответ" />
                    <img @click="toggleAnswer(3)" id="img-3" class="word-img" :src="word_3" alt="Ответ" />
                    <img hidden id="img-3-f" class="word-img" :src="word_3_F" alt="Ответ" />
                    <img @click="toggleAnswer(4)" id="img-4" class="word-img r" :src="word_4" alt="Ответ" />
                    <img hidden id="img-4-f" class="word-img r" :src="word_4_F" alt="Ответ" />
                </div>
            </div>
        </div>
        <img class="rebus-container" id="final-screen-img" :src="final_screen" alt="Победа" />
    </div>
</template>

<style scoped>
.container {
    height: 100vh;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rebus-container {
    border: aliceblue 4px solid;
    border-radius: 4px;
    position: relative;
    max-width: 100%;       /* ограничиваем по ширине экрана */
    max-height: 80vh;     /* ограничиваем по высоте экрана */
    overflow: hidden;      /* чтобы ничего не вылазило */
}

.rebus-container img.rebus-img {
    display: block;
    width: 100%;           /* растягиваем/сжимаем под контейнер */
    height: auto;          /* сохраняем пропорции */
}

.answers-container {
    justify-content: center;
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    max-width: 100%;
    top: 65%;
}

.d {
    justify-content: center;
    display: flex;
    align-items: center;
    position: relative;
    max-width: 90%;
}

.word-img {
    max-width: 22%;
}

.r {
    max-width: 33%;
}

#final-screen-img {
    display: none;
    position: absolute;
    width: 100%;
}
</style>
