import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import personalTestJson from '@/assets/personal.json';


export const usePersonalStatistic = defineStore("PersonalStatistics", () => {

    const personalStatisticData = ref(null);
    const pollId = document.querySelector('#app').dataset.id;

    // Actions
    const setPersonalStatisticData = (data) => personalStatisticData.value = data;

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
        personalStatisticData
    }
}) 