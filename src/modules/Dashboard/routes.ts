import { RouteRecordRaw } from "vue-router";
import { authorizedOnlyMiddleware } from "@/middleware/middlewares";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Dashboard/pages/PDashboard.vue"),
    beforeEnter: authorizedOnlyMiddleware,
    children: [
      {
        path: "",
        name: "Courses",
        component: () => import("@/modules/Dashboard/pages/Child/PCourses.vue"),
      },
      {
        path: "/assignments",
        name: "Assignments",
        component: () => import("@/modules/Assignments/pages/PAssignments.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/modules/Profile/pages/PProfile.vue"),
      },
      {
        path: "/saved",
        name: "Saved",
        component: () => import("@/modules/Dashboard/pages/Child/PSaved.vue"),
      },
      {
        path: "/events",
        name: "Events",
        component: () => import("@/modules/Dashboard/pages/Child/PEvents.vue"),
      },
      {
        path: "/events/:id",
        name: "EventsSingle",
        component: () => import("@/modules/Dashboard/pages/Child/PEventSingle.vue"),
      },
    ],
  },
];

export default routes;
