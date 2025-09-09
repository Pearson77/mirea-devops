<script setup>
import { ref } from "vue"
import { api } from "@/api/api.js";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
    first_name: "",
    school_number: "",
    class_number: "",
    gender: "М"
})

function selectGender(g) {
    form.value.gender = g
}

async function handleSubmit() {
    console.log("Игрок:", form.value)
    await api.sendData(form.value);
    await router.push("/");
}
</script>

<template>
    <div class="page">
        <div class="form-card">
            <form @submit.prevent="handleSubmit">
                <input type="text" v-model="form.first_name" placeholder="Имя" />
                <input type="text" v-model="form.school_number" placeholder="Школа" />
                <input type="text" v-model="form.class_number" placeholder="Класс" />

                <div class="gender-row">
                    <button
                        type="button"
                        :class="['gender-btn', { active: form.gender === 'М' }]"
                        @click="selectGender('М')"
                    >
                        Мальчик
                    </button>
                    <button
                        type="button"
                        :class="['gender-btn', { active: form.gender === 'Ж' }]"
                        @click="selectGender('Ж')"
                    >
                        Девочка
                    </button>
                </div>

                <div class="play-btn-wrapper">
                    <button type="submit" class="play-btn">Играть</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('/src/assets/site_background.png') no-repeat center center;
    background-size: cover;
    height: 100vh;
}

.form-card {
    background: #0d4d4f;
    padding: 2rem;
    border-radius: 20px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: aliceblue 4px solid;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input {
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 16px;
    background: #3dc4b2;
    font-size: 1rem;
    outline: none;
}

.gender-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.gender-btn {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 16px;
    background: #3dc4b2;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: 0.2s;
}

.gender-btn.active {
    background: #2aa699;
    color: white;
}

.play-btn-wrapper {
    display: flex;
    justify-content: stretch;
    width: 100%;
}

.play-btn {
    width: 100%;
    padding: 1.2rem 1.2rem;
    border: none;
    border-radius: 16px;
    background: #DAE2BD;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: 0.2s;
}

.play-btn:hover {
    background: #AA9C77;
    color: white;
}
</style>
