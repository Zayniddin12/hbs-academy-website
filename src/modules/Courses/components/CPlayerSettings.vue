<template>
  <div
    class="absolute right-2 bottom-[56px] bg-dark/40 text-white rounded-[20px] backdrop-blur-md"
  >
    <div
      class="relative overflow-hidden rounded-[20px] transition-300"
      :class="step === EStep.Start ? 'w-[380px]' : 'w-[186px]'"
    >
      <Transition name="fade" mode="out-in">
        <div class="w-full" :key="step">
          <div v-if="step === EStep?.Start" class="w-full min-w-[380px]">
            <button
              class="px-3 py-4 w-full flex-center-between gap-4 transition cursor-pointer hover:bg-white/20"
              @click="step = EStep.Speed"
            >
              <div class="flex-y-center gap-2">
                <i class="icon-speeds text-[26px]" />
                <p class="text-sm leading-130 font-medium text-white">
                  {{ $t("speed_options") }}
                </p>
              </div>

              <div class="flex-y-center">
                <p class="text-sm leading-130 text-gray-200">
                  {{ activeSpeed?.label }}
                </p>
                <i class="icon-chevron-bold -rotate-90 text-xl" />
              </div>
            </button>
            <button
              class="px-3 py-4 w-full flex-center-between gap-4 transition cursor-pointer hover:bg-white/20"
              @click="step = EStep.Quality"
            >
              <div class="flex-y-center gap-2">
                <i class="icon-quality text-[26px]" />
                <p class="text-sm leading-130 font-medium text-white">
                  {{ $t("quality") }}
                </p>
              </div>

              <div class="flex-y-center">
                <p class="text-sm leading-130 text-gray-200">
                  {{ activeQuality?.label }}
                </p>
                <i class="icon-chevron-bold -rotate-90 text-xl" />
              </div>
            </button>
          </div>
          <div v-if="step === EStep.Speed" class="w-full">
            <button
              class="px-3 py-1.5 w-full flex-y-center transition cursor-pointer hover:bg-white/20 border-b border-gray-100"
              @click="step = EStep.Start"
            >
              <i class="icon-chevron-bold rotate-90 text-2xl" />
              <p class="text-sm leading-130 font-medium text-white">
                {{ $t("speed_options") }}
              </p>
            </button>
            <div class="flex flex-col">
              <button
                v-for="(option, index) in speedOptions"
                :key="index"
                class="flex-y-center gap-2 px-3 py-[3px] hover:bg-white/20 transition-300"
                @click="changeSpeed(option?.value)"
              >
                <i
                  class="icon-tick-longer text-xl text-white opacity-0"
                  :class="{ 'opacity-100': option?.value === speed }"
                />
                <p class="text-xs leading-130 font-medium">
                  {{ option?.label }}
                </p>
              </button>
            </div>
          </div>
          <div v-if="step === EStep.Quality" class="w-full">
            <button
              class="px-3 py-1.5 w-full flex-y-center transition cursor-pointer hover:bg-white/20 border-b border-gray-100"
              @click="step = EStep.Start"
            >
              <i class="icon-chevron-bold rotate-90 text-2xl" />
              <p class="text-sm leading-130 font-medium text-white">
                {{ $t("quality") }}
              </p>
            </button>
            <div class="flex flex-col">
              <button
                v-for="(option, index) in qualityOptions"
                :key="index"
                class="flex-y-center gap-2 px-3 py-[3px] hover:bg-white/20 transition-300"
                @click="changeQuality(option?.value)"
              >
                <i
                  class="icon-tick-longer text-xl text-white opacity-0"
                  :class="{ 'opacity-100': option?.value === quality }"
                />
                <p class="text-xs leading-130 font-medium">
                  {{ option?.label }}
                </p>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  speed: number;
  quality: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["change-speed", "change-quality"]);

const activeSpeed = computed(() =>
  speedOptions.value.find((x) => x.value === props.speed)
);

const activeQuality = computed(() =>
  qualityOptions.value.find((x) => x.value === props.quality)
);
enum EStep {
  Speed = "speed",
  Quality = "quality",
  Start = "start",
}

const step = ref<EStep>(EStep.Start);
const { t } = useI18n();

function changeSpeed(speed: number) {
  emit("change-speed", speed);
  step.value = EStep.Start;
}

function changeQuality(quality: number) {
  emit("change-quality", quality);
  step.value = EStep.Start;
}

const speedOptions = computed(() => [
  {
    value: 0.5,
    label: "0.5x",
  },
  {
    value: 0.75,
    label: "0.75x",
  },
  {
    value: 1,
    label: t("ordinary"),
  },
  {
    value: 1.25,
    label: "1.25x",
  },
  {
    value: 1.5,
    label: "1.5x",
  },
  {
    value: 1.75,
    label: "1.75x",
  },
  {
    value: 2,
    label: "2x",
  },
]);

const qualityOptions = computed(() => [
  {
    value: 1080,
    label: "1080p60",
  },
  {
    value: 720,
    label: "720p",
  },
  {
    value: 480,
    label: "480p",
  },
  {
    value: 360,
    label: "360p",
  },
  {
    value: 240,
    label: "240p",
  },
  {
    value: 144,
    label: "144p",
  },
]);
</script>
