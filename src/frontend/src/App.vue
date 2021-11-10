<template>
  <div id="app">
    <component :is="layout" :cart="cart" :is-authed="isAuthed">
      <router-view :cart="cart" @addToCart="onAddToCart" @login="onLogin" />
    </component>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
export default {
  name: "App",
  components: { AppLayout },
  data() {
    return {
      isAuthed: false,
      cart: [],
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "AppLayout";
    },
  },
  methods: {
    onAddToCart(item) {
      this.cart.push(item);
    },
    onLogin() {
      console.log("todo");
      this.isAuthed = true;
      this.$router.push({ path: "/profile" });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
