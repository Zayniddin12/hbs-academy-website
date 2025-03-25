<template>
  <RouterLink
    @click="videoStore.playVideo(lesson?.id)"
    :to="{ name: 'LessonSingle', params: { id: lesson?.id } }"
    class="py-2 px-4 flex-y-center gap-2.5 hover:bg-[#F3FCF6] transition-300 cursor-pointer"
    :class="{ 'bg-[#F3FCF6]': active }"
  >
    <div
      class="w-[110px] h-[80px] rounded-lg relative overflow-hidden before:rounded-lg before:absolute before:inset-0 before:border before:border-[rgba(255, 255, 255, 0.12)] shrink-0"
    >
      <img
        :src="lesson?.details?.preview"
        class="w-full h-full object-cover"
        alt="lesson"
      />
      <div class="w-full h-full absolute inset-0 bg-dark/50 flex-center">
        <button
          v-if="!active"
          class="w-12 h-12 rounded-full flex-center bg-white/[22%]"
        >
          <i class="icon-player text-white text-2xl" />
        </button>
        <button
          v-else
          class="w-12 h-12 bg-primary/[22%] rounded-full flex-center"
        >
          <img src="/images/svg/pause.svg" alt="pause" />
        </button>
      </div>
    </div>

    <div class="flex flex-col justify-between gap-3 h-full w-full">
      <p class="text-sm leading-130 font-semibold text-dark">
        {{ lesson?.details?.title }}
      </p>
      <div>
        <div
          class="w-full rounded-full h-3 bg-green-100 relative overflow-hidden"
        >
          <div
            class="h-3 rounded-full bg-green"
            :style="{ width: `${lesson?.percent}%` }"
          />
        </div>
        <div class="flex-center-between gap-3 mt-1">
          <p class="text-xs leading-130 font-medium text-dark">
            {{ lesson?.percent }}%
          </p>

          <p class="text-xs leading-130 font-normal text-gray">
            <span class="font-medium text-dark">{{
              secondsToTime(lesson?.viewed_time ?? 0, true)
            }}</span>
            /
            {{ secondsToTime(lesson?.details?.video_duration ?? 0, true) }}
          </p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { secondsToTime } from "@/utils";
import { ILesson } from "@/types/common";
import { useVideoStore } from "@/modules/Auth/stores";
import { computed } from "vue";

const videoStore = useVideoStore();

interface Props {
  lesson: ILesson;
  active?: boolean;
}

defineProps<Props>();
const isPlayingVideo = computed(() => videoStore.isPlaying);
const selectedId = computed(() => videoStore.selectedId);
</script>

<style scoped></style>
