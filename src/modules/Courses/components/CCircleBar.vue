<template>
  <div class="card relative">
    <div class="percent">
      <svg>
        <circle cx="20" cy="20" r="17"></circle>
        <circle
          :class="{ 'opacity-0': !percent }"
          cx="20"
          cy="20"
          r="17"
          :style="{ '--percent': `${percent}` }"
        ></circle>
      </svg>
    </div>
    <p class="absolute-center text-[10px] font-bold text-dark leading-130">
      {{ percent }}%
    </p>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  percent: number;
}

defineProps<Props>();
</script>

<style scoped>
.card svg {
  position: relative;
  width: 42px;
  height: 42px;
  transform: rotate(-90deg);
}

.card svg circle {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #edf1f5;
  stroke-width: 5;
  stroke-linecap: round;
}

.card svg circle:last-of-type {
  stroke-dasharray: 105px;
  stroke-dashoffset: calc(105px - (105px * var(--percent)) / 100);
  stroke: #3dd641;
}
</style>
