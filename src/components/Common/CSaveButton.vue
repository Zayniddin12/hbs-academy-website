<template>
  <button
    class="w-6 h-6 flex-center group rounded-lg transition-300"
    :class="[
      { '!h-11 !w-11 bg-white-100 hover:bg-green-200': withBg },
      { '!bg-green-200': saved && withBg },
    ]"
  >
    <Transition name="fade" mode="out-in">
      <i
        v-if="!saved"
        class="icon-bookmark text-gray transition-300 group-hover:text-green text-2xl"
        :class="{ 'text-[30px]': withBg }"
      />
      <i
        v-else
        class="icon-bookmark-filled text-green transition-300 group-hover:opacity-80 text-2xl"
        :class="{ 'text-[30px]': withBg }"
      />
    </Transition>
  </button>
</template>

<script setup lang="ts">
interface Props {
  saved: boolean;
  withBg?: boolean;
}

defineProps<Props>();
</script>
