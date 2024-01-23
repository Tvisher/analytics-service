<template>
  <AppShowBySelect @selectCountToShow="selectCountToShow" />
  <div class="custom-table__wrapper">
    <table class="custom-table" v-if="hasResults">
      <tr class="custom-table__row head-row">
        <td
          class="custom-table__col"
          v-for="tableHeadName in tableHeadData"
          v-tippy="{
            content: tableHeadName,
            allowHTML: true,
          }"
        >
          <div class="inner-tr-text" v-html="tableHeadName"></div>
        </td>
      </tr>
      <tr
        @click="openResult(tableBodyRow.resultId)"
        :data-result-id="tableBodyRow.resultId"
        :key="tableBodyRow.resultId"
        class="custom-table__row"
        v-for="tableBodyRow in tableBodyData"
      >
        <td
          class="custom-table__col"
          v-for="tableBodyCol in tableBodyRow.fieldsData"
          v-html="tableBodyCol"
        ></td>
      </tr>
    </table>
    <div v-else class="no-res">
      Нет результатов соответствующих критериям фильтрации
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import AppShowBySelect from "@/components/ShowBySelect.vue";

import { storeToRefs } from "pinia";
import { usePersonalStatistic } from "@/stores/PersonalStatistic";
const personalStatisticStore = usePersonalStatistic();
const { filtersList } = storeToRefs(personalStatisticStore);
const props = defineProps({
  idsList: Array,
  dataForCreateTable: Array,
});
const router = useRouter();
const selectedRowCount = ref(10);

const hasResults = computed(() => {
  return props.idsList.length > 0;
});

// Данные для шапки таблицы
const tableHeadData = computed(() => {
  const tableHead = ["ID результата", "Дата прохождения", "Респондент"];
  if (filtersList.value.length) {
    filtersList.value.forEach((item, i) =>
      tableHead.push(
        `<span class="table-index">${i + 1}</span>${item.params.questionLabel}`
      )
    );
  }

  return tableHead;
});

// Данные для тела таблицы
const tableBodyData = computed(() => {
  return props.idsList
    .map((resultId) => {
      const currenRes = props.dataForCreateTable.find(
        (el) => el.resultId === resultId
      );
      if (currenRes) {
        const resultDate = currenRes.resultDate;
        const userName = currenRes.userName;
        const fieldsData = [resultId, resultDate, userName];
        if (filtersList.value.length) {
          filtersList.value.forEach((item) => {
            let dataFromSecondLevelFilter =
              item.params.secondLevelFilterSelectedValue;
            const questionType = item.params.questionType;
            const isFirstTypeOfQuestion = [
              "single-choice",
              "multiple-choice",
              "drop-down-list",
              "multiple-drop-down-list",
              "ranging",
            ].includes(questionType);
            const dateOptions = {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            };
            // Если есть второй уровень фильтра
            if (dataFromSecondLevelFilter) {
              if (isFirstTypeOfQuestion) {
                if (Array.isArray(dataFromSecondLevelFilter)) {
                  dataFromSecondLevelFilter = dataFromSecondLevelFilter
                    .map((el) => {
                      if (el.hasOwnProperty("index")) {
                        return `${el.index + 1} - ${el.label}`;
                      } else {
                        return el.label;
                      }
                    })
                    .join("<br>");
                } else {
                  dataFromSecondLevelFilter = dataFromSecondLevelFilter.label;
                }
              }
              if (questionType === "range-selection") {
                dataFromSecondLevelFilter = `Диапазон от ${dataFromSecondLevelFilter.from} до ${dataFromSecondLevelFilter.to}`;
              }

              if (questionType === "date") {
                if (dataFromSecondLevelFilter.length) {
                  const fromDate = new Date(
                    dataFromSecondLevelFilter[0]
                  ).toLocaleDateString("ru-RU", dateOptions);
                  const toDate = new Date(
                    dataFromSecondLevelFilter[1]
                  ).toLocaleDateString("ru-RU", dateOptions);
                  dataFromSecondLevelFilter = `Диапазон c ${fromDate} по ${toDate}`;
                } else {
                  dataFromSecondLevelFilter = new Date(
                    dataFromSecondLevelFilter
                  ).toLocaleDateString("ru-RU", dateOptions);
                }
              }

              if (questionType === "custom-fields") {
                if (
                  item.params.thirdLevelValue &&
                  !(
                    item.params.secondLevelFilterSelectedValue.type ===
                      "phone" && item.params.thirdLevelValue.length < 3
                  )
                ) {
                  dataFromSecondLevelFilter = `Поле ${dataFromSecondLevelFilter.label} c подстрокой: <strong>${item.params.thirdLevelValue}</strong>`;
                } else {
                  const currentUserResult = currenRes.questionsData
                    .find((el) => el.UF_ID_QUESTION === item.params.questionId)
                    .ANSWERS.find(
                      (answ) =>
                        answ.UF_ID_FIELD ===
                        item.params.secondLevelFilterSelectedValue.id
                    );
                  dataFromSecondLevelFilter = `${currentUserResult.UF_VALUE_FIELD} : <strong>${currentUserResult.UF_FILED_ANSWER}</strong>`;
                }
              }

              fieldsData.push(dataFromSecondLevelFilter);
            }
            // Если только первый уровень фильтра
            else {
              const firstLevelQuestionId = item.params.questionId;
              const currentUserResult = currenRes.questionsData.find(
                (el) => el.UF_ID_QUESTION === firstLevelQuestionId
              );
              let userAnswers;
              const ANSWERS = Array.isArray(currentUserResult.ANSWERS)
                ? currentUserResult.ANSWERS
                : Object.values(currentUserResult.ANSWERS);

              const VARIANTS =
                Array.isArray(currentUserResult.VARIANTS) ||
                currentUserResult.VARIANTS === null
                  ? currentUserResult.VARIANTS
                  : Object.values(currentUserResult.VARIANTS);

              if (isFirstTypeOfQuestion) {
                userAnswers = ANSWERS.map((el, index) => {
                  const res = VARIANTS.find(
                    (i) => el.UF_ID_USER_ANSWER === i.UF_ID_VARIANT
                  ).UF_VARIANT_VALUE;
                  return `<div class="col-item-span">
                          ${res}
                      </div>`;
                }).join("");
              }
              if (questionType === "range-selection") {
                userAnswers = `От <strong>${ANSWERS[0].UF_RANGE_VALUE}</strong> до <strong>${ANSWERS[1].UF_RANGE_VALUE}</strong>`;
              }

              if (questionType === "date") {
                const userSelectDate = ANSWERS[0].UF_ID_USER_ANSWER;
                if (Date.parse(userSelectDate)) {
                  userAnswers = new Date(userSelectDate).toLocaleDateString(
                    "ru-RU",
                    dateOptions
                  );
                } else {
                  const pairDate = userSelectDate.split("-");
                  const pairDateFrom = new Date(pairDate[0]).toLocaleDateString(
                    "ru-RU",
                    dateOptions
                  );
                  const pairDateTo = new Date(pairDate[1]).toLocaleDateString(
                    "ru-RU",
                    dateOptions
                  );
                  userAnswers = `Диапазон с <strong>${pairDateFrom}</strong> по <strong>${pairDateTo}</strong>`;
                }
              }

              if (questionType === "custom-fields") {
                const userAnswerStrings = ANSWERS.map(
                  (el) =>
                    `<div class="col-item-span">${el.UF_VALUE_FIELD} : <strong>${el.UF_FILED_ANSWER}</strong></div>`
                ).join("");
                userAnswers = userAnswerStrings;
              }
              fieldsData.push(userAnswers);
            }
          });
        }

        return {
          resultId,
          fieldsData: fieldsData,
        };
      }
    })
    .reverse();
});

const selectCountToShow = (count) => (selectedRowCount.value = count);

const openResult = (id) => {
  router.push({ name: "personalStatisticItem", params: { id } });
};
</script>

<style lang="scss">
.custom-table__wrapper {
  min-height: 500px;
  background-color: #fff;
  .custom-table__row {
    cursor: pointer;
  }
}

.table-index {
  flex-shrink: 0;
  padding: 5px;
  margin-right: 5px;
  width: 25px;
  height: 25px;
  font-size: 14px;
  font-weight: 300;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  background-color: #fa0056;
}

.no-res {
  font-size: 18px;
  text-align: center;
}
</style>
