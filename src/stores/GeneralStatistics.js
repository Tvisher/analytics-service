import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGeneralStatistics = defineStore("GeneralStatistics", () => {
    const chartColors = ref(["#FA0056", "#A72179", "#8DBA21", "orange", "purple"]);

    return {
        chartColors
    }
}) 