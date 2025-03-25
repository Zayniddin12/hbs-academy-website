<template>
  <div class="bg-white min-h-[calc(100vh-84px)] pb-10">
    <div class="container">
      <CBreadcrumb v-bind="{ routes }" class="py-4" />
      <div class="grid grid-cols-12 gap-6 mt-2">
        <div class="col-span-8">
          <div class="aspect-video">
            <CPlayer
              license-server="https://widevine-proxy.appspot.com/proxy"
              manifest-url="https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd"
              :video="single?.details?.video"
              :video-duration="single?.details?.video_duration"
              :poster-url="single?.details?.preview"
              :lesson-id="single?.id"
              :viewed-time="single?.viewed_time"
              :is-finished="single?.completed"
              @refetch="getSingle"
            />
          </div>

          <div class="mt-5 flex-center-between">
            <CTitle class="text-base" :title="single?.details?.title" />
            <CSaveButton :saved="isSaved" @click="addToFavorite" />
          </div>
          <p class="mt-2 text-sm leading-130 text-dark">
            {{ single?.details?.description }}
          </p>
          <div v-if="single?.details?.lesson_files?.length">
            <div class="w-full h-px bg-secondary my-5" />
            <p class="text-base leading-130 text-dark font-semibold">
              {{ $t("attached_files") }}
            </p>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <CFile
                v-for="(file, index) in single?.details?.lesson_files"
                :key="index"
                v-bind="{ file }"
              />
            </div>
          </div>
        </div>
        <!--   Sidebar   -->
        <div class="col-span-4">
          <div class="mb-5">
            <p class="text-sm leading-130 font-medium text-gray">
              {{ $t("module_name") }}
            </p>
            <p class="text-xl leading-130 font-bold text-dark mt-1">
              {{ single?.module?.name }}
            </p>
          </div>
          <CLessonSidebar v-bind="{ lessons, assignments }" lesson-open />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { useI18n } from "vue-i18n";
import CSaveButton from "@/components/Common/CSaveButton.vue";
import { computed, ref, watch } from "vue";
import CTitle from "@/components/Common/CTitle.vue";
import CFile from "@/components/Common/CFile.vue";
import CLessonSidebar from "@/modules/Courses/components/CLessonSidebar.vue";
import CPlayer from "@/components/Player/CPlayer.vue";
import ApiService from "@/services/ApiService";
import { ILessonSingle } from "@/types/common";
import { useRoute } from "vue-router";
import { useCustomToast } from "@/composables/useCustomToast";
import { useHandleError } from "@/composables/useErrorHandling";
import { useVideoStore } from "@/modules/Auth/stores";
// import { num } from "video.js";
import router from "@/router";

const { t } = useI18n();
const route = useRoute();
const { showToast } = useCustomToast();
const { handleError } = useHandleError();

const single = ref<ILessonSingle>();
const isSaved = ref(false);
const lessons = ref<ILessonSingle[]>([]);
const assignments = ref<ILessonSingle[]>([]);

function goNextVideo(video_duration: number, currentLessonId: number) {
  let watched_time = Math.round(Number(sessionStorage.getItem("WT") ?? 0));
  if (watched_time === video_duration) {
    let currentIndex = lessons.value?.findIndex(
      (element) => element.id === currentLessonId
    );
    if (currentIndex !== -1) {
      // Calculate the index of the next element
      const nextIndex = (currentIndex + 1) % lessons.value?.length;

      // Get the next element
      const nextElement = lessons.value?.at(nextIndex);
      router.push({ name: "LessonSingle", params: { id: nextElement?.id } });
    } else {
      // console.log("Element not found in the list.");
    }
  }
}

function getSingle() {
  ApiService.get(`/study/modules/lessons/${route.params?.id}`)
    .then(async (res) => {
      single.value = res?.data;
      await getLessons(res?.data?.module?.id);
      await getAssignments(res?.data?.module?.id);
      await goNextVideo(
        single.value?.details?.video_duration ?? 0,
        Number(route.params?.id ?? 0)
      );
    })
    .catch((err) => {
      err?.data?.forEach((e) => {
        if (
          e?.error?.message ===
          "This lesson is locked until attendance is recorded."
        ) {
          router.go(-1);
          showToast(t("attendance_error"), "error");
        }
      });
    });
}

function getLessons(id: number) {
  ApiService.query(`/study/Modules/${id}/Lessons?page_size=50`).then(
    (res: any) => {
      lessons.value = res?.data?.results;
    }
  );
}

function getAssignments(id: number) {
  ApiService.get(`/assignment/ModuleAssignments/${id}`).then((res: any) => {
    assignments.value = res?.data;
  });
}

getSingle();

const store = useVideoStore();
const selectedCourseId = computed(() => store.selectedCourseId);
const SCID =
  selectedCourseId.value !== 0
    ? selectedCourseId.value
    : sessionStorage.getItem("scid");

const routes = computed(() => [
  {
    name: t("home"),
    route: "/",
  },
  {
    name: single?.value?.module?.name,
    route: `/course/${SCID}`,
  },
  {
    name: single?.value?.details?.title,
    route: "#",
  },
]);

function addToFavorite() {
  isSaved.value = !isSaved.value;
  const data = {
    is_saved: isSaved.value,
  };
  ApiService.patch(`/study/FavoriteLessonUpdate/${route?.params?.id}/`, data)
    .then((res) => {
      if (res?.data?.is_saved) {
        showToast(t("added_to_favorite"), "success");
      } else {
        showToast(t("removed_from_favorite"), "success");
      }
    })
    .catch(({ response }) => {
      handleError(response);
    });
}
watch(
  () => single.value,
  (value) => {
    isSaved.value = value?.is_saved;
  }
);

watch(
  () => route.params.id,
  () => {
    getSingle();
  }
);
</script>
