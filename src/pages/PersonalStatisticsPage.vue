<template>
  <template v-if="appHasPersonalData">
    <AppInDevPoster v-if="pageInDev" />
    <div v-else>
      <div class="filter-list">
        <AppFilter @addFilterItem="addFilterItem" />
        <div
          class="filter-list__item"
          v-for="(filterItem, index) in filtersList"
          :key="filterItem.id"
        >
          <div>
            Фильтр <span class="table-index">{{ index + 1 }}</span>
          </div>
          <button
            class="remove-filter-item"
            @click="removeFilterItem(filterItem.id)"
          ></button>
        </div>
      </div>
      <AppPersonalStatisticTable
        :idsList="actualPassingIdsList"
        :dataForCreateTable="personalStatisticData"
      />
    </div>
  </template>
  <h2 class="zero-data-title" v-else>За указанный период нет данных</h2>
</template>

<script setup>
import AppFilter from "@/components/Filter.vue";
import AppInDevPoster from "@/components/InDevPoster.vue";
import AppPersonalStatisticTable from "@/components/PersonalStatisticTable.vue";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { storeToRefs } from "pinia";
import { ref, watch, onMounted } from "vue";
import { usePersonalStatistic } from "@/stores/PersonalStatistic";

const personalStatisticStore = usePersonalStatistic();
const { personalStatisticData, appHasPersonalData, filtersList } = storeToRefs(
  personalStatisticStore
);

const pageInDev = false;

const actualPassingIdsList = ref([]);

const addFilterItem = (filterItem) => {
  const isHasCurentFilter = filtersList.value.find((item) => {
    return JSON.stringify(item.params) === JSON.stringify(filterItem);
  });
  if (!isHasCurentFilter) {
    const updatedFilterList = [
      ...filtersList.value,
      {
        id: uuidv4(),
        params: filterItem,
      },
    ];
    personalStatisticStore.updateFiltersList(updatedFilterList);
    setFiltersOnServer();
    generateTableData();
  }
};

const removeFilterItem = (itemId) => {
  const updatedFilterList = filtersList.value.filter(
    (item) => item.id !== itemId
  );
  personalStatisticStore.updateFiltersList(updatedFilterList);
  setFiltersOnServer();
  generateTableData();
};

const setFiltersOnServer = () => {
  const payloadData = {
    id: personalStatisticStore.pollId,
    filtersList: [...filtersList.value],
  };
  axios
    .post("/ajax/filterPersonalSave.php", payloadData, {
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
  if (!filtersList.value.length) {
    actualPassingIdsList.value = personalStatisticData.value.map(
      (i) => i.resultId
    );
    return;
  }

  // Проходим циклом по всем фильтрах и ищем совпадения в каждом результате прохождения от пользователя
  const actualPassingIds = filtersList.value.map((filterItem) => {
    const { questionId, questionType, secondLevelFilterSelectedValue } =
      filterItem.params;
    const curretnResults = personalStatisticData.value.filter(
      (resultElement) => {
        const currentUserResult = resultElement.questionsData.find((item) => {
          const ANSWERS = Array.isArray(item.ANSWERS)
            ? item.ANSWERS
            : Object.values(item.ANSWERS);

          if (item.UF_ID_QUESTION === questionId) {
            if (!secondLevelFilterSelectedValue) {
              return item;
            }
            // Если тип вопроса одиночный/множественный выбор, или одиночный/множественный выпадающий список
            if (firstTypeOfFilter.includes(questionType)) {
              const userAnswersList = ANSWERS.map(
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
                element.id == ANSWERS[element.index].UF_ID_USER_ANSWER
                  ? counter++
                  : counter--;
              }
              return rangingModel.length === counter;
            }
            // Если тип вопроса - выбор диапазона
            if (questionType === "range-selection") {
              const { from, to } =
                filterItem.params.secondLevelFilterSelectedValue;
              const userResultParamsFrom = ANSWERS[0].UF_RANGE_VALUE;
              const userResultParamsTo = ANSWERS[1].UF_RANGE_VALUE;
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

                const userDateAnswer = ANSWERS[0].UF_ID_USER_ANSWER.split("-");
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

                return (
                  filterDateFrom <= userDateFrom && filterDateTo >= userDateTo
                );
              } else {
                // Если это одиночная дата
                const filterDate = new Date(
                  filterItem.params.secondLevelFilterSelectedValue
                ).setHours(0, 0, 0, 0);
                const userAnswerDate = new Date(
                  ANSWERS[0].UF_ID_USER_ANSWER
                ).setHours(0, 0, 0, 0);

                return filterDate === userAnswerDate;
              }
            }
            // Если тип вопроса - кастомные поля
            if (questionType === "custom-fields") {
              const filterItemFieldId =
                filterItem.params.secondLevelFilterSelectedValue.id;

              const currentField = ANSWERS.find(
                (el) => el.UF_ID_FIELD === filterItemFieldId
              );
              const currentFieldValue = currentField.UF_FILED_ANSWER;
              const filterValue = filterItem.params.thirdLevelValue;
              if (!filterValue) {
                return item;
              }

              if (secondLevelFilterSelectedValue.type == "phone") {
                return currentFieldValue
                  .replace(/[^+\d]/g, "")
                  .startsWith(filterValue);
              } else {
                return currentFieldValue
                  .toLowerCase()
                  .includes(filterValue.toLowerCase());
              }
            }
          }
        });
        return currentUserResult;
      }
    );
    return curretnResults.map((el) => el.resultId);
  });
  actualPassingIdsList.value = findCommonIds(actualPassingIds);
}

onMounted(() => {
  generateTableData();
});

watch(personalStatisticData, () => {
  generateTableData();
});
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
  .table-index {
    line-height: 100%;
    margin-right: 0;
    margin-left: 5px;
  }
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
  margin-left: 5px;
}
</style>
