<template>
  <div class="bg-white-100 min-h-screen relative">
    <CHeader />
    <slot />
  </div>
</template>
<script lang="ts" setup>
import CHeader from "@/layout/Dashboard/components/CHeader.vue";
</script>
