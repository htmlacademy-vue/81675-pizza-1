<template>
  <div>
    <HeaderBar :cart="cart" />
    <slot />
  </div>
</template>

<script>
import HeaderBar from "@/common/components/HeaderBar";
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
