<template>
  <div
    v-for="(card, index) in cards"
    :key="index"
    class="w-full h-full bg-white-100 flex-center-between rounded-lg border border-transparent relative hover:border-primary transition-300 cursor-pointer p-2.5 pl-3"
    :class="{ '!border-red': error }"
    @click="$emit('change', card.value)"
  >
    <p
      class="text-sm leading-130 font-medium text-gray transition-300"
      :class="{ '!text-dark': active === card.value }"
    >
      {{ card.name }}
    </p>
    <div
      class="w-5 h-5 rounded-full border-2 border-[#C8CFD6] flex-center transition-300"
      :class="{ '!border-primary bg-primary': card.value === active }"
    >
      <div
        class="w-2.5 h-2.5 rounded-full bg-white scale-0 transition-300"
        :class="{ 'scale-100': card.value === active }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  active?: number | string;
  cards?: any[];
  error?: boolean;
}

defineProps<Props>();
</script>

<style scoped></style>
