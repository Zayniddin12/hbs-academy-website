<template>
  <div
    class="w-16 h-16 border-[4px] border-white/10 rounded-full flex-center text-[32px] leading-8 text-white mx-auto shadow-purple"
    :class="[checkColor, icon]"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  icon: string;
  color: "red" | "purple" | "yellow" | "green";
}

const props = defineProps<Props>();

const checkColor = computed(() => {
  if (props.color === "red") {
    return "bg-red";
  } else if (props.color === "yellow") {
    return "bg-yellow";
  } else if (props.color === "purple") {
    return "bg-purple";
  } else {
    return "bg-green";
  }
});
</script>

<style scoped>
.shadow-purple {
  filter: drop-shadow(0px 4px 50px rgba(113, 122, 249, 0.22));
}
</style>
