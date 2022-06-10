import { httpRequest } from "@/api/provider/httpRequest";
import MenuView from "@/views/MenuView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "menu",
      component: MenuView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/generate",
      name: "tokenTable",
      component: () => import("../views/TokenTableView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        guest: true,
      },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/CheckoutView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/status",
      name: "status",
      component: () => import("../views/OrderStatusView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/HistoryView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = Boolean(localStorage.getItem("table_token"));

  if (to.meta.requiresAuth && !isLoggedIn) {
    // @TODO verify table token
    // await httpRequest.get(url);

    return next({
      name: "login",
    });
  } else if (to.meta.guest && isLoggedIn) {
    return next({
      name: "menu",
    });
  } else {
    return next();
  }
});

export default router;
