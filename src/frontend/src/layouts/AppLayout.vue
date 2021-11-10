<template>
  <div>
    <HeaderBar :cart="cart" :is-authed="isAuthed" />
    <slot />
  </div>
</template>

<script>
import HeaderBar from "@/common/Header/HeaderBar";
export default {
  name: "AppLayout",
  components: { HeaderBar },
  props: {
    cart: {
      type: Array,
      required: true,
    },
    isAuthed: Boolean,
  },
};
</script>
