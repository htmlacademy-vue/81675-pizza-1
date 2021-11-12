<template>
  <div>
    <HeaderBar :cart="cart" />
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
  },
};
</script>
