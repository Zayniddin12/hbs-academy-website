<template>
  <div class="pb-16">
    <CTitle :title="$t('assignments')" />
    <div class="w-full flex-y-center justify-between">
      <div class="flex-y-center gap-2 my-4">
        <button
          v-for="(option, index) in filterOptions"
          :key="index"
          class="py-2 px-4 rounded-full border border-transparent hover:border-green transition-300 bg-white"
          :class="{ '!border-green': active === option?.value }"
          @click="chooseActive(option.value)"
        >
          <p class="text-sm leading-5 font-medium text-dark">
            {{ option.label }}
          </p>
        </button>
      </div>
      <Select
        :options="courses"
        value-key="id"
        label-key="title"
        :placeholder="$t('select_course')"
        v-model="selectedCourse"
        selected-option-styles="!bg-white !rounded-lg"
        class="!min-w-[160px]"
      />
    </div>

    <Transition name="fade" mode="out-in">
      <div :key="loading" class="bg-white p-4 rounded-2xl grid gap-4">
        <template v-if="loading">
          <CAssignmentCard
            v-for="(card, index) in 6"
            :key="index"
            v-bind="{ card }"
            loading
          />
        </template>
        <template v-if="!loading && assignments?.length">
          <CAssignmentCard
            v-for="(card, index) in assignments"
            :key="index"
            v-bind="{ card }"
          />
        </template>
        <CNoAssignments v-if="!loading && assignments?.length <= 0" />
      </div>
    </Transition>
    <div
      v-if="paginationData?.total > assignments?.length && !loading"
      ref="target"
    />
  </div>
</template>

<script setup lang="ts">
import CTitle from "@/components/Common/CTitle.vue";
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";
import CAssignmentCard from "@/modules/Assignments/components/CAssignmentCard.vue";
import CNoAssignments from "@/modules/Assignments/components/CNoAssignments.vue";
import ApiService from "@/services/ApiService";
import { IAssignment } from "@/types/common";
import { useIntersectionObserver } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import Select from "@/components/Form/FSelect.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const active = ref(route.query?.state ?? "");
const loading = ref(true);
const target = ref(null);
const courses = ref([]);
const selectedCourse = ref("");

const assignments = ref<IAssignment[]>([]);
const paginationData = ref({
  page: 1,
  total: 0,
  page_size: 10,
});

const filterOptions = computed(() => [
  { label: t("all"), value: "" },
  { label: t("available"), value: "available" },
  { label: t("not_submitted"), value: "not_submitted" },
  { label: t("graded"), value: "graded" },
  { label: t("submitted"), value: "submitted" },
]);

function getCourses() {
  ApiService.get(`/study/Courses`).then((res) => {
    courses.value = res?.data?.map((el) => {
      return { ...el?.details, id: el?.id };
    });
  });
}

getCourses();

// available, not_submitted, graded, submitted
function getList(merge?: boolean) {
  if (!merge) {
    loading.value = true;
  }
  ApiService.query("/assignment/Assignments/", {
    params: {
      page: paginationData.value.page,
      page_size: paginationData.value.page_size,
      state: active.value ?? undefined,
      course: selectedCourse.value?.id,
    },
  })
    .then((res: any) => {
      paginationData.value.total = res?.data?.count;
      if (merge) {
        res?.data?.results.forEach((el: any) => {
          assignments.value.push(el);
        });
      } else {
        assignments.value = res?.data?.results;
      }
    })
    .finally(() => (loading.value = false));
}

getList();

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    paginationData.value.page++;
    getList(true);
  }
});

function chooseActive(value: string) {
  loading.value = true;
  active.value = value;
  paginationData.value.page = 1;
  router.push({ query: { state: value } });
  getList();
}

watch(
  () => selectedCourse.value,
  () => {
    getList();
  }
);
</script>
