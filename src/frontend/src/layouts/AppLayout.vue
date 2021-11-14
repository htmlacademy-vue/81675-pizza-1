<template>
  <div>
    <HeaderBar />
    <slot />
  </div>
</template>

<script>
import HeaderBar from "@/common/Header/HeaderBar";
export default {
  name: "AppLayout",
  components: { HeaderBar },
};
</script>
