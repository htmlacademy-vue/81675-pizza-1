import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";
import builder from "@/store/builder";
import cart from "@/store/cart";
import orders from "@/store/orders";
import address from "@/store/address";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth: auth,
    Builder: builder,
    Cart: cart,
    Orders: orders,
    Address: address,
  },
});
