<template>
  <div class="relative flex items-stretch p-3 rounded-lg border border-dark/10">
    <div
      class="border-r-2 border-r-dark/10 pl-5 py-1 pr-10 inline-flex items-center justify-center flex-col gap-1"
    >
      <CPreloader loading width="28px" height="20px" />
      <CPreloader loading width="47px" height="42px" />
    </div>
    <div class="inline-flex items-start justify-between flex-col pl-4">
      <CPreloader loading width="135px" height="24px" />
      <CPreloader loading width="320px" height="24px" preloader-class="mt-1" />
      <div class="inline-flex items-start justify-start gap-4 mt-2">
        <CPreloader loading width="50px" height="20px" />
        <CPreloader loading width="50px" height="20px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CPreloader from "@/components/CPreloader.vue";
</script>

<style scoped></style>
