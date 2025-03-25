<template>
  <div class="w-full px-4 flex-center py-3 rounded-xl border border-green-200">
    <div class="text-center">
      <i
        :class="[card?.icon, { '!text-red': card?.isDeadline }]"
        class="text-[28px] text-primary"
      />
      <p class="my-1 text-xs leading-130 font-normal text-gray">
        {{ card?.title }}
      </p>
      <p
        class="text-sm leading-130 font-semibold text-dark"
        :class="{ '!text-red': card?.isDeadline }"
      >
        {{ card?.value }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  card: {
    title: string;
    value: string | number;
    icon: string;
    isDeadline?: boolean;
  };
}

defineProps<Props>();
</script>
