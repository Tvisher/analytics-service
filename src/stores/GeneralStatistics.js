import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGeneralStatistics = defineStore("GeneralStatistics", () => {
    const chartColors = [
        "#FA0056",
        "#A72179",
        "#8DBA21",
        "#FAED8F",
        "#FF3319",
        "#B85E00",
        "#FFE600",
        "#FF8C00",
        "#4F8FE6",
        "#9C52F2"];

    return {
        chartColors
    }
}) 