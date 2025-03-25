import { RouteRecordRaw } from "vue-router";
import { authorizedOnlyMiddleware } from "@/middleware/middlewares";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/assignments/:id",
    name: "AssignmentSingle",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Assignments/pages/PSingle.vue"),
    beforeEnter: authorizedOnlyMiddleware,
  },
  {
    path: "/test/:id",
    name: "Test",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Assignments/pages/PTest.vue"),
    beforeEnter: authorizedOnlyMiddleware,
  },
];

export default routes;
