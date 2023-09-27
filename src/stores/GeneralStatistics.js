import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGeneralStatistics = defineStore("GeneralStatistics", () => {
    const questions = ref([
        1,
        2,
        3,
    ]);

    const addItem = (item) => {
        questions.value.push(item)
    }

    return {
        questions,
        addItem
    }
}) 