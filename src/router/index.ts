import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import LoginView from "@/views/LoginView.vue";
import ComponentsView from "@/views/ComponentsView.vue";
import OthersView from "@/views/OthersView.vue";

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
          redirect: "/components",
        },
        {
          path: "components",
          name: "components",
          component: ComponentsView,
        },
        {
          path: "others",
          name: "others",
          component: OthersView,
        },
      ],
    },

    // redirect not-found path to "/"
    {
      path: "/:pathMatch(.*)*",
      redirect: "/components",
    },
  ],
});

export default router;
