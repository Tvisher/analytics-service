<template>
  <div class="statistic-head">
    <div class="statistic-head__top">
      <div class="vertical-wrapper">
        <div class="survey__name">Название анкеты</div>
        <div class="survey__info">
          <div class="info-item">Опрос открыт</div>
          <div class="info-item">2 страницы</div>
          <div class="info-item">21 вопрос</div>
          <div class="info-item">2023.05.25 12:37</div>
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
    <div class="statistic-head__bottom">
      <div class="origin-information">
        <div class="information-block">
          <div class="information-block__ico">
            <img src="@/assets/img/head-ico-1.svg" alt="" />
          </div>
          <div class="information-block__data">
            <div class="data-value">1454</div>
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
            <div class="data-value">3 мин</div>
            <div class="data-descr">
              Среднее время<br />
              прохождения<br />
              опроса / викторины
            </div>
          </div>
        </div>
        <div class="information-block">
          <div class="information-block__ico">
            <img src="@/assets/img/head-ico-3.svg" alt="" />
          </div>
          <div class="information-block__data">
            <div class="data-value">32</div>
            <div class="data-descr">
              Количество<br />
              незавершенных<br />
              сессий
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss"></style>
