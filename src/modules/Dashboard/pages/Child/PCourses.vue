<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div v-if="showLess" class="relative">
        <CStatusMain :data="assignments?.at(0)" @click.stop="showLess = false" class="cursor-pointer relative z-30" />
        <CStatusMain :data="assignments?.at(0)" class="absolute top-2 scale-95 z-20" />
        <CStatusMain :data="assignments?.at(0)" class="absolute top-4 scale-90 z-10"/>


      </div>
      <div v-else>
        <div class="max-h-80 overflow-y-auto mb-5">
          <CStatusMain v-for="(assignment, idx) in assignments" :key="idx" :data="assignment"/>
        </div>
        <CButton
            @click="showLess = true"
            icon="icon-chevron rotate-90"
            icon-position="left"
            :text="$t('show_less')"
            variant="secondary"
            main-class="whitespace-nowrap"
        />
      </div>
    </Transition>
    <CTitle :title="$t('my_courses')" />
    <Transition name="fade" mode="out-in">
      <div :key="loading" class="flex flex-col gap-4 mt-4">
        <template v-if="loading">
          <CMyCourseCard
            v-for="(card, index) in 3"
            :key="index"
            v-bind="{ card }"
            loading
          />
        </template>
        <template v-if="!loading && courses?.length">
          <CMyCourseCard
            v-for="(card, index) in courses"
            :key="index"
            v-bind="{ card }"
          />
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import CTitle from "@/components/Common/CTitle.vue";
import CButton from "@/components/Common/CButton.vue";
import CStatusMain from "@/components/CStatusMain.vue";
import CMyCourseCard from "@/modules/Dashboard/components/Courses/CMyCourseCard.vue";
import ApiService from "@/services/ApiService";
import { ref } from "vue";

const courses = ref([]);
const assignments = ref([]);
const loading = ref(false);
const showLess = ref(true);

function getList() {
  loading.value = true;
  ApiService.get(`/study/Courses`)
    .then((res) => {
      courses.value = res?.data;
      getAssignments()
    })
    .finally(() => (loading.value = false));
}

getList();

function getAssignments() {
  ApiService.get(`/study/StudentRejectedAssignments`)
      .then((res) => {
        assignments.value = res?.data?.results;
      })
}
</script>
