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

import word_1 from "/src/assets/rebus_04/word_1.png"
import word_2 from "/src/assets/rebus_04/word_2.png"
import word_3 from "/src/assets/rebus_04/word_3.png"
import word_4 from "/src/assets/rebus_04/word_4.png"

import word_1_F from "/src/assets/rebus_04/word_1_F.png"
import word_2_F from "/src/assets/rebus_04/word_2_F.png"
import word_3_F from "/src/assets/rebus_04/word_3_F.png"
import word_4_F from "/src/assets/rebus_04/word_4_F.png"
</script>

<template>
    <div class="container">
        <div class="rebus-container">
            <img class="rebus-img" src="/src/assets/rebus_04/rebus_04.png" alt="Ребус">
            <div class="answers-container">
                <img @click="toggleAnswer(1, true)" id="img-1" class="word-img" :src="word_1" alt="Ответ" />
                <img hidden id="img-1-f" class="word-img" :src="word_1_F" alt="Ответ" />
                <img @click="toggleAnswer(2)" id="img-2" class="word-img r" :src="word_2" alt="Ответ" />
                <img hidden id="img-2-f" class="word-img r" :src="word_2_F" alt="Ответ" />
                <img @click="toggleAnswer(3)" id="img-3" class="word-img r" :src="word_3" alt="Ответ" />
                <img hidden id="img-3-f" class="word-img r" :src="word_3_F" alt="Ответ" />
                <img @click="toggleAnswer(4)" id="img-4" class="word-img r" :src="word_4" alt="Ответ" />
                <img hidden id="img-4-f" class="word-img r" :src="word_4_F" alt="Ответ" />
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
}

.answers-container {
    position: absolute;
    justify-content: center;
    display: block;
    align-items: center;
    width: 35%;
    left: 70%;
    top: 10%;
}

.word-img {
    position: relative;
    margin-top: 26px;
}

.r {
    margin-left: 7%;
}

#final-screen-img {
    display: none;
    position: absolute;
}
</style>
