<template>
  <ul class="cart-list sheet">
    <CartPizzaItem v-for="(item, index) in cart" :item="item" :key="index" />
  </ul>
</template>

<script>
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import { mapState } from "vuex";

export default {
  name: "CartPizzaList",
  components: { CartPizzaItem },
  computed: {
    ...mapState("Cart", ["cart"]),
  },
};
</script>
