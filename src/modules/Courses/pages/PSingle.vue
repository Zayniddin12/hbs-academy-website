<template>
  <div class="container my-6">
    <CPreloader v-bind="{ loading }" width="240px" height="20px">
      <CTitle :title="course?.details?.title" />
    </CPreloader>
    <div class="grid grid-cols-12 gap-6 mt-4">
      <div class="col-span-4 flex flex-col gap-6">
        <div class="bg-white border border-secondary p-5 rounded-2xl">
          <CPreloader v-bind="{ loading }" width="100%" height="180px">
            <div class="aspect-video">
              <img
                :src="course?.details?.photo"
                alt="image-single"
                class="w-full h-full object-cover rounded-lg pointer-events-none"
              />
            </div>
          </CPreloader>
          <CPreloader
            v-bind="{ loading }"
            width="140px"
            height="15px"
            class="my-4"
          >
            <p class="my-4 text-xs leading-130 font-normal text-dark">
              {{ course?.details?.description }}
            </p>
          </CPreloader>

          <div class="flex flex-col gap-2">
            <CPreloader v-bind="{ loading }" width="100%" height="60px">
              <CSidebarCourseInfo
                icon="icon-calendar-course"
                :value="
                  $t('duration_time', {
                    start: dayjs(course?.from_date).format('DD.MM.YYYY'),
                    end: dayjs(course?.to_date).format('DD.MM.YYYY'),
                  })
                "
              />
            </CPreloader>
            <div class="flex-y-center gap-2">
              <CPreloader v-bind="{ loading }" class="w-full" height="60px">
                <CSidebarCourseInfo
                  class="w-full"
                  icon="icon-video"
                  :value="
                    $t('lessons_count', {
                      count: course?.details?.lessons_count,
                    })
                  "
                />
              </CPreloader>
              <CPreloader v-bind="{ loading }" class="w-full" height="60px">
                <CSidebarCourseInfo
                  class="w-full"
                  icon="icon-modules"
                  :value="
                    $t('modules_count', {
                      count: course?.details?.modules_count,
                    })
                  "
                />
              </CPreloader>
            </div>
            <CPreloader v-bind="{ loading }" width="100%" height="60px">
              <CSidebarCourseInfo
                icon="icon-home-course"
                :value="
                  $t('assignments_count', {
                    count: course?.details?.assignments_count,
                  })
                "
              />
            </CPreloader>
          </div>
        </div>
        <CWidgetRating v-if="rating?.position_in_flow" v-bind="{ rating }" />
      </div>
      <div class="col-span-8 flex flex-col gap-4" :key="loading">
        <template v-if="loading">
          <CModule
            v-for="(card, index) in 4"
            :key="index"
            v-bind="{ card, lessons, loading }"
            :id="activeModule"
          />
        </template>
        <template v-else>
          <CModule
            v-for="(card, index) in course?.modules"
            :key="index"
            v-bind="{ card, lessons, loading }"
            @open="getLesson(card?.id)"
            :id="activeModule"
            :lesson-loading="loadingLesson"
            :active="activeModule === card?.id"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CTitle from "@/components/Common/CTitle.vue";
import CSidebarCourseInfo from "@/modules/Courses/components/CSidebarCourseInfo.vue";
import dayjs from "dayjs";
import CModule from "@/modules/Courses/components/CModule.vue";
import ApiService from "@/services/ApiService";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { ICourse } from "@/types/common";
import { useVideoStore } from "@/modules/Auth/stores";
import CPreloader from "@/components/CPreloader.vue";
import CWidgetRating from "@/components/Common/Widget/CWidgetRating.vue";

const route = useRoute();

const course = ref<ICourse>();
const lessons = ref([]);
const activeModule = ref<number>();

const loading = ref(false);
const loadingLesson = ref(false);

const store = useVideoStore();
const rating = ref<any>({});

function getCourse() {
  loading.value = true;
  ApiService.get(`/study/Courses/${route.params?.id}`)
    .then((res) => {
      course.value = res?.data;
      store.setSelectedCourse(+route.params?.id ?? 0);
    })
    .finally(() => (loading.value = false));
}

getCourse();

function getLesson(id: number) {
  if (id !== activeModule.value) {
    loadingLesson.value = true;
    activeModule.value = id;
    ApiService.get(`/study/Modules/${id}/Lessons`)
      .then((res) => {
        setTimeout(() => {
          lessons.value = res?.data?.results;
        }, 100);
      })
      .finally(() => {
        loadingLesson.value = false;
      });
  } else {
    activeModule.value = undefined;
  }
}

function getRating() {
  ApiService.get(`/study/Course/${route.params?.id}/Statistics`).then((res) => {
    rating.value = res?.data;
  });
}

getRating();
</script>
