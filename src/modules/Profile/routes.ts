import { RouteRecordRaw } from "vue-router";
import { authorizedOnlyMiddleware } from "@/middleware/middlewares";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/profile",
    name: "PProfile",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Profile/pages/PProfile.vue"),
    beforeEnter: authorizedOnlyMiddleware,
  },
];

export default routes;
