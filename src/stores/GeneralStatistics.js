import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import analiticTestJson from '@/assets/analitic.json';

const pollId = document.querySelector('#app').dataset.id;
export const useGeneralStatistics = defineStore("GeneralStatistics", () => {
    // state refs

    const chartColors = [
        "#FA0056",
        "#A72179",
        "#8DBA21",
        "#FF886D",
        "#FF3319",
        "#B85E00",
        "#27C8B4",
        "#FF8C00",
        "#4F8FE6",
        "#9C52F2"];
    let pollStatus = ref(true);
    let pollName = ref('Название анкеты');
    let questionsCount = ref('0');
    let pagesCount = ref('0');
    let respondentsCount = ref('0');
    let unfinishCount = ref('0');
    let pollType = ref('опрос');
    let pollCreateDate = ref("01.01.2023");
    let pagesGeneralData = ref([]);
    let pagesCustomFieldsData = ref(null)
    let appHasPagesGeneralData = ref(false);
    let currentPageIndex = ref(0);
    let middleTime = ref({
        "MIN": 0,
        "SEC": 0
    });
    let dateFilterData = ref({
        from: new Date(),
        to: new Date()
    });

    // getters
    const currentPagePollItemsData = computed(() => pagesGeneralData.value[currentPageIndex.value]);
    const currenCustomFieldsData = (id) => computed(() => pagesCustomFieldsData.value[id]);


    // Actions
    const changeDateFilter = (newDateFilter) => dateFilterData.value = newDateFilter;
    const setCurrentPage = (index) => currentPageIndex.value = index;
    const setApplicationData = (response) => {
        const data = response.data;
        console.log(data);
        pollStatus.value = data.ACTIVE;
        pollName.value = data.NAME;
        pagesCount.value = data.PAGES;
        questionsCount.value = data.QUESTION_COUNT;
        respondentsCount.value = data.RESPONDENT;
        unfinishCount.value = data.UNFINISH;
        middleTime.value = data.MIDDLE_TIME;
        pollCreateDate.value = data.DATE_CREAT;
        pollType.value = data.TYPE;
        pagesGeneralData.value = data.RESULTS.QUESTION;
        pagesCustomFieldsData.value = data.RESULTS.FORMS;
        appHasPagesGeneralData.value = data.TYPE == 'опрос' ? data.RESULTS.QUESTION.length > 0 : data.RESULTS.QUESTION[0].length > 0
    };

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
                .then((response) => {
                    setApplicationData(response);
                    resolve();
                })
                .catch((error) => {
                    console.log("Ошибка!!!", error);
                    setApplicationData({ data: analiticTestJson });
                    reject();
                });
        })
    };

    return {
        pollStatus,
        appHasPagesGeneralData,
        currentPagePollItemsData,
        setCurrentPage,
        currentPageIndex,
        pagesCustomFieldsData,
        currenCustomFieldsData,
        pagesGeneralData,
        pollType,
        pollCreateDate,
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