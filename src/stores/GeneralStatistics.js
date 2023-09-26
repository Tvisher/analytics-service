import { defineStore } from 'pinia';

export const useGeneralStatistics = defineStore("GeneralStatistics", {
    state: () => ({
        questions: [
            1, 23, 414,
        ]
    })
}) 