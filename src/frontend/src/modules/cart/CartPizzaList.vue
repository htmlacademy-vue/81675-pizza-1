<template>
  <div>
    <div class="sheet cart__empty" v-if="isCartEmpty">
      <p>В корзине нет ни одного товара</p>
    </div>

    <ul class="cart-list sheet" v-else>
      <CartPizzaItem v-for="(item, index) in cart" :item="item" :key="index" />
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";

export default {
  name: "CartPizzaList",
  components: { CartPizzaItem },
  computed: {
    ...mapState("Cart", ["cart"]),
    isCartEmpty() {
      return this.cart.length === 0;
    },
  },
};
</script>
