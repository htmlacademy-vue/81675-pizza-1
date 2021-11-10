<template>
  <div id="app">
    <component :is="layout" :cart="cart">
      <router-view :cart="cart" @addToCart="onAddToCart" />
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
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
