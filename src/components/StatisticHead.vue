<template>
  <div
    class="statistic-head"
    :class="{ isPersonalInfoPage: isPersonalInfoPage }"
  >
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
        <router-link
          class="back-to-list"
          v-if="isPersonalInfoPage"
          :to="{ name: 'personalStatistics' }"
        >
          К списку
        </router-link>
        <div class="upload-button" data-btn="pdf"></div>
        <div
          class="upload-button"
          @click="createExelFile"
          data-btn="exel"
        ></div>
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
    <template v-if="!isPersonalInfoPage">
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
    </template>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import AppDateRange from "@/components/DateRange.vue";
import { computed } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";
import { usePersonalStatistic } from "@/stores/PersonalStatistic";
import { customFormattedDate } from "@/helpers/customDateFormatter";
const route = useRoute();
const generalStatisticsStore = useGeneralStatistics();
const personalStatisticsStore = usePersonalStatistic();

const pollName = computed(() => generalStatisticsStore.pollName);
const questionsCount = computed(() => generalStatisticsStore.questionsCount);
const pagesCount = computed(() => generalStatisticsStore.pagesCount);
const respondentsCount = computed(
  () => generalStatisticsStore.respondentsCount
);
const unfinishCount = computed(() => generalStatisticsStore.unfinishCount);
const middleTime = computed(() => generalStatisticsStore.middleTime);
const pollCreateDate = computed(() => generalStatisticsStore.pollCreateDate);
const pollStatus = computed(() => generalStatisticsStore.pollStatus);

const pollTypeText = computed(() => {
  let str;
  if (generalStatisticsStore.pollType.toLowerCase() == "опрос") {
    str = "Опрос ";
    pollStatus.value ? (str += "открыт") : (str += "закрыт");
  } else {
    str = "Викторина ";
    pollStatus.value ? (str += "открыта") : (str += "закрыта");
  }
  return str;
});

const pagesCountText = computed(() =>
  chooseWord(pagesCount.value, ["страница", "страницы", "страниц"])
);
const questionsCountText = computed(() =>
  chooseWord(questionsCount.value, ["вопрос", "вопроса", "вопросов"])
);
const middleTimeFixed = computed(() => {
  let str;
  const minText = middleTime.value.MIN ? `${middleTime.value.MIN} мин. ` : "";
  const secText = middleTime.value.SEC ? `${middleTime.value.SEC} сек. ` : "";
  str = minText + secText;
  return str.length > 0 ? str : "Нет данных";
});

const isPersonalInfoPage = computed(
  () => useRoute().name === "personalStatisticItem"
);

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
const refreshData = (e) => {
  const targetBtn = e.target;
  if (targetBtn.classList.contains("spin")) return;

  targetBtn.classList.add("spin");
  const dateFilterData = generalStatisticsStore.dateFilterData;
  const dateDataObjectFixToAjax = {
    from: customFormattedDate(dateFilterData.from),
    to: customFormattedDate(dateFilterData.to),
  };
  generalStatisticsStore
    .getAppData(dateDataObjectFixToAjax)
    .then(() => setTimeout(() => targetBtn.classList.remove("spin"), 1000))
    .catch(() => setTimeout(() => targetBtn.classList.remove("spin"), 1000));
};

const appId = document.querySelector("#app").dataset.id;
const createExelFile = (e) => {
  const targetBtn = e.target.closest(".upload-button");
  if (targetBtn) {
    if (targetBtn.classList.contains("sending")) {
      return;
    }
    targetBtn.classList.add("sending");
  }
  let createFileUrl;
  let postData = {
    id: appId,
  };
  if (route.name === "generalStatistics") {
    postData.from = customFormattedDate(
      generalStatisticsStore.dateFilterData.from
    );
    postData.to = customFormattedDate(generalStatisticsStore.dateFilterData.to);
    createFileUrl = "/ajax/resultStatisticExcel.php";
  }
  if (route.name === "personalStatistics") {
    postData.table = personalStatisticsStore.tableForExelData;
    createFileUrl = "/ajax/personTableStatisticExcel.php";
  }
  return new Promise((resolve, reject) => {
    axios
      .post(createFileUrl, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        const downloadFileLink = response.data;
        targetBtn.classList.remove("sending");

        window.open(downloadFileLink, "_blank");
        resolve();
      })
      .catch((error) => {
        console.log("Ошибка!!!", error);
        reject();
      });
  });
};
</script>

<style lang="scss">
.upload-button.sending {
  cursor: progress;
}
</style>
