<template>
  <div class="statistic-head">
    <div class="statistic-head__top">
      <div class="vertical-wrapper">
        <div class="survey__name">{{ pollName }}</div>
        <div class="survey__info">
          <div class="info-item">{{ pollTypeText }}</div>
          <div class="info-item">{{ pagesCount }} {{ pagesCountText }}</div>
          <div class="info-item">
            {{ questionsCount }} {{ questionsCountText }}
          </div>
          <div class="info-item">{{ pollCreateDate }}</div>
        </div>
      </div>
      <div class="upload-buttons">
        <div class="upload-button" data-btn="pdf"></div>
        <div class="upload-button" data-btn="exel"></div>
        <div class="upload-button" data-btn="share"></div>
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
      <button class="btn refresh-btn" @click="refreshData"></button>
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
import { customFormattedDate } from "@/helpers/customDateFormatter";

const generalStatisticsStore = useGeneralStatistics();

const pollName = computed(() => generalStatisticsStore.pollName);
const questionsCount = computed(() => generalStatisticsStore.questionsCount);
const pagesCount = computed(() => generalStatisticsStore.pagesCount);
const respondentsCount = computed(
  () => generalStatisticsStore.respondentsCount
);
const unfinishCount = computed(() => generalStatisticsStore.unfinishCount);
const middleTime = computed(() => generalStatisticsStore.middleTime);
const pollCreateDate = computed(() => generalStatisticsStore.pollCreateDate);
const pollTypeText = computed(() => {
  return generalStatisticsStore.pollType.toLowerCase() == "опрос"
    ? "Опрос открыт"
    : "Викторина открыта";
});
const pagesCountText = computed(() =>
  chooseWord(pagesCount.value, ["страница", "страницы", "страниц"])
);
const questionsCountText = computed(() =>
  chooseWord(questionsCount.value, ["вопрос", "вопроса", "вопросов"])
);
const middleTimeFixed = computed(() => {
  const minText = middleTime.value.MIN ? `${middleTime.value.MIN} мин. ` : "";
  const secText = middleTime.value.SEC ? `${middleTime.value.SEC} сек. ` : "";
  return minText + secText;
});

function chooseWord(number, wordForms) {
  if (number % 10 == 1 && number % 100 != 11) {
    return wordForms[0];
  } else if (
    [2, 3, 4].includes(number % 10) &&
    ![12, 13, 14].includes(number % 100)
  ) {
    return wordForms[1];
  } else {
    return wordForms[2];
  }
}
const refreshData = () => {
  const dateFilterData = generalStatisticsStore.dateFilterData;

  const dateDataObjectFixToAjax = {
    from: customFormattedDate(dateFilterData.from),
    to: customFormattedDate(dateFilterData.to),
  };
  console.log(dateDataObjectFixToAjax);
  // generalStatisticsStore.getAppData(dateDataObject);
};

// const formattedCurrentDate = () => {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
//   const day = currentDate.getDate().toString().padStart(2, "0");
//   const hours = currentDate.getHours().toString().padStart(2, "0");
//   const minutes = currentDate.getMinutes().toString().padStart(2, "0");
//   return `${year}.${month}.${day} ${hours}:${minutes}`;
// };
</script>

<style lang="scss"></style>
