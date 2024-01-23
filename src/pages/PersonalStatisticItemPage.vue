<template>
  <div v-if="currentPageData">
    <div class="item-table">
      <div class="item-table__row">
        <div class="item-table__col">ID</div>
        <div class="item-table__col">{{ currentPageData.resultId }}</div>
      </div>

      <div class="item-table__row">
        <div class="item-table__col">Респондент</div>
        <div class="item-table__col">{{ currentPageData.userName }}</div>
      </div>

      <div class="item-table__row">
        <div class="item-table__col">Дата прохождения</div>
        <div class="item-table__col">{{ currentPageData.resultDate }}</div>
      </div>

      <div class="item-table__row">
        <div class="item-table__col">Затраченное время</div>
        <div class="item-table__col">{{ formattedTime }}</div>
      </div>
    </div>

    <div class="user-anwers-list">
      <AppCurrentSurveyInfo
        v-for="(question, index) in currentPageData.questionsData"
        :data="question"
        :indexNumber="index + 1"
      />
    </div>
  </div>
  <div v-else>404</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { usePersonalStatistic } from "@/stores/PersonalStatistic";
import AppCurrentSurveyInfo from "@/components/CurrentSurveyInfo.vue";

const usePersonalStatisticStore = usePersonalStatistic();
const route = useRoute();

const currentPageData = usePersonalStatisticStore.currentUserResult(
  route.params.id
);
let formattedTime;
if (currentPageData.value) {
  const padZero = (num) => (num < 10 ? `0${num}` : num);
  const hours = Math.floor(currentPageData.value.resultTime.MIN / 60);
  formattedTime = `${padZero(hours)}:${padZero(
    currentPageData.value.resultTime.MIN % 60
  )}:${padZero(currentPageData.value.resultTime.SEC)}`;
}
</script>

<style lang="scss">
.item-table__row {
  display: flex;
  align-items: center;
  border: 1px solid #c2cfe0;
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid #c2cfe0;
  }
  .item-table__col {
    text-align: center;
    color: #262b31;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    padding: 10px;
    width: 50%;
    &:first-child {
      border-right: 1px solid #c2cfe0;
      font-weight: 700;
      background: #ffe7ef;
    }
  }
}

.user-anwers-list {
  padding-top: 30px;
}
</style>
