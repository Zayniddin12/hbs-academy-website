<template>
  <Transition name="fade" mode="out-in">
    <p v-if="!isFinished" class="text-sm leading-130 text-gray">
      {{ $t("resend_code") }}:
      <CTimer :seconds="time" @timeout="isFinished = true" />
    </p>
    <button
      v-else
      class="text-center text-sm leading-130 font-medium text-primary hover:text-dark transition-300"
      @click="resend"
    >
      {{ $t("resend") }} <i class="icon-resend inline-block" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import CTimer from "@/modules/Auth/components/CTimer.vue";
import { ref } from "vue";

interface Props {
  time: number;
}

defineProps<Props>();

const emit = defineEmits(["resend"]);

const isFinished = ref(false);

function resend() {
  isFinished.value = false;
  emit("resend");
}
</script>
