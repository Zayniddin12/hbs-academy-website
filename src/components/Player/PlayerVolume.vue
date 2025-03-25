<template>
  <div
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
    class="flex-y-center gap-1 mr-2"
  >
    <div class="flex-y-center">
      <svg
        class="cursor-pointer"
        @click="setVolume"
        width="24"
        height="24"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.66882 7.88546H3.59382L6.00007 10.3661V2.42798L3.59382 4.90865H1.66882V7.88546Z"
          fill="#EBEAE9"
        />
        <path
          d="M6.96252 4.41248V8.38155C7.67477 8.04418 8.16565 7.27517 8.16565 6.39701C8.16565 5.53374 7.67477 4.77962 6.96252 4.41248Z"
          fill="#EBEAE9"
        />
        <rect
          class="stick opacity-0 smooth-hover"
          :class="{ 'opacity-100': volume >= 0 && volume < 1 }"
          x="3"
          y="1.55469"
          width="1"
          height="12"
          transform="rotate(-33.6772 3 1.55469)"
          fill="#EBEAE9"
        />

        <transition name="fade">
          <path
            v-if="volume > 50"
            d="M6.96252 3.06794C8.35334 3.49461 9.36877 4.82425 9.36877 6.397C9.36877 7.96975 8.35334 9.29939 6.96252 9.72607V10.7481C8.89234 10.2966 10.3313 8.52046 10.3313 6.397C10.3313 4.27354 8.89234 2.49738 6.96252 2.0459V3.06794Z"
            fill="#EBEAE9"
          />
        </transition>
        <transition name="fade">
          <path
            v-if="volume >= 0 && volume < 1"
            d="M6.96252 3.06794C8.35334 3.49461 9.36877 4.82425 9.36877 6.397C9.36877 7.96975 8.35334 9.29939 6.96252 9.72607V10.7481C8.89234 10.2966 10.3313 8.52046 10.3313 6.397C10.3313 4.27354 8.89234 2.49738 6.96252 2.0459V3.06794Z"
            fill="#EBEAE9"
          />
        </transition>
      </svg>
    </div>
    <div
      class="volume-slider flex items-center w-[60px] shrink-0 overflow-hidden relative"
    >
      <span
        class="bg-white bg-opacity-20 rounded-xl absolute w-full left-0 right-0 h-1"
      />
      <input
        class="volume__range range cursor-pointer w-full"
        ref="volumeRange"
        type="range"
        v-model="volume"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  defaultVolume: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["change"]);

const isOpen = ref(false);
const volume = ref(props.defaultVolume || 80);

function setVolume() {
  if (volume.value === 0) {
    volume.value = 80;
  } else {
    volume.value = 0;
  }
}

watch(
  () => volume.value,
  () => {
    emit("change", volume.value);
  }
);
</script>

<style scoped>
input[type="range"] {
  color: #ef233c;
  --thumb-height: 1em;
  --track-height: 0.125em;
  --track-color: #fff;
  --clip-edges: 0.125em;
}

input[type="range"] {
  position: relative;
  background: #fff0;
}

input[type="range"]:active {
  cursor: grabbing;
}

input[type="range"]:disabled {
  filter: grayscale(1);
  opacity: 0.3;
  cursor: not-allowed;
}

/* === WebKit specific styles === */
input[type="range"],
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  position: relative;
}

input[type="range"]::-webkit-slider-thumb {
  --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
  --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
  --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
  --clip-further: calc(100% + 1px);
  --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
    100vmax #fff;

  width: var(--thumb-width, var(--thumb-height));
  background-color: #fff;
  border: 2px solid #fff;
  box-shadow: var(--box-fill);
  border-radius: 9999px;

  filter: brightness(100%);
  clip-path: polygon(
    100% -1px,
    var(--clip-edges) -1px,
    0 var(--clip-top),
    -100vmax var(--clip-top),
    -100vmax var(--clip-bottom),
    0 var(--clip-bottom),
    var(--clip-edges) 100%,
    var(--clip-further) var(--clip-further)
  );
}
</style>
