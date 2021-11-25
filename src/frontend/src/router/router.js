import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index";
import Login from "@/views/Login";
import Cart from "@/views/Cart";
import Orders from "@/views/Orders";
import Profile from "@/views/Profile";
import isLoggedIn from "@/middlewares/isLoggedIn";
import isNotLoggedIn from "@/middlewares/isNotLoggedIn";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "AppLayout",
      middleware: isNotLoggedIn,
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppSidebarLayout",
      middleware: isLoggedIn,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppSidebarLayout",
      middleware: isLoggedIn,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.middleware) {
    to.meta.middleware({ to, from, next });
  } else {
    next();
  }
});

export default router;
