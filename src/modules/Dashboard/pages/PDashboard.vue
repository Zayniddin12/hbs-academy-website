<template>
  <div class="h-full w-full my-8 grid grid-cols-12 gap-6 container">
    <div class="relative col-span-3">
      <CSidebar class="sticky top-[93px]" :routes="routesList" />
    </div>
    <div class="w-full h-full col-span-9">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import CSidebar from "@/layout/Dashboard/components/CSidebar.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const routesList = [
  {
    title: t("home"),
    route: "/",
    icon: "icon-home",
    name: "Home",
  },
  {
    title: t("assignments"),
    route: "/assignments",
    icon: "icon-file-text",
    name: "Assignments",
  },
  {
    title: t("saved"),
    route: "/saved",
    icon: "icon-bookmark",
    name: "saved",
  },
  {
    title: t("profile"),
    route: "/profile",
    icon: "icon-user-circle",
    name: "Profile",
  },{
    title: t("events"),
    route: "/events",
    icon: "icon-calendar-course",
    name: "Events",
  },
];
</script>
