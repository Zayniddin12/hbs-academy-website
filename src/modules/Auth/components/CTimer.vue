<template>
  <span class="font-medium text-primary" :class="{ 'text-red': seconds <= 20 }">
    {{ time }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  seconds: number;
}
const props = defineProps<Props>();

interface Emits {
  (e: "timeout"): void;
}
const $emit = defineEmits<Emits>();
const seconds = ref(0);
const time = ref("");

const countDown = () => {
  seconds.value--;

  const mm = Math.floor(seconds.value / 60);
  const ss = Math.floor(seconds.value % 60);

  time.value = `${mm > 9 ? mm : "0" + mm}:${ss > 9 ? ss : "0" + ss}`;
};

watch(
  () => props.seconds,
  () => {
    seconds.value = props.seconds;
    countDown();
  },
  { immediate: true }
);

const interval = setInterval(function () {
  countDown();

  if (seconds.value < 0) {
    clearInterval(interval);
    time.value = "00:00";
    $emit("timeout");
  }
}, 1000);
</script>
