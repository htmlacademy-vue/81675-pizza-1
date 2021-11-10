<template>
  <header class="header">
    <div class="header__logo">
      <a href="#" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="#">{{ cartTotalPrice }} ₽</a>
    </div>
    <div class="header__user">
      <a href="#" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cartTotalPrice() {
      return this.cart.reduce((acc, pizza) => {
        return acc + this.pizzaPrice(pizza);
      }, 0);
    },
  },
  methods: {
    pizzaPrice(pizza) {
      const { dough, size, sauce, ingredients } = pizza;
      const ingredientsPrice = ingredients.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0);
      return size.multiplier * (dough.price + sauce.price + ingredientsPrice);
    },
  },
};
</script>
