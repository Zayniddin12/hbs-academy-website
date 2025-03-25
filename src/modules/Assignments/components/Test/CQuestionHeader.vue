<template>
  <div>
    <p class="text-2xl leading-normal font-semibold text-dark">
      {{ question?.details?.body }}
    </p>
    <div
      v-if="question?.details?.photo"
      class="aspect-video mt-5 rounded-xl relative overflow-hidden"
    >
      <img
        :src="question?.details?.photo"
        alt="question-image"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IQuestion } from "@/modules/Assignments/types";

interface Props {
  question: IQuestion;
}

defineProps<Props>();
</script>
