<template>
  <div class="stats-card p-6 rounded-xl">
    <div class="flex-y-center gap-3">
      <div
        class="flex-center w-10 h-10 rounded-lg border-2 border-white/16 bg-[#73CF11]"
      >
        <img
          :src="`/src/assets/svg/statistics/bulk-${card.icon}.svg`"
          alt="stats icon"
          class="w-6 h-6 object-contain"
        />
      </div>
      <h4 class="text-2xl leading-130 font-bold text-dark">
        {{ formatMoneyDecimal(card.value) }}
      </h4>
    </div>
    <h5 class="mt-2 text-sm leading-130 text-gray-700">{{ card.title }}</h5>
  </div>
</template>

<script setup lang="ts">
import { formatMoneyDecimal } from "@/utils";

interface Props {
  card: {
    icon: string;
    title: string;
    value: string;
  };
}
defineProps<Props>();
</script>

<style scoped>
.stats-card {
  box-shadow: 0 0 30px rgba(56, 71, 109, 0.09);
}
</style>
