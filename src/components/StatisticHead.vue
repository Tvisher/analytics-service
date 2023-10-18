<template>
  <div class="statistic-head">
    <div class="statistic-head__top">
      <div class="vertical-wrapper">
        <div class="survey__name">{{ pollName }}</div>
        <div class="survey__info">
          <div class="info-item">Опрос открыт</div>
          <div class="info-item">{{ pagesCount }} страницы</div>
          <div class="info-item">{{ questionsCount }} вопросов</div>
          <div class="info-item">{{ formattedCurrentDate() }}</div>
        </div>
      </div>
      <div class="upload-buttons">
        <div class="upload-button"></div>
        <div class="upload-button"></div>
        <div class="upload-button"></div>
      </div>
    </div>
    <div class="statistic-head__nav-btns">
      <router-link class="btn" :to="{ name: 'generalStatistics' }">
        Общая статистика
      </router-link>

      <router-link class="btn" :to="{ name: 'personalStatistics' }">
        Персональная статистика
      </router-link>
      <button class="btn">Закрыть опрос</button>
      <button class="btn refresh-btn"></button>
    </div>
    <AppDateRange />

    <div class="statistic-head__bottom">
      <div class="origin-information">
        <div class="information-block">
          <div class="information-block__ico">
            <img src="@/assets/img/head-ico-1.svg" alt="" />
          </div>
          <div class="information-block__data">
            <div class="data-value">{{ respondentsCount }}</div>
            <div class="data-descr">
              Количество<br />
              респондентов
            </div>
          </div>
        </div>
        <div class="information-block">
          <div class="information-block__ico">
            <img src="@/assets/img/head-ico-2.svg" alt="" />
          </div>
          <div class="information-block__data">
            <div class="data-value">{{ middleTimeFixed }}</div>
            <div class="data-descr">Среднее время прохождения</div>
          </div>
        </div>
        <div class="information-block">
          <div class="information-block__ico">
            <img src="@/assets/img/head-ico-3.svg" alt="" />
          </div>
          <div class="information-block__data">
            <div class="data-value">{{ unfinishCount }}</div>
            <div class="data-descr">
              Количество<br />
              незавершенных сессий
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppDateRange from "@/components/DateRange.vue";
import { computed } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";
const store = useGeneralStatistics();

const pollName = computed(() => store.pollName);
const questionsCount = computed(() => store.questionsCount);
const pagesCount = computed(() => store.pagesCount);
const respondentsCount = computed(() => store.respondentsCount);
const unfinishCount = computed(() => store.unfinishCount);
const middleTime = computed(() => store.middleTime);

const formattedCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const middleTimeFixed = computed(() => {
  const minText = middleTime.MIN ? `${middleTime.MIN} мин. ` : "";
  const secText = middleTime.SEC ? `${middleTime.SEC} сек. ` : "";
  return minText + secText;
});
</script>

<style lang="scss"></style>
