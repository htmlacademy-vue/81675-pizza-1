<template>
  <div>
    <HeaderBar />
    <main class="layout">
      <AppSidebar />
      <slot />
    </main>
  </div>
</template>

<script>
import HeaderBar from "@/common/Header/HeaderBar";
import AppSidebar from "@/common/components/AppSidebar";
export default {
  name: "AppSidebarLayout",
  components: { AppSidebar, HeaderBar },
};
</script>
