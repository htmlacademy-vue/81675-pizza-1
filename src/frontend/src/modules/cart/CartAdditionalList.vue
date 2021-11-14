<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartAdditionalItem
        v-for="item in additional"
        :key="item.id"
        :item="item"
      />
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
    ...mapState("Cart", ["additional"]),
  },
};
</script>
