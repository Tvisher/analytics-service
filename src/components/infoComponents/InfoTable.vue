<template>
  <div class="info-char-wrapper custom-table-wrapper">
    <div class="">
      <div class="custom-table__row head-row">
        <div class="custom-table__col">Варианты</div>
        <div class="custom-table__col">Количество ответов</div>
        <div class="custom-table__col">Проценты</div>
      </div>

      <div class="custom-table__row" v-for="itemData in props.tableData">
        <div class="custom-table__col">{{ itemData.name }}</div>
        <div class="custom-table__col">{{ itemData.answerCount }}</div>
        <div class="custom-table__col">{{ itemData.precent }} %</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tableData: Array,
});
</script>

<style lang="scss" scoped>
.custom-table__row {
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 10px 0px;
  font-weight: 500;
  &.head-row {
    .custom-table__col {
      color: #262b31 !important;
    }
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
  &:last-child {
    padding-bottom: 0;
  }
  .custom-table__col {
    &:first-child {
      color: #fa0056;
    }
    flex: 0 0 33.33%;
  }
}
</style>
