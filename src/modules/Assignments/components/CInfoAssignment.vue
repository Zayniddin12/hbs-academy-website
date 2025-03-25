<template>
  <div>
    <h1 class="text-base leading-130 font-semibold text-dark">{{ title }}</h1>
    <p class="mt-2 text-sm leading-130 font-normal text-dark break-words">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
}

defineProps<Props>();
</script>
