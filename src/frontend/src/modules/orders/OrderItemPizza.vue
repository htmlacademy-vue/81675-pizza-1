<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      >
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ sizeName }}, {{ doughName }}</li>
          <li>Соус: {{ sauceName }}</li>
          <li>Начинка: {{ ingredients }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      {{ price }} ₽
    </p>
  </li>
</template>

<script>
export default {
  name: "OrderItemPizza",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    doughName() {
      return this.$store.getters["Public/doughById"](
        this.pizza.doughId
      )?.name?.toLowerCase();
    },
    sauceName() {
      return this.$store.getters["Public/sauceById"](
        this.pizza.sauceId
      )?.name?.toLowerCase();
    },
    sizeName() {
      return this.$store.getters["Public/sizeById"](
        this.pizza.sauceId
      )?.name?.toLowerCase();
    },
    price() {
      return this.$store.getters["Public/pizzaPrice"](this.pizza);
    },
    ingredients() {
      return this.pizza.ingredients
        .map((item) => {
          return this.$store.getters["Public/ingredientById"](
            item.id
          )?.name?.toLowerCase();
        })
        .join(", ");
    },
  },
};
</script>
