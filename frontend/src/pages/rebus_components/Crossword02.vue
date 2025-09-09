<script setup>
import {onMounted, ref, watch} from "vue";

function toggleAnswer (word_number, number, is_true) {
    let element = document.getElementById(`img-${word_number}-${number}`);
    let elementF = document.getElementById(`img-${word_number}-${number}-f`);
    let word = document.getElementById(`word-${word_number}`);

    if (is_true) {
        word.style.display = 'flex';
        true_answers.value++;
    }

    element.hidden = true;
    elementF.hidden = false;
}

function toggleQuestion (q_number) {
    let qElementWhite = document.getElementById(`question-${q_number}`);
    let qElementDark = document.getElementById(`question-${q_number}-dark`);
    let allDarkElements = document.getElementsByClassName(`q-dark`);
    let allWhiteElements = document.getElementsByClassName(`q-white`);

    let answersContainers = document.getElementsByClassName(`ans`);
    let targetContainer = document.getElementById(`con-${q_number}`);

    Array.from(answersContainers).forEach((el) => {
        el.style.display = 'none';
    });
    targetContainer.style.display = 'flex';

    Array.from(allWhiteElements).forEach(el => {
        el.style.display = 'none';
    });
    Array.from(allDarkElements).forEach(el => {
        el.style.display = 'flex';
    });
    qElementDark.style.display = 'none';
    qElementWhite.style.display = 'flex';
}

const true_answers = ref(0);

watch(true_answers, () => {
    if (true_answers.value === 3) {
        const final_screen = document.getElementById("final-screen-img");
        final_screen.style.display = "flex";
    }
});

import word_in_crossword_1 from '/src/assets/crossword_02/word_01.png'
import word_in_crossword_2 from '/src/assets/crossword_02/word_02.png'
import word_in_crossword_3 from '/src/assets/crossword_02/word_03.png'

import question_1 from '/src/assets/crossword_02/question_01.png'
import question_2 from '/src/assets/crossword_02/question_02.png'
import question_3 from '/src/assets/crossword_02/question_03.png'
import question_1_dark from '/src/assets/crossword_02/question_01_dark.png'
import question_2_dark from '/src/assets/crossword_02/question_02_dark.png'
import question_3_dark from '/src/assets/crossword_02/question_03_dark.png'

import word_1_1 from "/src/assets/crossword_02/word_01/word_01_01.png"
import word_1_2 from "/src/assets/crossword_02/word_01/word_01_02.png"
import word_1_3 from "/src/assets/crossword_02/word_01/word_01_03.png"
import word_1_4 from "/src/assets/crossword_02/word_01/word_01_04.png"

import word_2_1 from "/src/assets/crossword_02/word_02/word_02_01.png"
import word_2_2 from "/src/assets/crossword_02/word_02/word_02_02.png"
import word_2_3 from "/src/assets/crossword_02/word_02/word_02_03.png"
import word_2_4 from "/src/assets/crossword_02/word_02/word_02_04.png"

import word_3_1 from "/src/assets/crossword_02/word_03/word_03_01.png"
import word_3_2 from "/src/assets/crossword_02/word_03/word_03_02.png"
import word_3_3 from "/src/assets/crossword_02/word_03/word_03_03.png"
import word_3_4 from "/src/assets/crossword_02/word_03/word_03_04.png"

import word_1_1_F from "/src/assets/crossword_02/word_01/word_01_01_F.png"
import word_1_2_F from "/src/assets/crossword_02/word_01/word_01_02_F.png"
import word_1_3_F from "/src/assets/crossword_02/word_01/word_01_03_F.png"
import word_1_4_F from "/src/assets/crossword_02/word_01/word_01_04_F.png"

import word_2_1_F from "/src/assets/crossword_02/word_02/word_02_01_F.png"
import word_2_2_F from "/src/assets/crossword_02/word_02/word_02_02_F.png"
import word_2_3_F from "/src/assets/crossword_02/word_02/word_02_03_F.png"
import word_2_4_F from "/src/assets/crossword_02/word_02/word_02_04_F.png"

import word_3_1_F from "/src/assets/crossword_02/word_03/word_03_01_F.png"
import word_3_2_F from "/src/assets/crossword_02/word_03/word_03_02_F.png"
import word_3_3_F from "/src/assets/crossword_02/word_03/word_03_03_F.png"
import word_3_4_F from "/src/assets/crossword_02/word_03/word_03_04_F.png"
import final_screen from "@/assets/final_rebus_screen.png";
</script>

<template>
    <div class="container">
        <div class="crossword-container">
            <img class="crossword-img" src="/src/assets/crossword_02/crossword_02.png" alt="Ребус">
            <img class="word-in-crossword" id="word-1" :src="word_in_crossword_1" alt="Слово" />
            <img class="word-in-crossword" id="word-2" :src="word_in_crossword_2" alt="Слово" />
            <img class="word-in-crossword" id="word-3" :src="word_in_crossword_3" alt="Слово" />
            <div class="questions-container">
                <img class="q-white" id="question-1" :src="question_1" alt="Вопрос" />
                <img @click="toggleQuestion(1)" class="q-dark" id="question-1-dark" :src="question_1_dark" alt="Вопрос" />
                <img class="q-white" id="question-2" :src="question_2" alt="Вопрос" />
                <img @click="toggleQuestion(2)" class="q-dark" id="question-2-dark" :src="question_2_dark" alt="Вопрос" />
                <img class="q-white" id="question-3" :src="question_3" alt="Вопрос" />
                <img @click="toggleQuestion(3)" class="q-dark" id="question-3-dark" :src="question_3_dark" alt="Вопрос" />
            </div>
            <div class="answers-container">
                <div class="ans" id="con-1">
                    <img @click="toggleAnswer(1, 1)" id="img-1-1" class="word-img" :src="word_1_1" alt="Ответ" />
                    <img hidden id="img-1-1-f" class="word-img" :src="word_1_1_F" alt="Ответ" />
                    <img @click="toggleAnswer(1, 2)" id="img-1-2" class="word-img" :src="word_1_2" alt="Ответ" />
                    <img hidden id="img-1-2-f" class="word-img" :src="word_1_2_F" alt="Ответ" />
                    <img @click="toggleAnswer(1, 3)" id="img-1-3" class="word-img" :src="word_1_3" alt="Ответ" />
                    <img hidden id="img-1-3-f" class="word-img" :src="word_1_3_F" alt="Ответ" />
                    <img @click="toggleAnswer(1, 4, true)" id="img-1-4" class="word-img" :src="word_1_4" alt="Ответ" />
                    <img hidden id="img-1-4-f" class="word-img" :src="word_1_4_F" alt="Ответ" />
                </div>
                <div class="ans" id="con-2">
                    <img @click="toggleAnswer(2, 1)" id="img-2-1" class="word-img" :src="word_2_1" alt="Ответ" />
                    <img hidden id="img-2-1-f" class="word-img" :src="word_2_1_F" alt="Ответ" />
                    <img @click="toggleAnswer(2, 2, true)" id="img-2-2" class="word-img" :src="word_2_2" alt="Ответ" />
                    <img hidden id="img-2-2-f" class="word-img" :src="word_2_2_F" alt="Ответ" />
                    <img @click="toggleAnswer(2, 3)" id="img-2-3" class="word-img" :src="word_2_3" alt="Ответ" />
                    <img hidden id="img-2-3-f" class="word-img" :src="word_2_3_F" alt="Ответ" />
                    <img @click="toggleAnswer(2, 4)" id="img-2-4" class="word-img" :src="word_2_4" alt="Ответ" />
                    <img hidden id="img-2-4-f" class="word-img" :src="word_2_4_F" alt="Ответ" />
                </div>
                <div class="ans" id="con-3">
                    <img @click="toggleAnswer(3, 1)" id="img-3-1" class="word-img" :src="word_3_1" alt="Ответ" />
                    <img hidden id="img-3-1-f" class="word-img" :src="word_3_1_F" alt="Ответ" />
                    <img @click="toggleAnswer(3, 2)" id="img-3-2" class="word-img" :src="word_3_2" alt="Ответ" />
                    <img hidden id="img-3-2-f" class="word-img" :src="word_3_2_F" alt="Ответ" />
                    <img @click="toggleAnswer(3, 3, true)" id="img-3-3" class="word-img" :src="word_3_3" alt="Ответ" />
                    <img hidden id="img-3-3-f" class="word-img" :src="word_3_3_F" alt="Ответ" />
                    <img @click="toggleAnswer(3, 4)" id="img-3-4" class="word-img" :src="word_3_4" alt="Ответ" />
                    <img hidden id="img-3-4-f" class="word-img" :src="word_3_4_F" alt="Ответ" />
                </div>
            </div>
        </div>
        <img class="crossword-container" id="final-screen-img" :src="final_screen" alt="Победа" />
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

.crossword-container {
    border: aliceblue 4px solid;
    border-radius: 4px;
    position: relative;
}

.answers-container {
    position: absolute;
    top: 75%;
    width: 100%;
}

.questions-container {
    position: absolute;
    top: 22%;
    width: 65%;
    left: 45%
}

.q-white {
    display: none;
}

.ans {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.word-img {
    position: relative;
    margin: 12px 0;
}

.word-in-crossword {
    position: absolute;
    display: none;
}

#final-screen-img {
    display: none;
    position: absolute;
}

#con-1 {
    display: none;
    min-height: 128px;
}

#con-2 {
    display: none;
    min-height: 128px;
}

#con-3 {
    display: none;
    min-height: 128px;
}

#word-1 {
    top: 36%;
    left: 8.5%
}

#word-2 {
    top: 27%;
    left: 13.5%
}

#word-3 {
    top: 18.2%;
    left: 29.5%
}
</style>
