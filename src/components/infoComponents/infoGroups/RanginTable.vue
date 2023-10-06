<template>
  <div class="rangin-table">
    <div class="answer-item" v-for="answer in answers" :key="answer.id">
      <div class="answer-item__title">{{ answer.name }}</div>
      <div class="answer-item__body">
        <div class="answer-item__row head-row">
          <div class="row-item">№</div>
          <div class="row-item"></div>
          <div class="row-item">Ответ</div>
          <div class="row-item">Кол-во</div>
          <div class="row-item">Проценты</div>
        </div>
        <!-- Строка с ответом -->
        <Vue3SlideUpDown
          v-model="togglesTableHiddenRows[answer.id].showFirstRow"
        >
          <div class="answer-item__row">
            <div class="row-item">1</div>
            <div class="row-item correct"></div>
            <div class="row-item">{{ answer.name }}</div>
            <div class="row-item">1</div>
            <div class="row-item">33%</div>
          </div>
        </Vue3SlideUpDown>
        <!-- Все ответы -->
        <Vue3SlideUpDown
          v-model="togglesTableHiddenRows[answer.id].showHiddenBlock"
        >
          <div class="answer-item__hidden-block">
            <div
              class="answer-item__row"
              v-for="(innerAnswer, index) in answers"
              :key="innerAnswer.id"
            >
              <div class="row-item">{{ index + 1 }}</div>
              <div
                class="row-item correct"
                :class="innerAnswer.id == answer.id ? 'correct' : 'uncorrect'"
              ></div>
              <div class="row-item">{{ innerAnswer.name }}</div>
              <div class="row-item">1</div>
              <div class="row-item">33%</div>
            </div>
          </div>
        </Vue3SlideUpDown>
        <div
          class="answer-item__show-more"
          :class="{ open: togglesTableHiddenRows[answer.id].showHiddenBlock }"
          @click="toggleRowsShow(answer.id)"
        >
          {{
            !togglesTableHiddenRows[answer.id].showHiddenBlock
              ? "Показать всё"
              : "Скрыть"
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Vue3SlideUpDown } from "vue3-slide-up-down";

const answers = [
  { name: "Понедельник", id: 1 },
  { name: "Вторник", id: 2 },
  { name: "Среда", id: 3 },
  { name: "Четверг", id: 4 },
  { name: "Пятница", id: 5 },
  { name: "Суббота", id: 6 },
  { name: "Воскресенье", id: 7 },
];

const answerToggles = answers.reduce((acc, item) => {
  acc[item.id] = {};
  acc[item.id].showHiddenBlock = false;
  acc[item.id].showFirstRow = true;
  return acc;
}, {});

const togglesTableHiddenRows = ref(answerToggles);

const toggleRowsShow = (id) => {
  togglesTableHiddenRows.value[id].showHiddenBlock =
    !togglesTableHiddenRows.value[id].showHiddenBlock;

  togglesTableHiddenRows.value[id].showFirstRow =
    !togglesTableHiddenRows.value[id].showFirstRow;
};
</script>

<style lang="scss">
.answer-item:not(:last-child) {
  margin-bottom: 20px;
}

.answer-item__show-more {
  &.open {
    &::after {
      transform: scale(1, -1);
    }
  }
  cursor: pointer;
  margin: 10px 0;
  color: #fa0056;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  display: flex;
  align-items: center;
  &::after {
    transition: transform 0.3s ease-in-out;
    margin-left: 12px;
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.06 0.5L8 1.45142L4 5.5L4.82789e-08 1.45142L0.94 0.5L4 3.59042L7.06 0.5Z' fill='%23FA0056'/%3e%3c/svg%3e ");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
}
.rangin-table {
  margin-bottom: 20px;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #c2cfe0;
  background: #fff;
}
.answer-item__title {
  margin-bottom: 10px;
  color: #262b31;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
}
.answer-item__row {
  &.head-row {
    .row-item {
      color: #262b31;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 130%; /* 15.6px */
    }
  }
  padding: 10px 0;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: stretch;
  width: 100%;
  .row-item {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    color: #262b31;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 18.2px */
    margin: 0px 10px;
    &:nth-child(1) {
      margin-left: 0;
      width: 18px;
      flex-shrink: 0;
    }
    &:nth-child(2) {
      width: 18px;
      flex-shrink: 0;
    }
    &:nth-child(3) {
      width: 100%;
    }
    &:nth-child(4) {
      flex-shrink: 0;
      width: 68px;
    }
    &:nth-child(5) {
      flex-shrink: 0;
      width: 68px;
      margin-right: 0;
    }
    &.correct {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='18' height='18' rx='9' fill='%2330C02D'/%3e%3cpath d='M5 9.72414L6.48101 11.2562C6.87409 11.6629 7.52591 11.6629 7.91899 11.2562L13 6' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
    }
    &.uncorrect {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='18' height='18' rx='9' fill='%23DC1F1F'/%3e%3cpath d='M6 12L12 6' stroke='white' stroke-linecap='round'/%3e%3cpath d='M12 12L6 6' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
    }
  }
}
</style>
