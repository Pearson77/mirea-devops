<script setup>
import { ref } from "vue"

import Rebus01 from "@/pages/rebus_components/Rebus01.vue";
import Rebus02 from "@/pages/rebus_components/Rebus02.vue";
import Rebus03 from "@/pages/rebus_components/Rebus03.vue";
import Rebus04 from "@/pages/rebus_components/Rebus04.vue";
import Rebus05 from "@/pages/rebus_components/Rebus05.vue";
import Crossword01 from "@/pages/rebus_components/Crossword01.vue";
import Crossword02 from "@/pages/rebus_components/Crossword02.vue";

// массив всех компонентов
const rebuses = [Rebus01, Rebus02, Rebus03, Rebus04, Rebus05, Crossword01, Crossword02];

// выбираем случайный индекс при загрузке
const randomRebus = ref(rebuses[Math.floor(Math.random() * rebuses.length)]);
</script>

<template>
    <div class="main">
        <component :is="randomRebus" />
    </div>
</template>

<style>
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
</style>
