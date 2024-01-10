import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';


export const usePersonalStatistic = defineStore("PersonalStatistics", () => {

    const personalStatisticData = ref(null);
    const pollId = document.querySelector('#app').dataset.id;

    // Actions
    const setPersonalStatisticData = (res) => personalStatisticData.value = res;

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
                    console.log(response);
                    setPersonalStatisticData(response);
                    resolve();
                })
                .catch((error) => {
                    console.log("Ошибка!!!", error);
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