<template>
  <button class="relative w-6 h-6 group">
    <i
      class="text-2xl absolute top-0 left-0 transition-300"
      :class="
        active
          ? 'rotate-180 icon-chevron-bold block text-gray-100 group-hover:!text-red'
          : 'icon-chevron-bold group-hover:text-primary'
      "
    />
  </button>
</template>

<script setup lang="ts">
interface Props {
  active: boolean;
}

defineProps<Props>();
</script>
