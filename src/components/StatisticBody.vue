<template>
  <div class="statistic-body">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
<script setup></script>
