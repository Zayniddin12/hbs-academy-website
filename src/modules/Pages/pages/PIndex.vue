<template>
  <div class="container pb-16">
    <CBreadcrumb v-bind="{ routes }" class="py-4" />
    <div class="bg-white p-6 rounded-2xl mt-4">
      <h1 class="text-2xl leading-130 font-bold text-dark">
        {{ single?.title }}
      </h1>
      <div class="static-text mt-4" v-html="single?.text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { IPage } from "@/modules/Pages/types";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const single = ref<IPage>();

function getPage() {
  ApiService.get(`/common/StaticPage/${route.params.slug}`)
    .then((res) => {
      single.value = res?.data;
    })
    .catch(() => {
      router.push({ name: "404" });
    });
}

getPage();

const routes = computed(() => [
  {
    name: t("home"),
    route: "/",
  },
  {
    name: t("privacy_policy"),
    route: "#",
  },
]);
</script>
