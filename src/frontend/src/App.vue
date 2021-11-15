<template>
  <div id="app">
    <div v-if="isLoading">Загрузка...</div>
    <component :is="layout" v-else>
      <router-view />
    </component>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import AppSidebarLayout from "@/layouts/AppSidebarLayout";
import { mapState } from "vuex";
export default {
  name: "App",
  components: { AppLayout, AppSidebarLayout },
  computed: {
    ...mapState("Builder", ["isLoading"]),
    layout() {
      return this.$route.meta.layout || "AppLayout";
    },
  },
  created() {
    this.$store.dispatch("Auth/init");
    this.$store.dispatch("Builder/init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
