<template>
  <div class="bg-white rounded-2xl border border-secondary">
    <div
      class="py-4 px-5 flex-center-between gap-5 cursor-pointer"
      @click="openModule(card?.is_opened && card?.is_active)"
    >
      <div>
        <CPreloader v-bind="{ loading }" width="320px" height="20px">
          <p class="text-base leading-140 font-semibold text-dark">
            {{ card?.details?.title }}
          </p>
        </CPreloader>
        <div class="flex-y-center divide-x space-x-1 mt-1 gap-1">
          <CPreloader v-bind="{ loading }" width="40px" height="20px">
            <div class="flex-y-center gap-1">
              <i class="icon-video block text-gray" />
              <p class="text-gray text-xs leading-130 font-medium">
                {{ card?.lessons_count }}
              </p>
            </div>
          </CPreloader>
          <CPreloader v-bind="{ loading }" width="100%" height="16px">
            <div class="flex-y-center gap-1 ml-2">
              <i class="icon-calendar-course block text-gray" />
              <p class="text-gray text-xs leading-130 font-medium">
                {{
                  $t("duration_time", {
                    start: dayjs(card?.start).format("DD.MM.YYYY"),
                    end: dayjs(card?.finish).format("DD.MM.YYYY"),
                  })
                }}
              </p>
            </div>
          </CPreloader>
        </div>
      </div>
      <CPreloader v-bind="{ loading }" width="40px" height="40px">
        <div class="flex-y-center gap-4">
          <CCircleBar
            v-if="card?.is_opened && card?.is_active"
            :percent="card?.percent"
          />
          <div
            v-else
            class="w-[42px] h-[42px] rounded-full bg-secondary flex-center"
          >
            <i class="icon-lock-long text-2xl text-gray-100" />
          </div>
          <i
            class="icon-chevron-bold text-2xl transition-300 hover:text-green"
            :class="[
              { 'rotate-180': active },
              { 'text-gray-200': !card?.is_opened && !card?.is_active },
            ]"
          />
        </div>
      </CPreloader>
    </div>
    <CollapseTransition>
      <div class="p-4 pt-0 pr-0" v-if="active">
        <div class="h-px bg-green-100 w-full" />
        <Transition name="fade" mode="out-in">
          <div :key="lessonLoading" class="pt-4 pr-4">
            <template v-if="lessonLoading">
              <div class="w-full h-[300px] flex-y-center justify-center">
                <div class="lesson-dots"></div>
              </div>
            </template>
            <template v-else>
              <div class="grid grid-cols-3 gap-4">
                <CLesson
                  v-for="(lesson, index) in lessons"
                  :key="index"
                  v-bind="{ lesson }"
                />
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup lang="ts">
import CCircleBar from "@/modules/Courses/components/CCircleBar.vue";
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import CLesson from "@/modules/Courses/components/CLesson.vue";
import { ILesson, IModule } from "@/types/common";
import CPreloader from "@/components/CPreloader.vue";
import dayjs from "dayjs";

interface Props {
  lessons: ILesson[];
  loading: boolean;
  lessonLoading?: boolean;
  card: IModule;
  active?: boolean;
}

defineProps<Props>();
const emit = defineEmits(["open"]);

function openModule(isOpened: boolean) {
  if (isOpened) {
    emit("open", false);
  }
}
</script>
<style>
.lesson-dots {
  width: 56px;
  height: 26.9px;
  background: radial-gradient(circle closest-side, #16cc53 90%, #0000) 0% 50%,
    radial-gradient(circle closest-side, #16cc53 90%, #0000) 50% 50%,
    radial-gradient(circle closest-side, #16cc53 90%, #0000) 100% 50%;
  background-size: calc(100% / 3) 13.4px;
  background-repeat: no-repeat;
  animation: dots-7ar3yq 0.8s infinite linear;
}

@keyframes dots-7ar3yq {
  20% {
    background-position: 0% 0%, 50% 50%, 100% 50%;
  }

  40% {
    background-position: 0% 100%, 50% 0%, 100% 50%;
  }

  60% {
    background-position: 0% 50%, 50% 100%, 100% 0%;
  }

  80% {
    background-position: 0% 50%, 50% 50%, 100% 100%;
  }
}
</style>
