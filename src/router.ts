import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthRoutes from "@/modules/Auth/routes";
import DashboardRoutes from "@/modules/Dashboard/routes";
import ProfileRoutes from "@/modules/Profile/routes";
import CoursesRoutes from "@/modules/Courses/routes";
import AssignmentsRoutes from "@/modules/Assignments/routes";
import PagesRoutes from "@/modules/Pages/routes";

const routes: Array<RouteRecordRaw> = [
  ...AuthRoutes,
  ...DashboardRoutes,
  ...CoursesRoutes,
  ...ProfileRoutes,
  ...AssignmentsRoutes,
  ...PagesRoutes,

  {
    path: "/:pathMatch(.*)*",
    meta: {
      layout: "error",
    },
    component: () => import("@/error.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
