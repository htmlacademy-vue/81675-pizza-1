import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index";
import Login from "@/views/Login";
import Cart from "@/views/Cart";
import Orders from "@/views/Orders";
import Profile from "@/views/Profile";

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
      layout: "AppLayout",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayout",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
