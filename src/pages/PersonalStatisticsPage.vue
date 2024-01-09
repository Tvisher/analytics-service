<template>
  <AppInDevPoster v-if="pageInDev" />
  <div v-else>
    <h1>Персональная статистика</h1>
    <AppFilter @addFilterItem="addFilterItem" />

    <div class="filter-list">
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
    <pre>
      {{ filterItemsList }}
    </pre>
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
import { v4 as uuidv4 } from "uuid";

import { ref } from "vue";
const pageInDev = false;
const filterItemsList = ref([]);

const addFilterItem = (filterItem) => {
  const isHasCurentFilter = filterItemsList.value.find((item) => {
    return JSON.stringify(item.params) === JSON.stringify(filterItem);
  });
  if (!isHasCurentFilter) {
    filterItemsList.value.push({
      id: uuidv4(),
      params: filterItem,
    });
  }
};

const removeFilterItem = (itemId) => {
  filterItemsList.value = filterItemsList.value.filter(
    (item) => item.id !== itemId
  );
};
</script>

<style lang="scss">
.filter-list {
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
