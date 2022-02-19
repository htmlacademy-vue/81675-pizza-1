<template>
  <div id="app">
    <div v-if="isLoading">
      Загрузка...
    </div>
    <component
      :is="layout"
      v-else
    >
      <transition
        name="view"
        appear
        enter-active-class="animate__animated animate__slideInRight"
      >
        <router-view />
      </transition>
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
    ...mapState("Public", ["isLoading"]),
    layout() {
      return this.$route.meta.layout || "AppLayout";
    },
  },
  async created() {
    await this.$store.dispatch("Auth/init");
    await this.$store.dispatch("Public/init");
    await this.$store.dispatch("Builder/init");
    this.$store.commit("Public/setState", { isLoading: false });
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
