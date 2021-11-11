<template>
  <div>
    <HeaderBar :cart="cart" :is-authed="isAuthed" />
    <main class="layout">
      <Sidebar />
      <slot />
    </main>
  </div>
</template>

<script>
import HeaderBar from "@/common/Header/HeaderBar";
import Sidebar from "@/common/components/Sidebar";
export default {
  name: "AppSidebarLayout",
  components: { Sidebar, HeaderBar },
  props: {
    cart: {
      type: Array,
      required: true,
    },
    isAuthed: Boolean,
  },
};
</script>
