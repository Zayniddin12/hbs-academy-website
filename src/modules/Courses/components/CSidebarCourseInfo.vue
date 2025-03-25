<template>
  <div
    class="flex-y-center p-3 bg-[#E2F8E926] border border-[#E2F8E9] rounded-xl gap-2"
  >
    <i :class="icon" class="text-2xl text-green" />
    <p class="text-xs leading-130 font-semibold text-dark">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  value: string;
}

defineProps<Props>();
</script>
