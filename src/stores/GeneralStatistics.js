import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';


const pollId = document.querySelector('#app').dataset.id;
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
    let pollName = ref('Название анкеты');
    let questionsCount = ref('33');
    let pagesCount = ref('0');
    let respondentsCount = ref('0');
    let unfinishCount = ref('0');
    let middleTime = ref({
        "MIN": 0,
        "SEC": 31
    });
    let dateFilterData = ref({
        from: new Date(),
        to: new Date()
    });


    const getAppData = async (timeFilter) => {
        return new Promise((resolve, reject) => {
            let postData = {
                id: pollId,
            };
            if (timeFilter) {
                postData.from = timeFilter.from;
                postData.to = timeFilter.to;
            }
            axios.post('/ajax/resultStatistic.php',
                postData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    const data = response.data;
                    console.log(data);
                    pollName.value = data.NAME;
                    pagesCount.value = data.PAGES;
                    questionsCount.value = data.QUESTION_COUNT;
                    respondentsCount.value = data.RESPONDENT;
                    unfinishCount.value = data.UNFINISH;
                    middleTime.value = data.MIDDLE_TIME;
                    resolve();
                })
                .catch(function (error) {
                    console.log("Ошибка!!!", error);
                    reject();
                });
        })
    };

    const changeDateFilter = (newDateFilter) => dateFilterData.value = newDateFilter;

    return {
        changeDateFilter,
        dateFilterData,
        pollName,
        questionsCount,
        respondentsCount,
        unfinishCount,
        pagesCount,
        middleTime,
        pollId,
        chartColors,
        getAppData
    }
}) 