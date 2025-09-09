<script setup>
import { api } from "@/api/api.js"

const downloadStats = async () => {
    try {
        const response = await api.downloadData();

        // Создаём blob-объект
        const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Делаем временный URL
        const url = window.URL.createObjectURL(blob);

        // Создаём ссылку <a> и триггерим клик
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.xlsx"); // имя сохраняемого файла
        document.body.appendChild(link);
        link.click();

        // Чистим
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Ошибка при скачивании файла:", error);
    }
}
</script>

<template>
    <div class="page">
        <button class="download-btn" @click="downloadStats">
            Скачать статистику
        </button>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* кнопка строго по центру страницы */
}

.download-btn {
    padding: 12px 24px;
    font-size: 18px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.download-btn:hover {
    background-color: #45a049;
}
</style>
