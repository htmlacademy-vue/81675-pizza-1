<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import AppSidebarLayout from "@/layouts/AppSidebarLayout";
export default {
  name: "App",
  components: { AppLayout, AppSidebarLayout },
  computed: {
    layout() {
      return this.$route.meta.layout || "AppLayout";
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
