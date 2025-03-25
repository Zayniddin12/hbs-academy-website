<template>
  <div
    class="relative group"
    :class="{ '!cursor-not-allowed': lesson?.status === 'locked' }"
    @click="goToLessonSingle"
  >
    <div class="aspect-video relative overflow-hidden rounded-xl">
      <div class="absolute top-2 left-2 z-[20]">
        <p
          v-if="
            lesson?.details?.percent !== 100 ||
            lesson?.details?.status !== 'ready'
          "
          class="bg-yellow/20 text-yellow text-xs rounded-full font-medium px-3 py-1 w-full mb-5 flex-y-center flex-x-center"
        >
          {{ $t("video_is_getting_ready_to_processing") }}
        </p>
      </div>
      <img
        :src="lesson?.details?.preview"
        class="w-full h-full object-cover"
        alt="lesson-image"
      />
      <button
        v-if="lesson?.status !== 'locked'"
        class="w-10 h-10 flex-center bg-white/[22%] backdrop-blur-[15px] absolute-center z-[11] rounded-full group"
      >
        <i
          class="icon-player text-white group-hover:text-primary transition-300"
        />
      </button>
      <div
        class="w-full h-full absolute-center flex flex-col justify-end z-10 bg-dark/50 p-2"
      >
        <div class="flex-center-between">
          <div
            :class="{ '!text-white !bg-gray': lesson?.status === 'locked' }"
            class="py-1 px-2 rounded-[20px] bg-primary/[22%] backdrop-blur-[15px]"
          >
            <p class="text-xs leading-130 font-medium text-white">
              {{ lesson?.percent }}%
            </p>
          </div>
          <div
            :class="{ '!text-white !bg-gray': lesson?.status === 'locked' }"
            class="py-1 px-2 rounded-[20px] bg-primary/[22%] backdrop-blur-[15px]"
          >
            <p class="text-xs leading-130 font-medium text-white">
              {{ secondsToTime(lesson?.viewed_time, true) }}/{{
                secondsToTime(lesson?.details?.video_duration, true)
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <p
      :class="{ '!text-gray': lesson?.status === 'locked' }"
      class="mt-2 text-sm leading-130 font-semibold text-dark group-hover:text-primary transition-300"
    >
      {{ lesson?.details?.title }}
    </p>
    <div
      v-if="lesson?.status === 'locked'"
      class="absolute left-0 top-0 w-full h-full z-50 flex-y-center justify-center"
    >
      <div
        class="w-10 h-10 flex-center bg-white/[22%] backdrop-blur-[15px] absolute-center z-[11] rounded-full group"
      >
        <span class="icon-lock-long text-2xl text-white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { secondsToTime } from "@/utils";
import { ILesson } from "@/types/common";
import { useRouter } from "vue-router";

interface Props {
  lesson: ILesson;
}
const props = defineProps<Props>();
const router = useRouter();

const goToLessonSingle = () => {
  if (props?.lesson?.status === "locked") {
    return;
  }
  router.push({
    name: "LessonSingle",
    params: { id: props?.lesson?.id },
  });
};
</script>
