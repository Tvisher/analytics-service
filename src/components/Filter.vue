<template>
  <div class="filter-block">
    <div class="filter-wrapper">
      <button
        class="btn red-btn add-filter-btn"
        @click="showFilterModal = true"
      >
        Добавить фильтр
      </button>
    </div>
    <transition name="fade">
      <div class="filter-modal" v-if="showFilterModal" @click="closeModal">
        <div class="filter-modal__content">
          <div class="filter-modal__close"></div>
          <h2 class="filter-modal__title">Добавить фильтр</h2>
          <div class="filter-select">
            <span class="filter-select__title">Выберите вопрос</span>
            <vSelect />
          </div>

          <div class="filter-select">
            <span class="filter-select__title">Выберите ответ на вопрос</span>
            <vSelect />
          </div>
          <button class="btn red-btn filter-modal__btn">Добавить фильтр</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from "vue";

const showFilterModal = ref(false);

const closeModal = (e) => {
  const target = e.target;
  if (
    (target.closest(".filter-modal") &&
      !target.closest(".filter-modal__content")) ||
    target.closest(".filter-modal__close")
  ) {
    showFilterModal.value = false;
  }
};
</script>
<style lang="scss"></style>
