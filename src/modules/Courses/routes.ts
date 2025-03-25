import { RouteRecordRaw } from "vue-router";
import { authorizedOnlyMiddleware } from "@/middleware/middlewares";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/course/:id",
    name: "CourseSingle",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Courses/pages/PSingle.vue"),
    beforeEnter: authorizedOnlyMiddleware,
  },
  {
    path: "/course/:id/rating",
    name: "CourseSingleRating",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Courses/pages/PRating.vue"),
    beforeEnter: authorizedOnlyMiddleware,
  },
  {
    path: "/lesson/:id",
    name: "LessonSingle",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Courses/pages/PLesson.vue"),
    beforeEnter: authorizedOnlyMiddleware,
  },
];

export default routes;
