import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/pages/:slug",
    name: "Pages",
    meta: {
      layout: "error",
    },
    component: () => import("@/modules/Pages/pages/PIndex.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: {
      layout: "error",
    },
    component: () => import("@/error.vue"),
  },
];

export default routes;
