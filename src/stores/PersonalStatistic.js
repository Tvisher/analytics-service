import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import personalTestJson from '@/assets/personal.json';


export const usePersonalStatistic = defineStore("PersonalStatistics", () => {

    const personalStatisticData = ref(null);
    const pollId = document.querySelector('#app').dataset.id;
    // Getters
    const currentUserResult = (id) => computed(() => personalStatisticData.value.find(res => res.resultId === id));
    // Actions
    const setPersonalStatisticData = (data) => {
        console.log(data);
        const { LIST_RESULTS, TABLE_ORIGIN, RESPONDENT_NAME, TIME } = data;
        const resultsIdies = Object.keys(LIST_RESULTS);
        const resultsData = resultsIdies.reduce((acc, item) => {
            const userName = RESPONDENT_NAME[item] ? RESPONDENT_NAME[item] : "noname";
            const resultTime = TIME[item];
            const customFieldsData = TABLE_ORIGIN[item].TABLE_QUESTIONS;
            const questionsData = Object.values(LIST_RESULTS[item].QUESTIONS).map(
                (item) => {
                    if (item.UF_QUESTION_TYPE === "custom-fields") {
                        item.ANSWERS = customFieldsData[item.ID];
                    }
                    return item;
                }
            );

            acc.push({
                resultId: item,
                userName,
                resultTime,
                questionsData,
            });
            return acc;
        }, []);
        personalStatisticData.value = resultsData;
    };
    const getPersonalStatisticData = async (timeFilter) => {
        return new Promise((resolve, reject) => {
            let postData = {
                id: pollId,
            };
            if (timeFilter) {
                postData.from = timeFilter.from;
                postData.to = timeFilter.to;
            }
            axios.post('/ajax/personStatistic.php',
                postData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    setPersonalStatisticData(response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log("Ошибка!!!", error);
                    setPersonalStatisticData(personalTestJson);
                    reject();
                });
        })
    };

    return {
        pollId,
        getPersonalStatisticData,
        personalStatisticData,
        currentUserResult
    }
}) 