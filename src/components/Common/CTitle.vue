<template>
  <h1 class="text-2xl leading-130 text-dark font-bold">{{ title }}</h1>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>
