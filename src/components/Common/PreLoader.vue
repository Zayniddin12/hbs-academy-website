<template>
  <transition :key="loading" name="skeleton" mode="out-in">
    <div
      v-if="loading"
      key="loading"
      class="shrink-0"
      :style="{
        height: height,
        width: width,
        margin: margin,
        borderRadius: borderRadius,
        style,
      }"
      :class="['skeleton-wrapper', preloaderClass, { dark: dark }]"
    >
      <span
        class="skeleton"
        :style="[{ borderRadius: borderRadius }, shimmerStyles]"
        :class="shimmerClass"
      />
    </div>
    <template v-else>
      <slot />
    </template>
  </transition>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  loading?: boolean;
  height?: string;
  width?: string;
  margin?: string;
  dark?: boolean;
  borderRadius?: string;
  preloaderClass?: string;
  circle?: boolean;
  style?: string;
  shimmerClass?: string;
  duration?: string;
}
const props = withDefaults(defineProps<Props>(), {
  preloaderClass: "",
  width: "400px",
  height: "200px",
});
const shimmerStyles = computed(() => {
  return {
    "--width": props.width,
    "--height": props.height,
    "--border-radius": props.circle
      ? "100px"
      : props.borderRadius
      ? props.borderRadius
      : "4px",
    "--skeleton-duration": props.duration ? props.duration + "s" : "1s",
  };
});
</script>
<style>
:root {
  --border-radius: 4px;
  --skeleton-duration: 1s;
}

.skeleton {
  background-color: #dddbdd;
  background-image: linear-gradient(
    to right,
    rgba(194, 198, 204, 0.3) 5.93%,
    rgba(255, 255, 255, 0.42) 26.56%,
    rgba(194, 198, 204, 0.3) 62.69%
  );
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  position: relative;
  animation-duration: var(--skeleton-duration);
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}

.dark .skeleton {
  /*background-color: rgba(95, 94, 94, 0.99);*/
  background-color: rgba(114, 113, 114, 1);
  background-image: linear-gradient(
    to right,
    rgba(120, 116, 118, 0.2) 5.93%,
    rgba(185, 181, 183, 0.6) 26.56%,
    rgba(135, 132, 134, 0.2) 62.69%
  );
}
@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
.skeleton-enter-active,
.skeleton-leave-active {
  transition: all 0.1s ease-out;
}
.skeleton-enter,
.skeleton-leave-to {
  opacity: 0;
}
</style>

<ArgsTable of="{BlockPreloader}" />
