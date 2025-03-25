import { RouteRecordRaw } from "vue-router";
import { guestOnlyMiddleware } from "@/middleware/middlewares";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/login",
    name: "PAuth",
    meta: {
      layout: "auth",
    },
    component: () => import("@/modules/Auth/pages/PLogin.vue"),
    beforeEnter: guestOnlyMiddleware,
  },
];

export default routes;
