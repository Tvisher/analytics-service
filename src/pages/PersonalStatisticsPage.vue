<template>
  <AppInDevPoster v-if="pageInDev" />
  <div v-else>
    <div class="filter-list">
      <AppFilter @addFilterItem="addFilterItem" />
      <div
        class="filter-list__item"
        v-for="(filterItem, index) in filterItemsList"
        :key="filterItem.id"
      >
        <span>Фильтр {{ index + 1 }}</span>
        <button
          class="remove-filter-item"
          @click="removeFilterItem(filterItem.id)"
        ></button>
      </div>
    </div>
    <pre style="opacity: 0.3">
      {{ actualPassingIdsList }}
    </pre>
    <AppPersonalStatisticTable />
    <!-- <router-link
      class=""
      :to="{ name: 'personalStatisticItem', params: { id: 3 } }"
      exact="true"
    >
      Персональная статистика по вопросу с ID 3
    </router-link> -->
  </div>
</template>

<script setup>
import AppFilter from "@/components/Filter.vue";
import AppInDevPoster from "@/components/InDevPoster.vue";
import AppPersonalStatisticTable from "@/components/PersonalStatisticTable.vue";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { ref } from "vue";
import { usePersonalStatistic } from "@/stores/PersonalStatistic";

const usePersonalStatisticStore = usePersonalStatistic();
const pageInDev = false;
const filterItemsList = ref([]);
const actualPassingIdsList = ref([]);

const addFilterItem = (filterItem) => {
  const isHasCurentFilter = filterItemsList.value.find((item) => {
    return JSON.stringify(item.params) === JSON.stringify(filterItem);
  });
  if (!isHasCurentFilter) {
    filterItemsList.value.push({
      id: uuidv4(),
      params: filterItem,
    });
    setFiltersOnServer();
    generateTableData();
  }
};

const removeFilterItem = (itemId) => {
  filterItemsList.value = filterItemsList.value.filter(
    (item) => item.id !== itemId
  );
  setFiltersOnServer();
  generateTableData();
};

const setFiltersOnServer = () => {
  const payloadData = {
    id: usePersonalStatisticStore.pollId,
    filtersList: [...filterItemsList.value],
  };
  console.log(payloadData);
  axios
    .post("/someUrl.php", payloadData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const { LIST_RESULTS, TABLE_ORIGIN, RESPONDENT_NAME, TIME } =
  usePersonalStatisticStore.personalStatisticData;
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

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }
  return true;
}
function findCommonIds(arrays) {
  return arrays.reduce((commonIds, currentArray) =>
    commonIds.filter((id) => currentArray.includes(id))
  );
}

const firstTypeOfFilter = [
  "single-choice",
  "multiple-choice",
  "drop-down-list",
  "multiple-drop-down-list",
];

function generateTableData() {
  // Если фильтров нет, отдаём id всех прохождений
  if (!filterItemsList.value.length) {
    actualPassingIdsList.value = resultsIdies;
    return;
  }
  // Проходим циклом по всем фильтрах и ищем совпадения в каждом результате прохождения от пользователя
  const actualPassingIds = filterItemsList.value.map((filterItem) => {
    const { questionId, questionType, secondLevelFilterSelectedValue } =
      filterItem.params;
    const curretnResults = resultsData.filter((resultElement) => {
      const currentUserResult = resultElement.questionsData.find((item) => {
        if (item.UF_ID_QUESTION === questionId) {
          // Если тип вопроса одиночный/множественный выбор, или одиночный/множественный выпадающий список
          if (firstTypeOfFilter.includes(questionType)) {
            const userAnswersList = item.ANSWERS.map(
              (item) => item.UF_ID_USER_ANSWER
            );

            let filterItemAnswerIdList;
            if (Array.isArray(secondLevelFilterSelectedValue)) {
              filterItemAnswerIdList = secondLevelFilterSelectedValue.map(
                (item) => item.id
              );
            } else {
              filterItemAnswerIdList = [secondLevelFilterSelectedValue.id];
            }
            return arraysEqual(userAnswersList, filterItemAnswerIdList);
          }
          // Если тип вопроса - ранжирование
          if (questionType === "ranging") {
            const rangingModel =
              filterItem.params.secondLevelFilterSelectedValue;
            let counter = 0;
            for (let i = 0; i < rangingModel.length; i++) {
              const element = rangingModel[i];
              element.id == item.ANSWERS[element.index].UF_ID_USER_ANSWER
                ? counter++
                : counter--;
            }
            return rangingModel.length === counter;
          }
          // Если тип вопроса - выбор диапазона
          if (questionType === "range-selection") {
            const { from, to } =
              filterItem.params.secondLevelFilterSelectedValue;
            const userResultParamsFrom = item.ANSWERS[0].UF_RANGE_VALUE;
            const userResultParamsTo = item.ANSWERS[1].UF_RANGE_VALUE;
            if (
              (from < to &&
                userResultParamsFrom >= from &&
                userResultParamsTo <= to) ||
              (from > to &&
                userResultParamsFrom <= from &&
                userResultParamsTo >= to)
            ) {
              return item;
            }
          }
          // Если тип вопроса - выбор даты
          if (questionType === "date") {
            // Если это диапазон дат
            if (filterItem.params.secondLevelFilterSelectedValue.length) {
              const filterDateFrom = new Date(
                filterItem.params.secondLevelFilterSelectedValue[0]
              ).setHours(0, 0, 0, 0);
              const filterDateTo = new Date(
                filterItem.params.secondLevelFilterSelectedValue[1]
              ).setHours(0, 0, 0, 0);

              const userDateAnswer =
                item.ANSWERS[0].UF_ID_USER_ANSWER.split("-");
              const userDateFrom = new Date(userDateAnswer[0]).setHours(
                0,
                0,
                0,
                0
              );
              const userDateTo = new Date(userDateAnswer[1]).setHours(
                0,
                0,
                0,
                0
              );

              // console.log(filterDateFrom, filterDateTo);
              // console.log(userDateFrom, userDateTo);
              return (
                filterDateFrom <= userDateFrom && filterDateTo >= userDateTo
              );
            } else {
              // Если это одиночная дата
              const filterDate = new Date(
                filterItem.params.secondLevelFilterSelectedValue
              ).setHours(0, 0, 0, 0);
              const userAnswerDate = new Date(
                item.ANSWERS[0].UF_ID_USER_ANSWER
              ).setHours(0, 0, 0, 0);
              return filterDate === userAnswerDate;
            }
          }
        }
      });
      return currentUserResult;
    });
    return curretnResults.map((el) => el.resultId);
  });
  actualPassingIdsList.value = findCommonIds(actualPassingIds);
}
</script>

<style lang="scss">
.filter-list {
  margin: 20px 0;
  flex-wrap: wrap;
  display: flex;
  gap: 22px;
}
.filter-list__item {
  padding: 10px 24px;
  padding-right: 6px;
  border-radius: 64px;
  background: #ffe7ef;
  width: fit-content;
  display: flex;
  align-items: center;
  span {
    display: block;
  }
  color: #262b31;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
}

.remove-filter-item {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='28' height='29' viewBox='0 0 28 29' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M17.7861 10.9287L9.92876 18.786M9.92876 10.9287L17.7861 18.786' stroke='%23262B31' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 16px;
}
</style>
