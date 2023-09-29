<template>
  <div class="pages-pagination">
    <div class="pagination-item active">1</div>
    <div class="pagination-item">2</div>
    <div class="pagination-item">3</div>
    <div class="pagination-item">4</div>
  </div>
  <AppPollItem />
  <AppPollItem />
  <AppPollItem />
</template>
<script setup>
import AppPollItem from "@/components/PollItem.vue";
</script>
