import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import personalTestJson from '@/assets/personal.json';


export const usePersonalStatistic = defineStore("PersonalStatistics", () => {

    const personalStatisticData = ref(null);
    const appHasPersonalData = ref(null)
    const filtersList = ref([]);
    const pollId = document.querySelector('#app').dataset.id;
    // Getters
    const currentUserResult = (id) => computed(() => personalStatisticData.value.find(res => res.resultId === id));
    // Actions
    const updateFiltersList = (newList) => {
        filtersList.value = newList;
    }
    const setPersonalStatisticData = (data) => {
        const { LIST_RESULTS, TABLE_ORIGIN, RESPONDENT_NAME, TIME, PERSONAL_FILTER } = data;
        if (PERSONAL_FILTER && PERSONAL_FILTER.length) {
            const filterListFromServer = JSON.parse(PERSONAL_FILTER[0].UF_JSON_FILTER);
            filtersList.value = filterListFromServer ? filterListFromServer : [];
        } else {
            filtersList.value = [];
        }
        const resultsIdies = Object.keys(LIST_RESULTS);
        if (resultsIdies.length < 1) {
            personalStatisticData.value = [];
            appHasPersonalData.value = false;
            return
        }
        const resultsData = resultsIdies.reduce((acc, item) => {
            const userName = RESPONDENT_NAME[item] ? RESPONDENT_NAME[item] : "noname";
            const resultTime = TIME[item];
            const customFieldsData = TABLE_ORIGIN[item].TABLE_QUESTIONS;
            const resultDate = TABLE_ORIGIN[item].UF_DATE_FINISH;
            const userResQuestions = LIST_RESULTS[item].hasOwnProperty('QUESTIONS') ? LIST_RESULTS[item].QUESTIONS : LIST_RESULTS[item];
            const questionsData = Object.values(userResQuestions).map(
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
                resultDate,
                questionsData,
            });
            return acc;
        }, []);
        personalStatisticData.value = resultsData;
        appHasPersonalData.value = true;
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
        appHasPersonalData,
        filtersList,
        updateFiltersList,
        getPersonalStatisticData,
        personalStatisticData,
        currentUserResult
    }
}) 