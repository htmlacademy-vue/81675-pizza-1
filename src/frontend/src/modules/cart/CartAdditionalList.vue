<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartAdditionalItem v-for="item in misc" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";

export default {
  name: "CartAdditionalList",
  components: { CartAdditionalItem },
  computed: {
    ...mapState("Public", ["misc"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/mixins/mixins";

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}
</style>
