import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "login",
          component: LoginView,
        },
      ],
    },
    {
      path: "/",
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
        },
      ],
    },

    // redirect not-found path to "/"
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
