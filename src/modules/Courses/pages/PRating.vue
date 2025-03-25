<template>
  <div class="container pb-16">
    <CBreadcrumb v-bind="{ routes }" class="py-4" />
    <h1 class="text-2xl leading-130 text-dark font-bold">{{$t('rating_status')}}</h1>
    <div class="w-full mt-5">
      <CTableRating />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import ApiService from "@/services/ApiService";
import {useRoute} from "vue-router";
import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import CTableRating from "@/components/Table/CTableRating.vue";


const { t } = useI18n();
const route = useRoute();

const single = ref();

const routes = computed(() => [
  {
    name: t("home"),
    route: "/",
  },
  {
    name: single?.value?.details?.title,
    route: `/course/${single?.value?.id}`,
  },
  {
    name: t('rating'),
    route: `/course/${single?.value?.id}`,
  }
]);



function getCourse() {
  ApiService.get(`/study/Courses/${route.params?.id}`)
      .then((res) => {
        single.value = res?.data;
      })
}

getCourse();

</script>

<style scoped>

</style>