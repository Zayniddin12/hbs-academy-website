<template>
  <div class="bg-white rounded-xl p-4">
    <CTestTimer :default-time="done ? 0 : time" :is-submitted="done" />
    <CTestMap
      v-bind="{ questions, current, values, answered }"
      class="mt-4"
      @map-change="$emit('map-change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import CTestTimer from "@/modules/Assignments/components/Test/CTestTimer.vue";
import CTestMap from "@/modules/Assignments/components/Test/CTestMap.vue";

interface Props {
  questions: any[];
  values: any;
  current?: number;
  count?: number;
  answered?: boolean;
  time?: number;
  done?: boolean;
}

defineProps<Props>();
</script>
