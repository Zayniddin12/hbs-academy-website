<template>
  <div
    class="w-16 h-16 rounded-xl border flex-center relative shrink-0"
    :class="cardStyles?.bg"
  >
    <span
      v-if="type === EAssignmentType.completed"
      class="absolute -top-1.5 -right-1.5 border-[1.6px] border-white w-5 h-5 flex-center bg-green rounded-full"
    >
      <i class="icon-tick text-base text-white" />
    </span>
    <span
      v-if="type === EAssignmentType.expired"
      class="absolute -top-1.5 -right-1.5 border-[1.6px] border-white w-5 h-5 flex-center bg-red rounded-full"
    >
      <i class="icon-close text-xs text-white" />
    </span>
    <div class="text-center">
      <p class="text-xl leading-120 font-bold" :class="cardStyles?.point">
        {{ Math.round(point) ?? 0 }}
      </p>
      <p class="text-xs leading-130 font-normal" :class="cardStyles?.text">
        {{ $t("point") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EAssignmentType } from "@/types/common";
import { computed } from "vue";

interface Props {
  point: number;
  type: EAssignmentType;
}

const props = defineProps<Props>();

const cardStyles = computed(() => {
  if (props.type === EAssignmentType.active) {
    return {
      bg: "bg-white border-secondary",
      point: "text-green",
      text: "text-dark",
    };
  } else if (props.type === EAssignmentType.completed) {
    return {
      bg: "bg-green border-transparent",
      point: "text-white",
      text: "text-white",
    };
  } else {
    return {
      bg: "bg-red border-transparent",
      point: "text-white",
      text: "text-white",
    };
  }
});
</script>
