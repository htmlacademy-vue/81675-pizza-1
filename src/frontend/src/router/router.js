import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";

Vue.use(VueRouter);

const router = Promise.all(routes).then((routes) => {
  const router = new VueRouter({
    mode: "history",
    routes: routes,
  });

  router.beforeEach((to, from, next) => {
    if (to.meta?.middleware) {
      to.meta.middleware({ to, from, next });
    } else {
      next();
    }
  });

  return router;
});

export default router;
