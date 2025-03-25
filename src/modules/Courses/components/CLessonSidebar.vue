<template>
  <div class="flex flex-col gap-5">
    <div
      class="bg-white border border-secondary rounded-2xl relative overflow-hidden transition-300"
    >
      <div
        class="px-4 pt-3 pb-2 cursor-pointer hover:bg-white-100"
        @click="openLesson = !openLesson"
      >
        <div class="flex justify-between gap-3">
          <div>
            <p class="text-base leading-130 font-bold text-dark">
              {{ $t("lesson_modules") }}
            </p>
            <p class="mt-1 text-sm leading-130 font-medium text-gray">
              {{ $t("video_lessons_count", { count: lessons?.length }) }}
            </p>
          </div>
          <CChevronButton :active="openLesson" />
        </div>
      </div>

      <CollapseTransition>
        <div v-if="openLesson">
          <CSidebarLesson
            v-for="(lesson, index) in lessons"
            :key="index"
            v-bind="{ lesson }"
            :active="lesson?.id === activeId && lessonOpen"
          />
        </div>
      </CollapseTransition>
    </div>
    <div
      class="bg-white border border-secondary rounded-2xl relative overflow-hidden transition-300"
    >
      <div
        class="px-4 pt-3 pb-2 cursor-pointer hover:bg-white-100"
        @click="openAssignment = !openAssignment"
      >
        <div class="flex justify-between gap-3">
          <div>
            <p class="text-base leading-130 font-bold text-dark">
              {{ $t("assignment_modules") }}
            </p>
            <p class="mt-1 text-sm leading-130 font-medium text-gray">
              {{ $t("assignments_count", { count: assignments?.length }) }}
            </p>
          </div>
          <CChevronButton :active="openAssignment" />
        </div>
      </div>

      <CollapseTransition>
        <div v-if="openAssignment">
          <CAssignmentSidebar
            v-for="(card, index) in assignments"
            :key="index"
            v-bind="{ card }"
            :active="activeId === card?.id && assignmentsOpen"
          />
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import CChevronButton from "@/components/Common/CChevronButton.vue";
import CSidebarLesson from "@/modules/Courses/components/CSidebarLesson.vue";
import CAssignmentSidebar from "@/components/Common/CAssignmentSidebar.vue";
import { ILesson } from "@/types/common";
import { useRoute } from "vue-router";

interface Props {
  lessons: ILesson[];
  assignments: any[];
  assignmentsOpen?: boolean;
  lessonOpen?: boolean;
}

const props = defineProps<Props>();
const openLesson = ref(props.lessonOpen);
const openAssignment = ref(props.assignmentsOpen);

const route = useRoute();

const activeId = computed(() => +route?.params?.id);
</script>
